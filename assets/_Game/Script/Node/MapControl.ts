import { _decorator, Animation, Component, RigidBody2D } from 'cc';
import { DeathAnim } from '../DeathAnim';
import { PlayerController } from '../PlayerController';
import { AudioSourceControl, SoundType } from '../Manager/AudioSourceControl';
const { ccclass, property } = _decorator;

@ccclass("MapControl")
export class MapControl extends Component {
    /* @property(Player)
    player: Player; */

    @property(Animation)
    gateAnim: Animation | null = null;

    @property(DeathAnim)
    playerDeathAnim: DeathAnim;

    @property(PlayerController)
    player: PlayerController;

    /* start(){
        this.playSfx(SoundType.Background_Music);
    }
    
    protected onDestroy(): void {
        this.offSfx(SoundType.Background_Music);
    }

    playSfx(sound: SoundType){
        const audio = AudioSourceControl.instance;
        audio.playSound(sound)
    }

    offSfx(sound: SoundType){
        const audio = AudioSourceControl.instance;
        audio.stopSound(sound);
    } */
}
