import { _decorator, Component, Node, Sprite } from 'cc';
import { Skin } from '../Node/Skin';
import { DataManager } from '../Manager/DataManager';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerSkinUI')
export class PlayerSkinUI extends Component {
    @property(Sprite)
    skinSprite: Sprite;

    skinIndex: number = 0;
    listGameSkin: Skin[];
    playerSkinData: string[];

    skin: Skin;

    testDtMN: number;

    start() {
        // console.log(DataManager.instance.playerData.curentSkin);
        this.skinIndex = DataManager.instance.playerData.curentSkin;
        this.listGameSkin = DataManager.instance.listGameSkin;
        this.playerSkinData = DataManager.instance.playerData.skinID;

        this.spawnCurrentSkin(this.skinIndex);
    }

    onDisable(){
        GameManager.instance.playerSkin = this.skin;
        console.log(GameManager.instance.playerSkin);
    }

    nextSkin() {
        if (this.skinIndex + 1 >= this.playerSkinData.length) return;
        this.skinIndex++;
        this.spawnCurrentSkin(this.skinIndex);
    }

    previousSkin() {
        if (this.skinIndex - 1 >= this.playerSkinData.length || this.skinIndex - 1 < 0) return;
        this.skinIndex--;
        this.spawnCurrentSkin(this.skinIndex);
    }

    spawnCurrentSkin(index: number) {
        this.skin = this.findSkin(this.playerSkinData[index]);
        this.skinSprite.spriteFrame = this.skin.sprite;
        DataManager.instance.playerData.curentSkin = this.skinIndex;
    }
    findSkin(id: string): Skin {
        for (let i = 0; i < this.listGameSkin.length; i++) {
            if (this.listGameSkin[i].skinID == id) return this.listGameSkin[i];
        }
        return null;
    }
}