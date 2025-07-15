<template>
    <div id="game-info-flexbox">
        <img :src="currentImage" alt="Game Screenshot">
        <p>{{currentDescription}}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            currentImage: null,
            currentDescription: "loading...",
        };
    },
    computed: {
        ...mapGetters(['gameName']),
    },
    mounted(){
        switch (this.gameName) {
            case 'Drawing Game':
                this.currentImage = require('@/assets/game-1.png');
                this.currentDescription = `Some stuff about this game. This is a test game. It is not real! Yippee, so much fun to play a game that 
                    isn't even real. Right? Yeah, good ol' gaming. That's what we're about.`
                break;
            case 'Madlib Game':
                this.currentImage = require('@/assets/game-2.png');
                this.currentDescription = `Add words to the pot and then try to remember which ones are assigned to you to retell the story.`
                break;
            default:
                this.$router.push(`/game-list`);
                // throw Error(`No game component found for game name: ${this.gameName}`);
        }
    }
}
</script>

<style>
#game-info-flexbox {
    display: flex;
    flex-direction: row;
}
#game-info-flexbox img {
  border: 10px solid rgb(34, 22, 19);
  border-radius: 10px;
  min-width: 100px;
  min-height: 100px;
}
#game-info-flexbox p {
  margin-left: 3em;
  max-width: 500px;
}

@media only screen and (max-width: 600px) {
    #game-info-flexbox p {
        margin-left: 1.2em;
    }
    #game-info-flexbox img {
        object-fit:contain;
        margin-bottom: auto;
    }
}

</style>