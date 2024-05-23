import { _decorator, CCFloat, CCInteger, Component, Node, PlaceMethod, Sprite, tween, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TrapMove')
export class TrapMove extends Component {

    @property({ type: Node })
    targetNode: Node[] = [];

    @property({ type: CCFloat })
    duration: number = 0;

    index: number = 0;

    trapPos: Vec3 = new Vec3(0, 0, 0);
    currentTarget: Vec3;

    canMove: boolean = true;

    start() {
        // this.move();
        this.movetoTarget();
        
    }

    movetoTarget() {
        if(this.index >= this.targetNode.length) return;
        tween(this.node.position)
            .to(this.duration, this.targetNode[this.index].position, {
                onUpdate: (target: Vec3, ratio: number) => { this.node.position = target }
            })
            .call(() => {
                this.index++;
                this.movetoTarget();    
            })
            .start();
    }
}


