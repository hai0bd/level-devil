import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { Skin } from '../Node/Skin';
import { SkinItemUI } from './SkinItemUI';
const { ccclass, property } = _decorator;

@ccclass('SpawnItemSkin')
export class SpawnItemSkin extends Component {
    @property(Skin)
    defautSkin: Skin = null;

    @property(Skin)
    listSkin: Skin[] = [];

    @property(Prefab)
    itemPrefab: Prefab = null;

    item: Node;
    skinItemsUI: SkinItemUI;

    start() {
        console.log("Da mo shop va spawn item");
        this.spawnItems(this.defautSkin);
        for (let i = 0; i < this.listSkin.length; i++) {
            this.spawnItems(this.listSkin[i]);
        }
    }

    spawnItems(item: Skin) {
        this.item = instantiate(this.itemPrefab);
        this.node.addChild(this.item);
        this.skinItemsUI = this.item.getComponent(SkinItemUI);
        this.skinItemsUI.init(item)

    }
}


