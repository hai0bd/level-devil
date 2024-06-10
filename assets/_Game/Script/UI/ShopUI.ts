import { _decorator, Component, Node } from 'cc';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
const { ccclass, property } = _decorator;

@ccclass('ShopUI')
export class ShopUI extends Component {
    onClickEsc() {
        this.playSfx(SoundType.Button_Click);
        this.node.active = false;
    }
    playSfx(Button_Click: SoundType) {
        const audio = AudioSourceControl.instance;
        audio.playSound(Button_Click);
    }
}


