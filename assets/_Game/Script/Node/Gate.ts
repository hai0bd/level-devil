import { _decorator, Component, Game, instantiate, Node, Prefab } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { MapControl } from './MapControl';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
import { PlayerController } from '../PlayerController';
const { ccclass, property } = _decorator;

@ccclass('Gate')
export class Gate extends Component {
    @property(Prefab)
    mapPrefab: Prefab[] = [];

    map: Node;
    player: PlayerController;
    mapControl: MapControl;

    levelIndex: number = 0;
    isHandling: boolean = false;

    start() {
        GameManager.instance.gateControl = this;
        this.instantieMap();
        this.playSound(true);
    }

    update(deltaTime: number) {
        if (this.isHandling) return;
        if (this.player.isWin) {
            this.isHandling = true;
            this.player.playerAnim.node.active = false;
            this.mapControl.gateAnim.enabled = true;

            this.scheduleOnce(this.nextLevel, 0.67);
        }
        else if (this.player.isLose) {
            this.playSound(false);
            this.isHandling = true;
            GameManager.instance.screenShake();
            this.player.node.active = false;
            this.mapControl.playerDeathAnim.enabled = true;

            this.scheduleOnce(this.playAgain, 1);
        }
    }

    nextLevel() {
        // this.map.active = false;
        this.isHandling = false;
        this.map.destroy();
        this.levelIndex++;

        if (this.levelIndex >= this.mapPrefab.length) {
            alert("To be continue");
            GameManager.instance.nextGate();
            return;
        }
        this.instantieMap();
    }

    playAgain() {
        this.isHandling = false;
        this.map.active = false;
        this.map.destroy();
        this.instantieMap();
        this.playSound(true);
    }

    instantieMap() {
        this.map = instantiate(this.mapPrefab[this.levelIndex])
        this.node.addChild(this.map);

        this.mapControl = this.map.getComponent(MapControl);
        this.player = this.mapControl.player;
    }

    playSound(isOn: boolean) {
        const audio = AudioSourceControl.instance;
        audio.playSoundTrack(isOn);
    }
    onDestroy(){
        AudioSourceControl.instance.playSoundTrack(false);
    }
}


