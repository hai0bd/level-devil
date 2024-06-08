import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioSourceControl')
export class AudioSourceControl extends Component {
    private static _instance: AudioSourceControl;
    /* @property({ type: AudioClip })
    backgroundMusic: AudioClip = null; */

    @property({ type: AudioClip })
    jumpSound: AudioClip = null;

    @property({ type: AudioClip })
    dieSound: AudioClip = null;

    @property({ type: AudioClip })
    winSound: AudioClip = null;

    @property(AudioSource)
    soundEffectSource: AudioSource | null = null;

    public static get instance(): AudioSourceControl {
        if (!this._instance) {
            this._instance = new AudioSourceControl;
        }
        return this._instance;
    }

    onLoad() {
        if (!AudioSourceControl._instance) {
            AudioSourceControl._instance = this;
        } else {
            this.destroy();
        }
    }

    playSound(type: SoundType) {
        if (this.soundEffectSource) {
            let clipToPlay: AudioClip | null = null;
            switch (type) {
                case SoundType.E_Sound_Jump:
                    clipToPlay = this.jumpSound;
                    break;
                case SoundType.E_Sound_Die:
                    clipToPlay = this.dieSound;
                    break;
                case SoundType.E_Sound_Win:
                    clipToPlay = this.winSound;
                    break;
            }
            if (clipToPlay) {
                this.soundEffectSource.clip = clipToPlay;
                this.soundEffectSource.play();
            }
        }
    }
}
export enum SoundType {
    E_Sound_Jump = 1,
    E_Sound_Die = 2,
    E_Sound_Win = 3
}