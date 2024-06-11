import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
import { BouncePopUp } from './BouncePopUp';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {

    @property(Node)
    map: Node;

    @property(BouncePopUp)
    shopUI: BouncePopUp = null;

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
        this.shopUI.node.active = true;
        this.shopUI.init();
    }

    playSfx(sound: SoundType) {
        const audio = AudioSourceControl.instance;
        audio.playSound(sound);
    }
}


