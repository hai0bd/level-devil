import { _decorator, Canvas, Component, director, Node, path, resources, Sprite, SpriteFrame, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('resource_load')
export class resource_load extends Component {
    /* start() {
       let imagePath = [
        "fbf/idle",
        "fbf/jump",
        "fbf/walk1",
        "fbf/walk2"
       ];

       let spriteFrames: SpriteFrame[] = [];

       let count = 0;

       imagePath.forEach((path, index) => {
        resources.load(path, SpriteFrame, (err, spriteFrame) => {
            if(err){
                console.log("error");
                return;
            }
            spriteFrames[index] = spriteFrame;
            count++;

            if(count == path.length){
                spriteFrames.forEach((spriteFrame, index) => {
                    let spriteNode = new Node();
                    let sprite = spriteNode.addComponent(Sprite);
                    sprite.spriteFrame = spriteFrame;
                })
            }
        })
       })
    } */
    currentPosX: number = -50;
    start() {
        resources.loadDir("Skins/" + "0" + "/JumpAnim", SpriteFrame, function (err, assets) {
            if (err) {
                console.log("Error");
                return;
            }
            assets.forEach((spriteFrame, index) => {
                let spriteNode = new Node();
                let sprite = spriteNode.addComponent(Sprite);
                sprite.spriteFrame = spriteFrame;

                let pos = new Vec3(index + 50, 0, 0);
                spriteNode.setPosition(pos);

                director.getScene().getChildByName("Canvas").addChild(spriteNode);
            })
        })
        /* resources.load("fbf/idle/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log("Error");
            }
            this.node.getComponent(Sprite).spriteFrame = spriteFrame;
        }) */
    }
}


