import {_decorator, Component, director, game, instantiate, Prefab, resources, sys} from 'cc';
import {GateNativeBridge} from "db://assets/_Game/Script/NativeBridge";

const {ccclass, property} = _decorator;

@ccclass('ShopUI')
export class ShopUI extends Component {
    onLoad() {
        game.on("ON_NATIVE_MESSAGE", this.handleIap, this);
    }

    onDisable() {
        game.off("ON_NATIVE_MESSAGE", this.handleIap, this);
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

                // this.dialogNotify("Cancel, purchase unsuccessfully!");
                //     update to server
            } else if (value?.state === "error") {
                //     thanh toan thanh cong
                // this.dialogNotify("Purchase unsuccessfully!");
                //     update to server
            }
        }
    }
    
    dialogNotify(message) {
        resources.load("PopUp/Dialog", (err, asset) => {
            var nodeLoading = instantiate(asset as Prefab);
            director.getScene().getChildByName("Canvas").addChild(nodeLoading);

            // const st = director
            //     .getScene()
            //     .getChildByName("Canvas")
            //     .getChildByName("Dialog").getComponent(Dialog);
            //
            // st.setContent(message);
        });

    }

    handlePurchaseSuccess(productId) {
        console.log('handlePurchaseSuccess ', productId)

        if (productId === 'com.chienbinh.0.99') {

            // mua thanh cong
            // this.dialogNotify("Purchase successfully!");
        }

    }

    onTouchItem() {
        //  goi khi bam mua item

        const productId = 'com.chienbinh.0.99'
        if (sys.isNative) {
            GateNativeBridge.purchaseProduct(productId);
        } else {
            setTimeout(() => {
                callByNative("iap", {
                    state: "success",
                    productId: productId,
                });
            }, 500);
        }
    }
}

