import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager extends Component {
    deathTimes: number;

    start() {
        let times = sys.localStorage.getItem("DeathTimes");
        if (times) {
            this.deathTimes = parseInt(times);
        }
        else sys.localStorage.setItem("DeathTimes", "10");
    }
}


