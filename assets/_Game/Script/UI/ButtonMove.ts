import { _decorator, Button, Component, Input, Node } from 'cc';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('ButtonMove')
export class ButtonMove extends Component {
    @property(GameManager)
    gameManager: GameManager;

    @property(Button)
    buttonLeft: Button;

    @property(Button)
    buttonRight: Button;

    @property(Button)
    buttonJump: Button;

    start() {
        this.checkEndEvent();
        this.checkStartEvent();
    }
    checkStartEvent() {
        this.buttonLeft.node.on(Input.EventType.TOUCH_START, this.onClickButtonLeft, this);
        this.buttonRight.node.on(Input.EventType.TOUCH_START, this.onClickButtonRight, this);
        this.buttonJump.node.on(Input.EventType.TOUCH_START, this.onClickButtonJump, this);
    }
    checkEndEvent() {
        this.buttonLeft.node.on(Input.EventType.TOUCH_END, this.offClickButton, this);
        this.buttonRight.node.on(Input.EventType.TOUCH_END, this.offClickButton, this);
        this.buttonLeft.node.on(Input.EventType.TOUCH_CANCEL, this.offClickButton, this);
        this.buttonRight.node.on(Input.EventType.TOUCH_CANCEL, this.offClickButton, this);
    }

    onClickButtonLeft() {
        this.gameManager.mapControl.player.playerMoveLeft();
    }
    onClickButtonRight() {
        this.gameManager.mapControl.player.playerMoveRight();
    }
    onClickButtonJump() {
        this.gameManager.mapControl.player.playerJump();
    }
    offClickButton() {
        this.gameManager.mapControl.player.stopMove();
    }
}


