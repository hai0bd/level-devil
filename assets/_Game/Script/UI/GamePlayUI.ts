import { _decorator, Component, Game, Node } from 'cc';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('GamePlayUI')
export class GamePlayUI extends Component {
    @property(GameManager)
    gameManager: GameManager;

    @property(Node)
    settingNode: Node = null;

    onButtonReplay() {
        this.gameManager.playAgain();
    }

    onButtonSetting() {
        if (this.settingNode) {
            this.settingNode.active = true;
        }
    }
}



