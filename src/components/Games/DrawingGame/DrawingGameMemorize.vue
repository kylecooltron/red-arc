<template>
    <div id="game-message">
        <div>
            <div class="heading anim-slide-rock">Memorize Your Color</div>
            <div class="drawing-grid-container">
                <DrawingGameGrid :grid="gameData?.truthGrid" :size="80"></DrawingGameGrid>
            </div>
        </div>
        <DrawingGameTimer :duration="5"></DrawingGameTimer>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';
import DrawingGameGrid from './DrawingGameGrid.vue';
import DrawingGameTimer from './DrawingGameTimer.vue';

export default {
    components: {DrawingGameGrid, DrawingGameTimer},
    computed: {
      ...mapGetters(['gameData']),
    },
    methods: {},
}
</script>

<style>
.drawing-grid-container
{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>