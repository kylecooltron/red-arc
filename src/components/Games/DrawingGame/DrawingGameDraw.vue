<template>
    <div id="game-message">
        <div>
            <div class="tools">
                <img
                v-for="(tool, index) in gameData?.tools" 
                :key=index 
                :style="tool.style"
                :class="tool.class + (gameData?.selectedToolIndex == index ? ' selected' : '')"
                :src="require(`@/assets/DrawingGame/${tool.type}.png`)"
                v-on:click="toolClicked(index)">
            </div>
            <div class="drawing-grid-container">
                <DrawingGameGrid :grid="gameData?.getPlayerGrid()" :tileClicked="tileClicked" :size="gameData?.tileSize"></DrawingGameGrid>
            </div>
        </div>
        <DrawingGameTimer :duration="gameData.secondsLeft"></DrawingGameTimer>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DrawingGameGrid from './DrawingGameGrid.vue';
import DrawingGameTimer from './DrawingGameTimer.vue';

export default {
    components: {DrawingGameGrid, DrawingGameTimer},
    computed: {
      ...mapGetters(['gameData', 'connection']),
    },
    methods: {
        ...mapActions(['setGameState']),
        toolClicked(toolIndex){
            this.setGameState({type: 'UpdateSelectedTool', data: toolIndex});
        },
        tileClicked(index){
            if(this.gameData == null){
                return;
            }
            this.connection.invoke(
                'ReceiveUpdate', 
                this.gameData.roomCode,
                'TileClicked',
                {team: this.gameData.getTeam(), tileIndex: index, color: this.gameData.getToolColor()}
            );
        },
    }
}
</script>

<style>
.drawing-grid-container
{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.tools{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
}

.tools img{
    /* padding: 0.1em; */
    border-radius: 5px;
    cursor: pointer;
    width: 64px;
    height: auto;
    box-sizing: border-box;
    object-fit: none;
}
.selected{
    box-sizing: border-box;
    /* border: 5px solid white; */
    box-shadow: 0 0 0 5px black, 0 0 0 10px rgb(255, 255, 255);
}
.colorcycle{
    background: linear-gradient(to right, blue, green, red, blue, green);
    background-size: 375% 100%;
    animation: gradient-animation 5s infinite linear;
}

@keyframes gradient-animation {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
}
</style>
