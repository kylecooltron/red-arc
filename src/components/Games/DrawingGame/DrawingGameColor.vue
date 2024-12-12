<template>
    <div id="game-message">
        <div>
            <div class="heading anim-slide-rock">Your Color{{ gameData?.playerColors.length > 1 ? 's' : '' }}</div>
            <div style="margin-top:1em;">👇</div>
            <div class="player-colors-box">
                <DrawingGameTile 
                v-for="color in gameData?.playerColors" 
                :key="color" 
                :color="color"
                :borderLeft="true"
                :borderRight="true"
                :borderBottom="true"
                :size="100"
                ></DrawingGameTile>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DrawingGameTile from './DrawingGameTile.vue';

export default {
    components: { DrawingGameTile},
    computed: {
      ...mapGetters(['gameData']),
    },
    methods: {},
}
</script>

<style>
.player-colors-box
{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
    margin-top: 1em;
}
</style>