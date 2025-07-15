<template>
    <div class="game">
        <div class="game-background"></div>
        <PlayerDock></PlayerDock>
        <div class="game-foreground">
            <component v-if="currentComponent" :is="currentComponent" />
        </div>
    </div>
</template>

<script>
import DrawingGame from '@/components/Games/DrawingGame/DrawingGame.vue';
import MadlibGame from '@/components/Games/MadlibGame/MadlibGame.vue';
import PlayerDock from '@/components/PlayerDock.vue';
import { mapGetters } from 'vuex';

export default {
    components: { PlayerDock, DrawingGame, MadlibGame },
    data() {
        return {
            currentComponent: null
        };
    },
    computed: {
        ...mapGetters(['gameName']),
    },
    mounted(){
        switch (this.gameName) {
            case 'Drawing Game':
                this.currentComponent = 'DrawingGame';
                break;
            case 'Madlib Game':
                this.currentComponent = 'MadlibGame';
                break;
            default:
                this.$router.push(`/game-list`);
                // throw Error(`No game component found for game name: ${this.gameName}`);
        }
    }
}
</script>

<style>
    .game
    {
        position: relative;
    }
    .game-foreground
    {
        z-index: 2;
        position: relative;
        padding: 0.5em 1em 1em 1em;
    }
    .game-background
    {
        z-index: 1;
        position: absolute; 
        top: 0;
        left: 0;
        width: 100%;
        min-height: calc(100vh - 6.5em);
        height: 100%;
        background-color: rgb(3, 3, 3);
    }

    @media only screen and (max-width: 600px) {

        .game-foreground
        {
            padding: 0.5em 1em 1em 1em;
        }
    }
</style>