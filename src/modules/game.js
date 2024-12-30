import Player from "./player";
import router from '@/router';

export default class Game {

    constructor(data) {
        this.roomCode = data.gameData.roomCode;
        this.gameStarted = data.gameData.gameStarted;
        this.gameMode = data.gameData.gameMode;

        this.player = new Player(data.player);

        this.playerList = [];
        this.players = null;
        this.updatePlayerList(data.gameData.players);
        this.teams = null;
        this.updateTeams(data.gameData.teams);
    }

    getTeamForPlayer(playerId) {
        for (const [team, players] of Object.entries(this.teams)) {
            if (players.includes(playerId)) {
                return parseInt(team);
            }
        }
        return null;
    }

    getTeam() {
        let teamId = this.gameMode == "Teams" ? this.getTeamForPlayer(this.player.id) : 0;
        if (teamId == null) {
            throw new Error("Team Id should not be null.");
        }
        return teamId;
    }

    addPlayer(player) {
        this.players[player.id] = player;
    }

    getPlayerList() {
        return Object.values(this.players).sort(player => (player.isHost ? '.' : '') + player.connectionId);
    }

    getPlayersFromIdList(idList) {
        return idList.map(playerId => this.players[playerId]);
    }

    updatePlayerList(data) {
        this.players = Object.fromEntries(
            Object.entries(data).map(
                ([key, value]) => [key, new Player(value)]
            )
        );
        this.playerList = this.getPlayerList();
        if (this.gameMode != 'Teams') {
            this.teams = {
                0: this.playerList.map(player => player.id)
            };
        }
    }

    updateTeams(data) {
        if (Object.keys(data).length > 0) {
            this.teams = data;
            return;
        }
        this.teams = {
            0: this.playerList.map(player => player.id)
        };
    }

    updateGameStarted(started) {
        console.log('started: ' + started);
        if (started && this.gameStarted != started) {
            this.gameStarted = started;
            router.push(`/game-play`);
            return;
        }

        this.gameStarted = started;
    }

    updateGameMode(data) {
        this.gameMode = data.gameMode;
        this.updateTeams(data.teams);
    }

    update(type, data) {
        switch (type) {
            case "PlayerList":
                this.updatePlayerList(data);
                return true;
            case "GameStarted":
                this.updateGameStarted(data);
                return true;
            case "GameMode":
                this.updateGameMode(data);
                return true;
            case "BackToWaitingRoom":
                router.push(`/waiting-room`);
                return true;
        }
        return false;
    }
}