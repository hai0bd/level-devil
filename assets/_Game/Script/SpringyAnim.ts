import { _decorator, CCFloat, Component, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpringyAnim')
export class SpringyAnim extends Component {
    @property(CCFloat)
    duration: number = 1;

    @property(Vec3)
    startPos: Vec3 = null;
    @property(Vec3)
    endPos: Vec3 = null;

    start() {
        this.springyTween();
    }
    springyTween() {
        tween(this.node.position)
        .to(this.duration, this.endPos, {easing: 'quartOut', 
            onUpdate: (target: Vec3, ratio: number) => {
                this.node.position = target;
            },
        })
        .to(this.duration, this.startPos, {easing: 'quartIn', 
            onUpdate: (target: Vec3, ratio: number) => {
                this.node.position = target;
            },
        })
        .union()
        .repeatForever()
        .start();
    }
}


