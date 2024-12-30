<template>
    <div 
        v-if="gameData?.gameOver" 
        :class="gameData.shouldCelebrate(gameData.getTeam()) ? ' winner-title' : 'heading'"
        >
        {{gameData.shouldCelebrate(gameData.getTeam()) ? '🎉' : ''}}Your Team {{ gameData.shouldCelebrate(gameData.getTeam()) ? 'Won!' : 'Lost' }}
    </div>
    <div 
        v-if="!gameData?.gameOver" 
        class="heading">
        Round {{ gameData.shouldCelebrate(gameData.getTeam()) ? 'Victory!' : 'Lost' }}
    </div>
    <DrawingGameScoreGrid></DrawingGameScoreGrid>
</template>

<script>
import { mapGetters } from 'vuex';
import DrawingGameScoreGrid from './DrawingGameScoreGrid.vue';

export default {
    components: {DrawingGameScoreGrid},
    computed: {
    ...mapGetters(['gameData']),
    },
}
</script>