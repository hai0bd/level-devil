import { _decorator, animation, Animation, AnimationClip, Component, Node, SpriteFrame } from 'cc';
import { AudioSourceControl, SoundType } from './Manager/AudioSourceControl';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    @property(Animation)
    anim: Animation;

    clickButton() {
        this.anim.play("test");
    }
}


