<template>
        <div class="game-middle">

            <div 
                v-if="gameData?.gameOver && gameData.gameMode != 'Teams'" 
                class="heading">
                Game Over
            </div>
            <div 
                v-if="gameData?.gameOver && gameData.gameMode == 'Teams'" 
                :class="gameData.isPlayerTeamWinning() ? ' winner-title' : 'heading'"
                >
                {{gameData.isPlayerTeamWinning() ? '🎉' : ''}}Your Team {{ gameData.isPlayerTeamWinning() ? 'Won!' : 'Lost' }}
            </div>

            <div 
            v-if="!gameData?.gameOver && gameData.gameMode != 'Teams'" 
            class="heading">
                Round {{gameData?.round}} Results
            </div>
            <div 
                v-if="!gameData?.gameOver && gameData.gameMode == 'Teams'" 
                class="heading">
                Round {{ gameData.isPlayerTeamWinningRound() ? 'Victory!' : 'Lost' }}
            </div>

            <div class="score-grid-container">
                <div 
                    v-for="(teamScoreData, teamName) in gameData?.teamScores" 
                    :key="teamName" 
                    class="team-section"
                    :style="teamName == gameData.getTeam() ? 'border: 1px solid ' + (gameData.shouldCelebrate() ? 'lime;' : 'red;') : ''"
                >
                    <div v-if="gameData.gameMode=='Teams'" class="heading">
                        {{teamName == gameData.winningRoundTeam() && !gameData.gameOver ? '🎉' : ''}}Team {{ teamName }}
                    </div>
                    <div class="drawing-grid-container">
                        <div>
                            <div class="grid-subtitles">Original</div>
                            <DrawingGameGrid :grid="gameData?.truthGrid" :size="24"></DrawingGameGrid>
                        </div>
                        <div>
                            <div class="grid-subtitles">Submitted</div>
                            <DrawingGameGrid :grid="teamScoreData.attemptGrid" :size="24"></DrawingGameGrid>
                        </div>
                    </div>
                    <div>
                        <div class="grid-subtitles">Round Accuracy {{ teamScoreData.roundScore }}%</div>
                        <div class="heading" style="margin-top: 0.3em;">Score {{ teamScoreData.score }}</div>
                    </div>
                </div>
            </div>

            <div class="host-options-button-box" v-if="gameData?.gameOver && gameData?.player.isHost">
                <button  class="base-button important-button-colors" v-on:click="playAgain()">Play Again</button>
                <button  class="base-button" v-on:click="backToWaitingRoom()">Change Game Settings</button>
            </div>

            <DrawingGameTimer v-if="!gameData?.gameOver" :duration="7"></DrawingGameTimer>
        </div>

        <ConfettiEffect v-if="gameData?.gameOver && gameData.isPlayerTeamWinning()"></ConfettiEffect>
</template>

<script>
import { mapGetters } from 'vuex';
import DrawingGameGrid from './DrawingGameGrid.vue';
import DrawingGameTimer from './DrawingGameTimer.vue';
import ConfettiEffect from '../ConfettiEffect.vue';

export default {
    components: {DrawingGameGrid, DrawingGameTimer, ConfettiEffect},
    computed: {
      ...mapGetters(['gameData', 'connection']),
    },
    methods: {
        playAgain(){
            if(this.gameData == null){
                return;
            }
            this.connection.invoke(
                'ReceiveUpdate', 
                this.gameData.roomCode,
                'GameStarted',
                {value: true},
            );
        },
        backToWaitingRoom(){
            this.connection.invoke(
                'ReceiveUpdate', 
                this.gameData.roomCode,
                'BackToWaitingRoom',
                {},
            );
        }
    },
}
</script>

<style>
.drawing-grid-container
{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
}

.no-top-margin{
    margin-top: 0.5em;
}

.game-middle
{
    margin-top: 0.5em;
    width: 100%;
    text-align: center;
    font-size: 1.2em;
}

.team-section
{
    

    width: fit-content;
    justify-self: center;
    margin: 0.5em 0.5em 1em 0.5em;

    background-color: rgb(34, 22, 19);
    padding: 0.5em 1em 0.8em 1em;
    border-radius: 10px;
}

.host-options-button-box{
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: fit-content;
    margin: auto;
}

.score-grid-container{
    display: grid;
    grid-template-columns: auto auto;
    justify-items: space-around;
    /* gap: 1em; */
    width: fit-content;
    margin: auto;
}

.grid-subtitles{
    font-size: 0.8em;
    margin-top: 0.5em;
}

.winner-title{
    background: linear-gradient(to right, rgb(0, 0, 140), rgb(0, 76, 0), rgb(127, 0, 0), rgb(0, 0, 140), rgb(0, 76, 0));
    background-size: 375% 100%;
    animation: gradient-animation 2s infinite linear;
    width: fit-content;
    margin: auto;
    color: white;
    font-size: 1.5em;
    border-radius: 5px;
    padding: 0.2em;
    font-weight: bolder;
}
@keyframes gradient-animation {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
}

@media only screen and (max-width: 600px) {

    .score-grid-container{
        display: block;
    }
}
</style>