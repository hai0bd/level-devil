import { _decorator, Button, Component, EventHandle, EventHandler, game, Label, log, Node, Sprite, SpriteFrame } from 'cc';
import { DataManager } from '../Manager/DataManager';
import { Skin } from '../Node/Skin';
const { ccclass, property } = _decorator;

@ccclass('SkinItemUI')
export class SkinItemUI extends Component {
    @property(Sprite)
    spriteItems: Sprite;

    @property(Sprite)
    spritePrice: Sprite;

    @property(SpriteFrame)
    ownedSprite: SpriteFrame;

    @property(Label)
    labelPrice: Label;

    @property(Button)
    itemButton: Button;

    logPay: string;
    skinItem: Skin;
    shopUI: Node;

    init(item: Skin, shop: Node) {
        this.skinItem = item;
        this.shopUI = shop;
        this.spriteItems.spriteFrame = item.sprite;
        this.checkSkin();
    }
    checkSkin() {
        if (DataManager.instance.playerData.skinID.indexOf(this.skinItem.skinID) == -1) {
            this.labelPrice.string = this.skinItem.price.toString() + '$';
            this.itemButton.node.on(Button.EventType.CLICK, this.onButtonBuy, this);
            console.log("skinID: " + this.skinItem.skinID);
        }
        else {
            console.log("Da co skinID: " + this.skinItem.skinID);
            this.spritePrice.spriteFrame = this.ownedSprite;
            this.labelPrice.string = "Owned";
            this.itemButton.node.off(Button.EventType.CLICK, this.onButtonBuy, this);
        }
    }

    onButtonBuy() {
        game.emit("buyItem", this);
    }
}


