import { _decorator, Animation, AnimationClip, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerMotion')
export class PlayerMotion extends Component {
    @property(Animation)
    playerAnim: Animation;

    start() {
        let clips = this.playerAnim.clips;
        for (let i = 0; i < clips.length; i++) {
            // console.log(clips[i].speed, + " " + clips[i].sample);
            console.log(clips[0]);
        }
    }
}