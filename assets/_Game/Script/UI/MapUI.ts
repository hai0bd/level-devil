import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
import { ScrollPopUp } from './ScrollPopUp';
const { ccclass, property } = _decorator;

@ccclass('MapUI')
export class MapUI extends Component {
    @property(Node)
    playUI: Node = null;

    @property(Node)
    mainMenu: Node;

    @property(ScrollPopUp)
    popup: ScrollPopUp;

    @property(Node)
    gates: Node[] = [];

    currentGateIndex: number = 0;
    isOpen = false;

    start(){
        this.showGatePos(0);
    }

    showGatePos(index: number){
        this.gates[this.currentGateIndex].active = false;
        this.gates[index].active = true;
        this.currentGateIndex = index;
    }

    onClickBack() {
        this.popup.onClickEsc();
        this.mainMenu.active = true;
    }

    onClickGate(deltaTime: number, customEvenData: string) {
        this.playUI.active = true;
        this.popup.onClickEsc();
        GameManager.instance.instantieGate(parseInt(customEvenData));
        // this.node.active = false;
    }
}


