<template>
    <div 
        class="heading">
        {{gameData?.gameOver ? 'Game Over' : 'Round ' + gameData?.round + ' Results'}}
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