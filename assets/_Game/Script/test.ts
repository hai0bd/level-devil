import { _decorator, animation, Animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    @property(Animation)
    anim: Animation;

    start() {
        console.log(this.anim.clips[2].tracks);
    }

    update(deltaTime: number) {

    }
}


