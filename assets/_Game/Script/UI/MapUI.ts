import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
import { ScrollPopUp } from './ScrollPopUp';
const { ccclass, property } = _decorator;

@ccclass('MapUI')
export class MapUI extends Component {
    @property(Node)
    playUI: Node = null;

    @property(GameManager)
    gameManager: GameManager = null;

    @property(ScrollPopUp)
    popup: ScrollPopUp;

    isOpen = false;
    
    playSfx(Button_Click: SoundType) {
        const audio = AudioSourceControl.instance;
        audio.playSound(Button_Click);
    }

    onClickGate(deltaTime: number, customEvenData: string) {
        this.playUI.active = true;
        this.popup.onClickEsc();
        this.gameManager.instantieGate(parseInt(customEvenData));
        // this.node.active = false;
    }
}


