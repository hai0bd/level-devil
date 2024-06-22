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

    start() {
        this.playerSkinData = DataManager.instance.playerData.skinID;
        this.skinIndex = DataManager.instance.playerData.curentSkin;

        this.spawnCurrentSkin(this.skinIndex);
    }

    onDisable() {
        GameManager.instance.playerSkin = this.skin;
        // console.log(GameManager.instance.playerSkin);
        console.log(DataManager.instance.listGameSkin);
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
        console.log(index);
        this.skin = this.findSkin(this.playerSkinData[index]);
        if (this.skin == null) console.log("skin null");
        else console.log(this.skin);
        this.skinSprite.spriteFrame = this.skin.sprite;
        DataManager.instance.playerData.curentSkin = this.skinIndex;
    }

    findSkin(id: string): Skin {
        const listGameSkin = DataManager.instance.listGameSkin;

        for (let i = 0; i < listGameSkin.length; i++) {
            if (listGameSkin[i].skinID == id) return listGameSkin[i];
        }
        return null;
    }
}