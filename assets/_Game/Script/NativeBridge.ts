import { game, native, sys } from "cc";

export var GateNativeBridge = {
    purchaseProduct: function (productId) {
        var r = "";
        if (sys.os == sys.OS.ANDROID && sys.isNative) {
            r = native.reflection.callStaticMethod(
                "com/cocos/game/AppActivity",
                "purchaseProduct",
                "(Ljava/lang/String;)V",
                productId
            );
        } else if (sys.os == sys.OS.IOS && sys.isNative) {
            r = native.reflection.callStaticMethod(
                "ViewController",
                "purchaseProduct:",
                productId
            );
        }
        return r;
    },
};

console.log("INIT NATIVE CALL");
window.callByNative = function (key: string, value: any) {
    console.log("call By Native 111:", key, JSON.stringify(value));
    game.emit("ON_NATIVE_MESSAGE", {
        key,
        value,
    });
};
