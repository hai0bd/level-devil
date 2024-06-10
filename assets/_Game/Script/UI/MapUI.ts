import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('MapUI')
export class MapUI extends Component {
    @property(Node)
    playUI: Node = null;

    @property(GameManager)
    gameManager: GameManager = null;

    onClickGate(deltaTime: number, customEvenData: string) {
        this.playUI.active = true;
        this.gameManager.instantieGate(parseInt(customEvenData));
        this.node.active = false;
    }
}


