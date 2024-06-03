import { _decorator, Animation, Component, Game, Node, RigidBody2D } from 'cc';
import { Player } from './Player';
import { TrapMove } from './TrapMove';
import { DeathAnim } from './DeathAnim';
const { ccclass, property } = _decorator;

@ccclass('MapControl')
export class MapControl extends Component {
    
    @property({type: Player})
    public player: Player | null = null;
    
    @property (Animation)
    gateAnim: Animation | null = null;

    @property(DeathAnim)
    playerDeathAnim: DeathAnim;
    
    /* update(deltaTime: number) {
        if(this.player.isTrapped > 0){
            console.log("isTrapped");
            this.moveTrap(this.player.isTrapped);
        }
    }
    moveTrap(index: number){
        this.groundTrap[index].enabled = true;
    } */
}
export enum CollisionTag{
    TrapPoint = 1,
    FinishPoint = 2,
    DeathPoint = 3,
    Food = 4,
    Bounce = 5,
    Portal = 6,
}

