import { _decorator, assert, Component, Game, Node, resources, SpriteFrame, sys } from 'cc';
import { Skin } from '../Node/Skin';
const { ccclass, property } = _decorator;

@ccclass('DataManager')
export class DataManager extends Component {
    private static _instance: DataManager;

    @property(Skin)
    listGameSkin: Skin[] = [];

    keyPlayerData: string = "PlayerData";
    playerData: PlayerData;

    public static get instance(): DataManager {
        if (!this._instance) {
            this._instance = new DataManager;
        }
        return this._instance;
    }

    onLoad() {
        if (!DataManager._instance) {
            DataManager._instance = this;
        } else {
            this.destroy();
        }
        // this.testResources();
        // this.setSkinData();
    }

    start() {
        this.loadPlayerData();
    }

    setSkinData() {
        for (let i = 0; i <= this.listGameSkin.length; i++) {
            const index = i.toString();
            this.listGameSkin[i].skinID = index;

            //set idle anim
            resources.loadDir("Skins/" + index + "/IdleAnim", SpriteFrame, (err, assets) => {
                if (err) {
                    console.log("Failed to load sprite");
                    return;
                }
                this.listGameSkin[i].idleAnim = assets;
            })

            resources.loadDir("Skins/" + index + "/RunAnim", SpriteFrame, (err, assets) => {
                if (err) {
                    console.log("Failed to load sprite");
                    return;
                }
                this.listGameSkin[i].runAnim = assets;
            })

            resources.loadDir("Skins/" + index + "/JumpAnim", SpriteFrame, (err, assets) => {
                if (err) {
                    console.log("Failed to load sprite");
                    return;
                }
                this.listGameSkin[i].jumpAnim = assets;
            })

            //set main skin
            this.listGameSkin[i].sprite = this.listGameSkin[i].idleAnim[0];
        }
    }

    loadPlayerData() {
        let data = sys.localStorage.getItem(this.keyPlayerData);
        if (data) {
            this.playerData = JSON.parse(data);
        }
        else this.playerData = new PlayerData();
    }

    addSkin(skinID: string) {
        if (this.playerData.skinID.indexOf(skinID) == -1) {
            this.playerData.skinID.push(skinID);
        }
    }

    deathTimesAccrete() {
        this.playerData.deathTimes++;
    }

    addGate() {
        this.playerData.gate++;
    }

    saveData() {
        var jsonData = JSON.stringify(this.playerData);
        sys.localStorage.setItem(this.keyPlayerData, jsonData);
    }

    resetData() {
        sys.localStorage.clear();
    }

    /* findSkin(id: string): Skin {
        for (let i = 0; i < this.listGameSkin.length; i++) {
            if (this.listGameSkin[i].skinID == id) return this.listGameSkin[i];
            }
            return null;
            } */
}

export class PlayerData {
    deathTimes: number;
    gate: number;
    skinID: string[] = [];
    curentSkin: number;

    constructor() {
        this.deathTimes = 10;
        this.gate = 0;
        this.skinID = ["0"];
        this.curentSkin = 0;
    }
}
