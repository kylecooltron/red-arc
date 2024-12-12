
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
        this.gameOver = false;

        this.updateMethods = this.updateMethods | {
            "ChangeState": this.changeState.bind(this),
        }
    }

    winningTeam() {
        return Object.entries(this.teamScores).reduce(
            (maxTeam, [key, value]) => {
                if (value.score > maxTeam.score) {
                    return { team: key, score: value.score };
                }
                return maxTeam;
            },
            { team: null, score: -Infinity }
        ).team;
    }

    isPlayerTeamWinning() {
        return this.getTeam() == this.winningTeam();
    }

    winningRoundTeam() {
        return Object.entries(this.teamScores).reduce(
            (maxTeam, [key, value]) => {
                if (value.roundScore > maxTeam.roundScore) {
                    return { team: key, roundScore: value.roundScore };
                }
                return maxTeam;
            },
            { team: null, roundScore: -Infinity }
        ).team;
    }

    isPlayerTeamWinningRound() {
        return this.getTeam() == this.winningRoundTeam();
    }

    shouldCelebrate() {
        if (this.gameOver) {
            return this.isPlayerTeamWinning();
        }
        return this.isPlayerTeamWinningRound();
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
        if (this.state == 4) {
            console.log(data);
            Object.entries(data.scoresUpdate).forEach(([key, value]) => {
                this.teamScores[key].score = value.score;
                this.teamScores[key].roundScore = value.roundScore;
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
        }
        return false;
    }
}
