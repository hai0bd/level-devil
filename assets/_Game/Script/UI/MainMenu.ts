import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    @property(Node)
    playUI: Node = null;

    @property(GameManager)
    gameManager: GameManager = null;

    nextSkin(){

    }

    previousSkin(){

    }

    onButtonStartClick(){
        this.playSfx(SoundType.Button_Click);
        this.node.active = false;
        this.playUI.active = true;
        this.gameManager.init();
    }

    onButtonOptionClick(){
        this.playSfx(SoundType.Button_Click);
    }

    onButtonShopClick(){
        this.playSfx(SoundType.Button_Click);
    }

    playSfx(sound: SoundType){
        const audio = AudioSourceControl.instance;
        audio.playSound(sound);
    }
}


