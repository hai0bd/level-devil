import { _decorator, Component, Node, resources, SpriteAtlas } from 'cc';
import { DataManager } from './Manager/DataManager';
import { GameManager } from './Manager/GameManager';
import { UIManager } from './UI/UIManager';
const { ccclass, property } = _decorator;

@ccclass('resourceLoad')
export class resourceLoad extends Component {
    onLoad() {
        this.setSkinData();
    }
    setSkinData() {
        resources.loadDir("Skins", SpriteAtlas, (err, asssets) => {
            if (err) {
                console.log("Load asssets failed");
                return;
            }
            asssets.forEach((atlats, index) => {
                const listSkin = DataManager.instance.listGameSkin;
                const anim = atlats.getSpriteFrames();
                listSkin[index].idleAnim = [anim[0], anim[1]];
                listSkin[index].jumpAnim = [anim[2], anim[3], anim[4], anim[5]];
                listSkin[index].runAnim = [anim[6], anim[7], anim[8], anim[9]];
                listSkin[index].sprite = anim[0];
            })
            UIManager.instance.openMenu();
        })
    }

    start() {
        // UIManager.instance.openMenu();
    }
}


