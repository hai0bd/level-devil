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

<<<<<<< HEAD
    map: Node;
    mapControl: MapControl;
=======
    mapControl: MapControl;
    map: Node;
>>>>>>> 08e55a99003dbc95a8418b13af9bedeb34f21330
    levelIndex: number = 0;

    start() {
        this.instantieMap();
    }

    update(deltaTime: number) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 08e55a99003dbc95a8418b13af9bedeb34f21330
            this.scheduleOnce(this.playAgain, 1);
        }
    }

    nextLevel() {
<<<<<<< HEAD

=======
>>>>>>> 08e55a99003dbc95a8418b13af9bedeb34f21330
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
<<<<<<< HEAD
        this.map = instantiate(this.mapPrefab[this.levelIndex])
=======
        this.map = instantiate(this.mapPrefab[this.levelIndex]);
>>>>>>> 08e55a99003dbc95a8418b13af9bedeb34f21330
        this.canvas.addChild(this.map);
        this.mapControl = this.map.getComponent(MapControl);
        // this.map[this.levelIndex].player.audio = this.audio;
        console.log("next level");
    }
}
