import { _decorator, Button, Component, game, Label, Node, sys } from 'cc';
import { GateNativeBridge } from "db://assets/_Game/Script/NativeBridge";
import { BouncePopUp } from './BouncePopUp';
import { DataManager } from '../Manager/DataManager';

const { ccclass, property } = _decorator;

@ccclass('ShopUI')
export class ShopUI extends Component {
    @property(BouncePopUp)
    dialog: BouncePopUp;

    @property(Label)
    labelDialog: Label;

    @property(Button)
    buttonDialog: Button;

    onLoad() {
        game.on("ON_NATIVE_MESSAGE", this.handleIap, this);
        game.on("buyItem", this.buyItem, this);
    }

    onDisable() {
        game.off("ON_NATIVE_MESSAGE", this.handleIap, this);
        DataManager.instance.saveData();
    }

    handleIap(data) {
        const key = data.key;
        if (key === "iap") {
            const value = data.value;
            if (value?.state === "success") {
                //     thanh toan thanh cong

                this.handlePurchaseSuccess(value.productId);
                //     update to server
            } else if (value?.state === "cancel") {
                //     thanh toan thanh cong

                this.dialogNotify("Cancel, purchase unsuccessfully!");
                //     update to server
            } else if (value?.state === "error") {
                //     thanh toan thanh cong
                this.dialogNotify("Purchase unsuccessfully!");
                //     update to server
            }
        }
    }

    buyItem(item) {
        const skin = item.skinItem;
        // this.dialogNotify("Congrat! Purchase successfully!");
        DataManager.instance.addSkin(skin.skinID);
        const productId = 'com.chienbinh.0.99'
        if (sys.isNative) {
            GateNativeBridge.purchaseProduct(productId);
        } else {
            setTimeout(() => {
                callByNative("iap", { state: "success", productId: productId, });
            }, 500);
        }
        item.checkSkin();
    }

    dialogNotify(message) {
        //load bằng scene
        //mở popup lên
        this.dialog.node.active = true;
        this.dialog.init();
        //set nội dung cho popup
        this.labelDialog.string = message;
        //click để tắt popup
        this.buttonDialog.node.on(Node.EventType.TOUCH_END, this.buttonDialogClick, this);

        // load bằng resource
        /* resources.load('dialog-notify', SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.error("Failed to load spriteFrame: ${err}");
                return;
            }
            let nodeDialog = new Node('Sprite');
            let sprite = nodeDialog.addComponent(Sprite);
            sprite.spriteFrame = spriteFrame;

            let canvasNode = director.getScene().getChildByName('Canvas');
            if (canvasNode) {
                canvasNode.addChild(nodeDialog);
            }

            const st = director.getScene().getChildByName('Canvas').addChild(nodeDialog);
            // st.setContent(message);
        }) */

        /* resources.load('dialog-notify', (err, asset) => {
            var nodeLoading = instantiate(asset as Prefab);
            const st = director.getScene().getChildByName("Canvas").addChild(nodeLoading);
            //    st.setContent(message);

            // const st = director
            //     .getScene()
            //     .getChildByName("Canvas")
            //     .getChildByName("Dialog").getComponent(Dialog);

            // st.setContent(message);
        }); */

    }

    buttonDialogClick() {
        this.dialog.onClickEsc();
    }

    handlePurchaseSuccess(productId) {
        console.log('handlePurchaseSuccess ', productId)

        if (productId === 'com.chienbinh.0.99') {

            // mua thanh cong
            this.dialogNotify("Congrat! Purchase successfully!");
        }

    }

    /* onTouchItem() {
        //  goi khi bam mua item

        const productId = 'com.chienbinh.0.99'
        if (sys.isNative) {
            GateNativeBridge.purchaseProduct(productId);
        } else {
            setTimeout(() => {
                callByNative("iap", {state: "success", productId: productId,});
            }, 500);
        }
    } */
}

