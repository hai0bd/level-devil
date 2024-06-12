import { _decorator, CCFloat, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Skin')
export class Skin {
    @property(String)
    skinID: string = "";

    @property(SpriteFrame)
    sprite: SpriteFrame;

    @property(CCFloat)
    price: number;
}