<template>
    <div class="score-grid-container">
        <div 
            v-for="(teamScoreData, teamName) in gameData?.teamScores" 
            :key="teamName" 
            class="team-section"
            :style="teamName == gameData.getTeam() ? 'border: 1px solid ' + (gameData.shouldCelebrate(teamName) ? 'lime;' : 'red;') : ''"
        >
            <div v-if="gameData.gameMode=='Teams'" class="heading">
                <!-- {{teamName == gameData.winningRoundTeam() && !gameData.gameOver ? '🎉' : ''}} -->
                Team {{ teamName }}
            </div>

            <div style="margin-top: 0.3em;">Score {{ teamScoreData.score }}</div>

            <div class="round-details">
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
                    <div class="grid-subtitles" style="margin-bottom: 1em;">Accuracy {{ teamScoreData?.roundScore }}%</div>
                    <div v-for="player in gameData?.teams[teamName]" :key="player" class="player-color-accuracy">
                        <div>{{ gameData?.players[player]?.name }}</div>
                        <div v-for="color in gameData?.assignedColors[player]" :key="color" class="color-accuracy-row">
                            <DrawingGameTile 
                            :color="color"
                            :borderLeft="true"
                            :borderRight="true"
                            :borderBottom="true"
                            :size="14"
                            ></DrawingGameTile>
                            {{ teamScoreData?.colorAccuracies[color] }}%
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DrawingGameGrid from './DrawingGameGrid.vue';
import DrawingGameTile from './DrawingGameTile.vue';

export default {
    components: {DrawingGameGrid, DrawingGameTile},
    computed: {
    ...mapGetters(['gameData']),
    },
}
</script>

<style>
.color-accuracy-row{
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    justify-self: center;
    font-size: 0.8em;
    line-height: 14px;
}
.player-color-accuracy{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.round-details{
    background-color: rgb(51, 29, 23);
    border-radius: 5px;
    padding: 0.2em 0.7em 0.4em 0.7em;
    margin-top: 0.8em;
}
</style>