<<<<<<< HEAD
import { _decorator, Animation, Component, Game, Node, RigidBody2D } from 'cc';
import { Player } from './Player';
import { TrapMove } from './TrapMove';
import { DeathAnim } from './DeathAnim';
=======
import { _decorator, Animation, Component, Game, Node } from "cc";
import { Player } from "./Player";
import { TrapMove } from "./TrapMove";
>>>>>>> 08e55a99003dbc95a8418b13af9bedeb34f21330
const { ccclass, property } = _decorator;

@ccclass("MapControl")
export class MapControl extends Component {
    @property({ type: Player })
    public player: Player | null = null;
<<<<<<< HEAD
    
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
=======

    @property(Animation)
    gateAnim: Animation;

    @property(TrapMove)
    groundTrap: TrapMove;

    update(deltaTime: number) {
        if (this.player.isTrapped) {
            this.moveTrap();
        }
    }
    moveTrap() {
        this.groundTrap.enabled = true;
    }
>>>>>>> 08e55a99003dbc95a8418b13af9bedeb34f21330
}
export enum CollisionTag {
    TrapPoint = 1,
    FinishPoint = 2,
    DeathPoint = 3,
    Food = 4,
    Bounce = 5,
    Portal = 6,
}
