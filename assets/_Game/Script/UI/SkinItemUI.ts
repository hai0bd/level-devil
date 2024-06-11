import { _decorator, Button, Component, EventHandle, EventHandler, Label, Node, Sprite, SpriteFrame } from 'cc';
import { DataManager } from '../Manager/DataManager';
import { Skin } from '../Node/Skin';
const { ccclass, property } = _decorator;

@ccclass('SkinItemUI')
export class SkinItemUI extends Component {
    @property(Sprite)
    spriteItems: Sprite;

    @property(Button)
    itemButton: Button;

    init(item: Skin) {
        this.spriteItems.spriteFrame = item.sprite;
        this.setEvenClickButton(item.skinID);
        
    }
    setEvenClickButton(itemID: string) {
        let clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "SkinItemUI";
        clickEventHandler.handler = "onButtonBuy";
        clickEventHandler.customEventData = itemID;
        this.itemButton.clickEvents.push(clickEventHandler);
    }

    onButtonBuy(deltaTime: number, customEventData: string) {
        console.log("Da mua thanh cong");
        alert("Đã mua thành công");
        DataManager.instance.addSkin(parseInt(customEventData));
    }
}


