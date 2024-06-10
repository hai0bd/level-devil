import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Skin')
export class Skin extends Component {
    @property(String)
    skinID: string = "";

    start() {

    }

    update(deltaTime: number) {

    }
}


