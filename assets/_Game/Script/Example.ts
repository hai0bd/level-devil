import { _decorator, Animation,Component} from 'cc';
import { Player } from './Player';
import { TrapMove } from './TrapMove';
const { ccclass, property } = _decorator;

@ccclass('Example')
export class Example extends Component {
    @property({ type: Player })
    public player: Player | null = null;

    @property(Animation)
    gateAnim: Animation;

    @property(TrapMove)
    groundTrap: TrapMove[] = [];

    update(deltaTime: number) {
        if (this.player.isTrapped > 0) {
            console.log("isTrapped");
            this.moveTrap(this.player.isTrapped);
        }
    }
    moveTrap(index: number) {
        this.groundTrap[index].enabled = true;
    }
}


