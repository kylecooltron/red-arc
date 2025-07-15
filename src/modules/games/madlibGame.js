
import Game from '../game';

export default class MadlibGame extends Game {
    constructor(data) {
        super(data);
        this.state = 0; // 0: Title, 1: Step, 2: Step
        this.gameOver = false;

        this.updateMethods = this.updateMethods | {
            "ChangeState": this.changeState.bind(this),
        }
    }

    changeState(data) {
        this.state = data.state;
        if (this.state == 1) {
            // this.round = data.round;
        }
        if (this.state == 2 || this.state == 3) {
            this.secondsLeft = data.seconds;
        }
    }

    update(type, data) {
        const processed = super.update(type, data);
        if (processed) {
            return true;
        }
        switch (type) {
            case "ChangeState":
                this.changeState(data);
                return true;
        }
        return false;
    }
}