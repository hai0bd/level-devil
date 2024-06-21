import { _decorator, animation, Animation, AnimationClip, CCFloat, Component, Node, SpriteFrame } from 'cc';
import { AudioSourceControl, SoundType } from './Manager/AudioSourceControl';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    @property([SpriteFrame])
    frames: SpriteFrame[] = [];

    @property([CCFloat])
    keyFrames: number[] = [];

    @property(CCFloat)
    speed: number;

    @property(CCFloat)
    sample: number;

    start() {
        // Kiểm tra nếu có frames
        if (this.frames.length > 0) {
            this.createAnimationFromFrames(this.frames, this.keyFrames, this.speed, this.sample);
        }
    }

    createAnimationFromFrames(frames: SpriteFrame[], keyframes: number[], speed, sample: number) {
        // Tạo một Animation Clip mới
        let animationClip = this.createWithSpriteFrames(frames, sample, keyframes, speed)
        animationClip.name = "customAnimation";

        animationClip.wrapMode = AnimationClip.WrapMode.Loop;

        // Tạo Animation component nếu chưa có
        let animation = this.node.getComponent(Animation);
        if (!animation) {
            animation = this.node.addComponent(Animation);
        }

        // Thêm Animation Clip vào Animation component
        animation.addClip(animationClip);

        // Chạy Animation
        animation.play("customAnimation");
    }

    public createWithSpriteFrames(spriteFrames: SpriteFrame[], sample, keyFrames: number[], speed: number) {
        const clip = new AnimationClip();
        clip.sample = sample;
        console.log(clip.sample);
        clip.duration = 1 / speed;
        console.log(clip.duration)
        const track = new animation.ObjectTrack<SpriteFrame>();
        track.path = new animation.TrackPath().toComponent('cc.Sprite').toProperty('spriteFrame');
        const curve = track.channels()[0].curve;
        spriteFrames.map((spriteFrame, index) => {
            console.log(keyFrames[index] + " " + index + " " + spriteFrame)
        })
        curve.assignSorted(spriteFrames.map((spriteFrame, index) => [keyFrames[index] / (sample * speed), spriteFrame]));
        clip.addTrack(track);
        return clip;
    }

}


