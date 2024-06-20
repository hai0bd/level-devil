import { _decorator, Animation, Camera, Component, instantiate, Node, Prefab, UITransform } from "cc";
import { MapControl } from "../Node/MapControl";
import { ScreenShake } from "../ScreenShake";
import { Gate } from "../Node/Gate";
import { AudioSourceControl } from "./AudioSourceControl";
import { MapUI } from "../UI/MapUI";
import { UIManager } from "../UI/UIManager";
import { Skin } from "../Node/Skin";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
    private static _instance: GameManager;
    @property(Node)
    canvas: Node | null = null;

    @property(ScreenShake)
    mainCamera: ScreenShake = null;

    @property(MapUI)
    map: MapUI;

    @property(Prefab)
    gatePrefab: Prefab[] = [];

    gate: Node;
    gateControl: Gate;
    playerSkin: Skin;

    currentGateIndex: number = 0;

    public static get instance(): GameManager {
        if (!this._instance) {
            this._instance = new GameManager;
        }
        return this._instance;
    }

    onLoad() {
        if (!GameManager._instance) {
            GameManager._instance = this;
        } else {
            this.destroy();
        }
    }

    screenShake() {
        this.mainCamera.init();
    }

    nextGate() {
        this.gate.destroy();
        UIManager.instance.gamePlayUI.onClickEsc();
        this.map.showGatePos(++this.currentGateIndex);
        // this.instantieGate(++this.currentGateIndex);
    }

    instantieGate(index: number) {
        this.currentGateIndex = index;
        this.gate = instantiate(this.gatePrefab[index])
        this.canvas.addChild(this.gate);
    }
}
export enum CollisionTag {
    TrapPoint = 1,
    FinishPoint = 2,
    DeathPoint = 3,
    Player = 4,
    Food = 5,
    Bounce = 6,
    Portal = 7,
}
