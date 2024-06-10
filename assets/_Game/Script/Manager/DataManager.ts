import { _decorator, Component, Node, sys } from 'cc';
import { Skin } from '../Node/Skin';
const { ccclass, property } = _decorator;

@ccclass('DataManager')
export class DataManager extends Component {
    private static _instance: DataManager;

    keyPlayerData: string = "playerData";
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
    }

    start() {
        let data = sys.localStorage.getItem(this.keyPlayerData);
        if (data) {
            this.playerData = JSON.parse(data);
        }
        else this.playerData = new PlayerData();
    }

    addSkin(skin: Skin) {
        this.playerData.skin.push(skin);
    }

    deathTimesPlus() {
        this.playerData.deathTimes++;
    }

    addGate() {
        this.playerData.gate++;
    }

    saveData() {
        var jsonData = JSON.stringify(this.playerData);
        sys.localStorage.setItem(this.keyPlayerData, jsonData);
    }
}

export class PlayerData {
    deathTimes: number;
    gate: number;
    skin: Skin[];

    PlayerData() {
        this.deathTimes = 10;
        this.skin = null;
        this.gate = null;
    }
}
