import { _decorator, Component, Node, Sprite } from 'cc';
import { Skin } from '../Node/Skin';
import { DataManager } from '../Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerSkinUI')
export class PlayerSkinUI extends Component {
    @property(Sprite)
    skinSprite: Sprite;

    skinIndex: number = 0;
    listGameSkin: Skin[];
    playerSkinData: string[];

    currentSkin: Skin;

    testDtMN: number;

    start() {
        this.listGameSkin = DataManager.instance.listGameSkin;
        this.playerSkinData = DataManager.instance.playerData.skinID;

        this.spawnCurrentSkin(this.skinIndex);
    }

    protected update(dt: number): void {
        console.log(this.playerSkinData.length);
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
        this.currentSkin = this.findSkin(this.playerSkinData[index]);
        this.skinSprite.spriteFrame = this.currentSkin.sprite;
    }
    findSkin(id: string): Skin {
        for (let i = 0; i < this.listGameSkin.length; i++) {
            if (this.listGameSkin[i].skinID == id) return this.listGameSkin[i];
        }
        return null;
    }
}