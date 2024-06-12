import { _decorator, Component, Node, Sprite } from 'cc';
import { SpawnItemSkin } from './SpawnItemSkin';
import { Skin } from '../Node/Skin';
import { DataManager } from '../Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerSkinUI')
export class PlayerSkinUI extends Component {
    @property(SpawnItemSkin)
    skinSpawm: SpawnItemSkin = null;

    @property(Sprite)
    skinSprite: Sprite;

    skinIndex: number = 0;
    playerSkinData: Skin[];

    start() {
        const listSkin = this.skinSpawm.listSkin;
        console.log(listSkin.length);
        console.log(DataManager.instance.testDataMN());
        for (let i = 0; i < listSkin.length; i++) {
            this.checkID(listSkin[i]);
        }
        // console.log(this.playerSkinData.length);
        /* this.spawnCurrentSkin(this.skinIndex);
        for (let i = 0; i < this.playerSkinData.length; i++) {
            console.log(this.playerSkinData[i].skinID + ' ');
        } */
    }

    checkID(skin: Skin) {
        // console.log(skin.skinID);
        // console.log(DataManager.instance.playerData.deathTimes);
        /* if (data.playerData.skinID.indexOf(skin.skinID) != -1) {
            this.playerSkinData.push(skin);
        } */
    }

    nextSkin() {
        this.skinIndex++;
        this.spawnCurrentSkin(this.skinIndex);
    }

    previousSkin() {
        this.skinIndex--;
        this.spawnCurrentSkin(this.skinIndex);
    }

    spawnCurrentSkin(index: number) {
        if (index >= this.playerSkinData.length || index < 0) return;
        this.skinSprite.spriteFrame = this.playerSkinData[index].sprite;
    }
}