import {
    _decorator,
    Animation,
    Canvas,
    Component,
    instantiate,
    Node,
    Prefab,
} from "cc";
import { MapControl } from "./MapControl";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
    @property(Node)
    canvas: Node | null = null;

    @property(Prefab)
    mapPrefab: Prefab[] = [];

    @property(Animation)
    nextLevelUp: Animation | null = null;

    @property(Animation)
    nextLevelDown: Animation | null = null;

    mapControl: MapControl;
    map: Node;
    levelIndex: number = 0;

    start() {
        this.instantieMap();
    }

    update(deltaTime: number) {
        if (this.map.activeInHierarchy) console.log(this.map.name);
        if (this.mapControl.player.isWin) {
            this.mapControl.gateAnim.enabled = true;
            this.mapControl.player.playerAnim.node.active = false;

            this.nextLevelUp.play("next-level-up");
            this.nextLevelDown.play("next-level-down");

            this.scheduleOnce(this.nextLevel, 0.67);
        } else if (this.mapControl.player.isLose) {
            this.mapControl.player.node.active = false;
            this.mapControl.player.playerDeathAnim.enabled = true;
            this.scheduleOnce(this.playAgain, 1);
        }
    }

    nextLevel() {
        this.map.active = false;
        this.map.destroy();
        this.levelIndex++;

        if (this.levelIndex >= this.mapPrefab.length) {
            alert("To be continue");
            return;
        }
        this.instantieMap();
    }

    playAgain() {
        this.map.active = false;
        this.map.destroy();
        this.instantieMap();
    }

    instantieMap() {
        this.map = instantiate(this.mapPrefab[this.levelIndex]);
        this.canvas.addChild(this.map);
        this.mapControl = this.map.getComponent(MapControl);
        // this.map[this.levelIndex].player.audio = this.audio;
        console.log("next level");
    }
}
