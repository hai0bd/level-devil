import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {

    @property(Node)
    map: Node;

    @property(Node)
    shopUI: Node = null;

    nextSkin() {

    }

    previousSkin() {

    }

    onButtonStartClick() {
        this.playSfx(SoundType.Button_Click);
        this.node.active = false;
        this.map.active = true;
        /* this.playUI.active = true;
        this.gameManager.init(); */
    }

    onButtonOptionClick() {
        this.playSfx(SoundType.Button_Click);
    }

    onButtonShopClick() {
        this.playSfx(SoundType.Button_Click);
        this.shopUI.active = true;
    }

    playSfx(sound: SoundType) {
        const audio = AudioSourceControl.instance;
        audio.playSound(sound);
    }
}


