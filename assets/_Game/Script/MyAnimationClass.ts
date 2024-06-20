import { AnimationClip, Component, SpriteFrame, _decorator, Animation, CCFloat, animation } from "cc";
import { test } from "./test";
import { DataManager } from "./Manager/DataManager";
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
        this.setSkin(skin)
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
            "run"
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
            AnimationClip.WrapMode.Loop,
            3,
            15,
            "run"
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
        this.anim.play("test");
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

    // public createWithSpriteFrames (spriteFrames: SpriteFrame[], sample: number, keyFrames: number[]) {
    //     const clip = new AnimationClip();
    //     clip.sample = sample || clip.sample;
    //     clip.duration = spriteFrames.length / clip.sample;
    //     const step = 1 / clip.sample;
    //     const track = new animation.ObjectTrack<SpriteFrame>();
    //     track.path =  new animation.TrackPath().toComponent('cc.Sprite').toProperty('spriteFrame');
    //     const curve = track.channels()[0].curve;
    //     spriteFrames.map((spriteFrame, index) => {
    //         console.log(step * index + " " + index + " " + spriteFrame)
    //     })
    //     curve.assignSorted(spriteFrames.map((spriteFrame, index) => [step * index, spriteFrame]));
    //     clip.addTrack(track);
    //     return clip;
    // }


}
