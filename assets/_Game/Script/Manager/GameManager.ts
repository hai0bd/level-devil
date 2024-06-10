import { _decorator, Animation, Component, instantiate, Node, Prefab, UITransform } from "cc";
import { UIManager } from "../UI/UIManager";
import { MapControl } from "../Node/MapControl";
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

    @property(UIManager)
    uiCanvas: UIManager;

    map: Node;
    mapControl: MapControl;
    levelIndex: number = 0;

    instantieGate(index: number) {
        this.map = instantiate(this.mapPrefab[index])
        this.canvas.addChild(this.map);
        // this.mapControl = this.map.getComponent(MapControl);
        // this.map[this.levelIndex].player.audio = this.audio;
        // console.log("next level");
    }

    update() {

    }

    /* update(deltaTime: number) {
        const player = this.mapControl.player;
        if (player.isWin) {
            player.playerAnim.node.active = false;
            this.mapControl.gateAnim.enabled = true;

            this.nextLevelUp.play('next-level-up');
            this.nextLevelDown.play('next-level-down');

            this.scheduleOnce(this.nextLevel, 0.67);
        }
        else if (player.isLose) {
            player.node.active = false;
            this.mapControl.playerDeathAnim.enabled = true;
            this.scheduleOnce(this.playAgain, 1);
        }
    }

    nextLevel() {
        // this.map.active = false;
        this.map.destroy();
        this.levelIndex++;

        if (this.levelIndex >= this.mapPrefab.length) {
            alert("To be continue");
            return;
        }
        this.instantieMap();
    }

    playAgain() {
        // this.map.active = false;
        this.map.destroy();
        this.instantieMap();
    }

    instantieMap() {
        this.map = instantiate(this.mapPrefab[this.levelIndex])
        this.canvas.addChild(this.map);
        this.mapControl = this.map.getComponent(MapControl);
        // this.map[this.levelIndex].player.audio = this.audio;
        console.log("next level");
    } */


}
export enum CollisionTag {
    TrapPoint = 1,
    FinishPoint = 2,
    DeathPoint = 3,
    Player = 4,
    Food = 5,
    Bounce = 6,
    Portal = 7,
}
