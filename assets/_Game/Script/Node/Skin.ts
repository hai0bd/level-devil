import { _decorator, CCFloat, CCString, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Skin')
export class Skin {
    @property(CCString)
    skinID: string = "";

    @property(SpriteFrame)
    sprite: SpriteFrame;

    @property(SpriteFrame)
    runAnim: SpriteFrame[] = [];

    @property(SpriteFrame)
    idleAnim: SpriteFrame[] = [];

    @property(SpriteFrame)
    jumpAnim: SpriteFrame[] = [];

    @property(CCFloat)
    price: number = 0.99;
}