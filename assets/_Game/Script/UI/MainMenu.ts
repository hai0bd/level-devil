import { _decorator, Component } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
import { BouncePopUp } from './BouncePopUp';
import { ScrollPopUp } from './ScrollPopUp';
import { DataManager } from '../Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    @property(ScrollPopUp)
    map: ScrollPopUp;

    @property(BouncePopUp)
    shopUI: BouncePopUp = null;

    onButtonStartClick() {
        this.playSfx(SoundType.Button_Click);
        this.node.active = false;
        this.map.node.active = true;
        this.map.init();
        DataManager.instance.saveData();
    }

    onButtonOptionClick() {
        this.playSfx(SoundType.Button_Click);
        GameManager.instance.screenShake();
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
