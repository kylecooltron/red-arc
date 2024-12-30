
import Game from '../game';
import DrawingGameColorGrid from './drawingGameGrid';

export default class DrawingGame extends Game {
    constructor(data) {
        super(data);
        this.state = 0; // 0: Title, 1: Your Color, 2: Memorize, 3: Draw, 4: Show Score
        this.assignedColors = [];
        this.playerColors = [];
        this.tools = [];
        this.updateTools();
        this.selectedToolIndex = 0;

        this.truthGrid = null;
        this.teamScores = null;
        this.round = 0;
        this.maxRounds = data.initData.maxRounds;
        this.difficulty = data.initData.difficulty;
        this.gameOver = false;
        this.secondsLeft = 0;
        this.tileSize = 80;

        this.updateMethods = this.updateMethods | {
            "ChangeState": this.changeState.bind(this),
        }
    }

    shouldCelebrate(teamId) {
        if (this.teamScores[teamId] == undefined) {
            return false;
        }
        return ['RoundWon', 'GameWon', 'PerfectGame', 'PerfectRound'].includes(this.teamScores[teamId].winState);
    }

    wonGame(teamId) {
        if (this.teamScores[teamId] == undefined) {
            return false;
        }
        return ['GameWon', 'PerfectGame'].includes(this.teamScores[teamId].winState);
    }

    getEraser() {
        return {
            type: "eraser",
            class: "colorcycle",
            style: {},
            color: "white",
        };
    }

    getToolColor() {
        return this.tools[this.selectedToolIndex].color;
    }

    updateTools() {
        this.tools = [this.getEraser()];
        this.playerColors.forEach(color => {
            this.tools.push(
                {
                    type: "draw",
                    class: "",
                    style: {
                        backgroundColor: color
                    },
                    color: color,
                }
            )
        });
        this.selectedToolIndex = 1;
    }

    changeState(data) {
        this.state = data.state;
        if (this.state == 1) {
            this.assignedColors = data.assignedColors;
            this.playerColors = this.assignedColors[this.player.id];
            this.truthGrid = new DrawingGameColorGrid(data.truthGrid.grid);
            this.teamScores = this.deserializeTeamScores(data.teamScores);
            this.round = data.round;
            this.updateTools();
        }
        if (this.state == 2 || this.state == 3) {
            this.secondsLeft = data.seconds;
        }
        if (this.state == 4) {
            Object.entries(data.scoresUpdate).forEach(([key, value]) => {
                this.teamScores[key].score = value.score;
                this.teamScores[key].roundScore = value.roundScore;
                this.teamScores[key].colorAccuracies = value.colorAccuracies;
                this.teamScores[key].winState = value.winState;
            });
            this.gameOver = data.gameOver;
        }
    }

    deserializeTeamScores(data) {
        return Object.fromEntries(
            Object.entries(data).map(
                ([key, value]) => [
                    key, {
                        score: value.score,
                        roundScore: value.roundScore,
                        attemptGrid: new DrawingGameColorGrid(value.attemptGrid.grid),
                        colorAccuracies: value.colorAccuracies,
                        winState: value.winState,
                    }
                ]
            )
        );
    }

    getPlayerGrid() {
        return this.teamScores[this.getTeam()].attemptGrid;
    }

    playerMove(data) {
        if (data.type == "TileClicked") {
            this.teamScores[data.team].attemptGrid.getList()[data.tileIndex].color = data.color;
        }
    }

    updateTileSize() {
        switch (this.difficulty) {
            case "Easy":
                this.tileSize = 80;
                break;
            case "Medium":
                this.tileSize = 70;
                break;
            case "Hard":
                this.tileSize = 60;
                break;
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
            case "UpdateSelectedTool":
                this.selectedToolIndex = data;
                return true;
            case "PlayerMove":
                this.playerMove(data);
                return true;
            case "MaxRounds":
                this.maxRounds = data;
                return true;
            case "Difficulty":
                this.difficulty = data;
                this.updateTileSize();
                return true;
        }
        return false;
    }
}
