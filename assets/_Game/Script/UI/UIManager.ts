import { _decorator, Component, Game, Node } from 'cc';
import { MainMenu } from './MainMenu';
import { MapUI } from './MapUI';
import { ShopUI } from './ShopUI';
import { GamePlayUI } from './GamePlayUI';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    private static _instance: UIManager;

    public static get instance(): UIManager {
        if (!this._instance) {
            this._instance = new UIManager;
        }
        return this._instance;
    }

    @property(MainMenu)
    mainMenu: MainMenu = null;

    @property(MapUI)
    mapUI: MapUI = null;

    @property(GamePlayUI)
    playUI: GamePlayUI = null;

    @property(ShopUI)
    shopUI: ShopUI = null;

    onLoad() {
        if (!UIManager._instance) {
            UIManager._instance = this;
        } else {
            this.destroy();
        }
    }

    openMenu(){
        this.mainMenu.node.active = true;
    }
}


