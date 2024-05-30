import { _decorator, Animation, Component, Game, Node } from "cc";
import { Player } from "./Player";
import { TrapMove } from "./TrapMove";
const { ccclass, property } = _decorator;

@ccclass("MapControl")
export class MapControl extends Component {
    @property({ type: Player })
    public player: Player | null = null;

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
}
export enum CollisionTag {
    TrapPoint = 1,
    FinishPoint = 2,
    DeathPoint = 3,
    Food = 4,
    Bounce = 5,
    Portal = 6,
}
