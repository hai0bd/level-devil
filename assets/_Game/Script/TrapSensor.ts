import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact } from 'cc';
import { CollisionTag } from './GameManager';
import { TrapMove } from './TrapMove';
const { ccclass, property } = _decorator;

@ccclass('TrapSensor')
export class TrapSensor extends Component {
    @property(Collider2D)
    trapSensorCollider: Collider2D;

    @property(TrapMove)
    trapMove: TrapMove[] = [];

    index: number = 0;

    start() {
        this.checkCollider()
    }
    checkCollider() {
        const collier = this.trapSensorCollider;
        if (collier) {
            collier.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == CollisionTag.Player) {
            this.trapMove[this.index].enabled = true;
            this.index++;
        }
    }
}


