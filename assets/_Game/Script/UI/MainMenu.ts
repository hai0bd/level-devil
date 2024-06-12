import { _decorator, Component, Node, Scene } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
import { BouncePopUp } from './BouncePopUp';
import { ScrollPopUp } from './ScrollPopUp';
import { ScreenShake } from '../ScreenShake';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {

    @property(ScrollPopUp)
    map: ScrollPopUp;

    @property(BouncePopUp)
    shopUI: BouncePopUp = null;

    @property(ScreenShake)
    screenShake: ScreenShake

    nextSkin() {

    }

    previousSkin() {

    }

    onButtonStartClick() {
        this.playSfx(SoundType.Button_Click);
        this.node.active = false;
        this.map.node.active = true;
        this.map.init();
        /* this.playUI.active = true;
        this.gameManager.init(); */
    }

    onButtonOptionClick() {
        this.playSfx(SoundType.Button_Click);
        this.screenShake.init();
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
