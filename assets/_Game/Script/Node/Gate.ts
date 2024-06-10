import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { MapControl } from './MapControl';
const { ccclass, property } = _decorator;

@ccclass('Gate')
export class Gate extends Component {
    @property(Prefab)
    mapPrefab: Prefab[] = [];

    levelIndex: number = 0;
    map: Node;
    mapControl: MapControl;

    start(){
        this.instantieMap();
    }
    
    update(deltaTime: number) {
        const player = this.mapControl.player;
        if (player.isWin) {
            player.playerAnim.node.active = false;
            this.mapControl.gateAnim.enabled = true;

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
        this.node.addChild(this.map);
        this.mapControl = this.map.getComponent(MapControl);
        // this.map[this.levelIndex].player.audio = this.audio;
        console.log("next level");
    }
}


