import { __private, _decorator, Animation, AnimationClip, BoxCollider2D, CCFloat, CCInteger, Collider2D, Component, Contact2DType, EventKeyboard, Input, input, IPhysics2DContact, KeyCode, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import { CollisionTag } from './MapControl';
import { DeathAnim } from './DeathAnim';
import { AudioSourceControl, SoundType } from './AudioSourceControl';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property({ type: Node })
    startPoint: Node | null = null;

    @property(Animation)
    playerAnim: Animation | null = null;

    @property(RigidBody2D)
    playerRb: RigidBody2D | null = null;

    @property(Collider2D)
    playerCollider: Collider2D | null = null;

    @property(DeathAnim)
    playerDeathAnim: DeathAnim | null = null;

    @property({ type: CCFloat })
    speed: number = 1;

    @property({ type: CCInteger })
    jumpForce: number = 1;

    public isTrapped: boolean = false;
    public isWin: boolean = false;
    public isLose: boolean = false;

    private inputDirection: Vec2 = new Vec2(0, 0);
    private playerPos: Vec3 = new Vec3(0, 0, 0);

    private currentAnim: string = null;

    private canMove: boolean = false;
    private isJumping: boolean = false;
    // private isPlayAnim: boolean = false;

    start() {
        //this.init();
        this.node.setPosition(this.startPoint.position);
        input.on(Input.EventType.KEY_DOWN, this.getDirection, this);
        input.on(Input.EventType.KEY_UP, this.offInput, this);
        this.colliderEvent();
    }

    init() {
        this.isLose = false;
        this.isWin = false;
        this.isTrapped = false;
    }

    getDirection(EventType: EventKeyboard) {
        if (KeyCode.ARROW_UP == EventType.keyCode || KeyCode.KEY_W == EventType.keyCode) {
            // this.inputDirection = new Vec2(this.inputDirection.x, 1);
            this.playerJump();
        }
        else if (KeyCode.ARROW_LEFT == EventType.keyCode || KeyCode.KEY_A == EventType.keyCode) {
            this.canMove = true;
            this.inputDirection = new Vec2(-1, 0);

            this.playerAnim.node.setScale(new Vec3(1, 1, 1));
        }
        else if (KeyCode.ARROW_RIGHT == EventType.keyCode || KeyCode.KEY_D == EventType.keyCode) {
            this.canMove = true;
            this.inputDirection = new Vec2(1, 0);

            this.playerAnim.node.setScale(new Vec3(-1, 1, 1));
        }
    }
    offInput(EventType: EventKeyboard) {
        /* if (KeyCode.ARROW_UP == EventType.keyCode || KeyCode.KEY_W == EventType.keyCode) {
            // this.playerJump();
        } 
        else*/
        if (KeyCode.ARROW_LEFT == EventType.keyCode || KeyCode.KEY_A == EventType.keyCode) {
            this.canMove = false;
        }
        else if (KeyCode.ARROW_RIGHT == EventType.keyCode || KeyCode.KEY_D == EventType.keyCode) {
            this.canMove = false;
        }
    }

    colliderEvent() {
        const collider = this.playerCollider;
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        const audio = AudioSourceControl.instance;
        if (otherCollider.tag == CollisionTag.TrapPoint) {
            this.isTrapped = true;
        }
        else if (otherCollider.tag == CollisionTag.FinishPoint) {
            this.isWin = true;
            audio.playSound(SoundType.E_Sound_Win);
        }
        else if (otherCollider.tag == CollisionTag.DeathPoint) {
            this.isLose = true;
            audio.playSound(SoundType.E_Sound_Die);
        }
    }
    update(deltaTime: number) {
        if (this.canMove) {
            this.move();
        }
        else if (!this.isJumping) this.ChangeAnim("PlayerIdle");


    }

    move() {
        if (!this.isJumping) {
            this.ChangeAnim("PlayerMove");
        }
        this.node.getPosition(this.playerPos);
        // this.playerPos = new Vec3(this.playerPos.x += (this.inputDirection.x * this.speed), this.playerPos.y += (this.inputDirection.y * this.jumpSpeed), 0);
        this.playerPos = new Vec3(this.playerPos.x += (this.inputDirection.x * this.speed), this.playerPos.y, 0);
        this.node.setPosition(this.playerPos);

    }

    playerJump() {
        const audio = AudioSourceControl.instance;
        audio.playSound(SoundType.E_Sound_Jump);
        this.ChangeAnimJump("PlayerJump");
    }

    ChangeAnim(animName: string) {
        if (this.currentAnim != animName) {
            this.currentAnim = animName;
            this.playerAnim.play(animName);
        }
    }

    ChangeAnimJump(animName: string) {
        if (this.isJumping) return;
        this.isJumping = true;

        this.playerRb.applyLinearImpulseToCenter(new Vec2(0, this.jumpForce), true);

        if (this.currentAnim != animName) {
            this.currentAnim = animName;
        }
        this.playerAnim.play(animName);

        this.playerAnim.on(Animation.EventType.FINISHED, this.onAnimFinish, this);
    }
    onAnimFinish() {
        this.isJumping = false;
        console.log("da chay xong anim");
    }


}


