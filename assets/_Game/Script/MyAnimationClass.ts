import { AnimationClip, Component, SpriteFrame, _decorator, Animation, CCFloat, animation } from "cc";
import { Skin } from "./Node/Skin";
import { GameManager } from "./Manager/GameManager";


const { ccclass, property } = _decorator;

@ccclass
export default class MyAnimationClass extends Component {
    @property(Animation)
    anim: Animation;

    @property([SpriteFrame])
    frames: SpriteFrame[] = [];

    @property([CCFloat])
    keyFrames: number[] = [];

    @property(CCFloat)
    speed: number;

    @property(CCFloat)
    sample: number;

    start() {
        const skin = GameManager.instance.playerSkin;
        console.log(skin);
        this.setSkin(skin);
    }

    setSkin(skin: Skin) {
        this.animIdle(skin.idleAnim);
        this.animRun(skin.runAnim);
        this.animJump(skin.jumpAnim);
    }

    animIdle(frames: SpriteFrame[]) {
        this.createAnimationFromFrames(
            frames,
            [0, 10],
            AnimationClip.WrapMode.Loop,
            3,
            15,
            "idle"
        );
    }

    animRun(frames: SpriteFrame[]) {
        this.createAnimationFromFrames(
            frames,
            [0, 1, 10, 15],
            AnimationClip.WrapMode.Loop,
            3,
            15,
            "run"
        );
    }

    animJump(frames: SpriteFrame[]) {
        this.createAnimationFromFrames(
            frames,
            [0, 4, 23, 26],
            AnimationClip.WrapMode.Normal,
            3,
            15,
            "jump"
        );
    }

    createAnimationFromFrames(frames: SpriteFrame[], keyframes: number[], wrapMode: AnimationClip.WrapMode, speed, sample: number, name: string) {
        // Tạo một Animation Clip mới
        let animationClip = this.createWithSpriteFrames(frames, sample, keyframes, speed)
        animationClip.name = name;

        animationClip.wrapMode = wrapMode;

        // Thêm Animation Clip vào Animation component
        this.anim.addClip(animationClip);

        // Chạy Animation
        // this.anim.play("test");
        if (name === "idle") this.anim.defaultClip = animationClip;
    }

    public createWithSpriteFrames(spriteFrames: SpriteFrame[], sample, keyFrames: number[], speed: number) {
        const clip = new AnimationClip();
        clip.sample = sample;
        clip.duration = 1 / speed;
        const track = new animation.ObjectTrack<SpriteFrame>();
        track.path = new animation.TrackPath().toComponent('cc.Sprite').toProperty('spriteFrame');
        const curve = track.channels()[0].curve;
        curve.assignSorted(spriteFrames.map((spriteFrame, index) => [keyFrames[index] / (sample * speed), spriteFrame]));
        clip.addTrack(track);

        return clip;
    }
}
