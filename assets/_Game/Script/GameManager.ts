import { _decorator, Animation, Canvas, Component, instantiate, Node, Prefab } from 'cc';
import { MapControl } from './MapControl';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node)
    canvas: Node | null = null;

    @property(Prefab)
    mapPrefab: Prefab[] = [];

    @property(Animation)
    nextLevelUp: Animation | null = null;

    @property(Animation)
    nextLevelDown: Animation | null = null;

    map: MapControl[] = [];
    levelIndex: number = 0;

    start() {
        this.instantieMap();
    }

    update(deltaTime: number) {
        if (this.map[this.levelIndex].player.isWin) {
            this.map[this.levelIndex].gateAnim.enabled = true;
            this.map[this.levelIndex].player.playerAnim.node.active = false;
            
            this.nextLevelUp.play('next-level-up');
            this.nextLevelDown.play('next-level-down');

            this.scheduleOnce(this.nextLevel, 0.67);
        }
        else if (this.map[this.levelIndex].player.isLose) {
            this.map[this.levelIndex].player.node.active = false;
            this.map[this.levelIndex].player.playerDeathAnim.enabled = true;
            this.scheduleOnce(this.playAgain, 1);
        }
    }

    nextLevel() {

        this.map[this.levelIndex].node.active = false;
        this.levelIndex++;

        if (this.levelIndex >= this.mapPrefab.length) {
            alert("To be continue");
            return;
        }
        this.instantieMap();
    }

    playAgain() {
        this.map[this.levelIndex].node.active = false;
        this.instantieMap();
    }

    instantieMap() {
        const instanMap = instantiate(this.mapPrefab[this.levelIndex])
        this.canvas.addChild(instanMap);
        this.map[this.levelIndex] = instanMap.getComponent(MapControl);
        // this.map[this.levelIndex].player.audio = this.audio;
    }
}


