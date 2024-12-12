<template>
    <div id="game-options-bar" class="nice-box" v-if="message == null">
        <button class="base-button normal-button-colors" v-on:click="createGame()">⭐Create New Game</button>
        <button class="base-button normal-button-colors" v-on:click="joinGame()">Join a Game</button>
    </div>
    <div id="game-options-bar" class="nice-box" v-else>
        <button class="base-button normal-button-colors" v-on:click="back()">Back</button>
        <div class="heading">{{ message }}</div>
    </div>
</template>

<script>
export default {
    props: {
      createGameClicked: Function,
      joinGameClicked: Function,
      backClicked: Function,
    },
    data() {
      return {
        message: null
      };
    },
    methods: {
        createGame(){
            this.message = "★ Creating New Game";
            this.createGameClicked();
        },
        joinGame(){
            this.message = "Joining a Game";
            this.joinGameClicked();
        },
        back(){
            this.message = null;
            this.backClicked();
        }
    },
};
</script>

<style>
    #game-options-bar {
        display: flex;
        flex-direction: row;
        margin-right: 1em;
        align-items: center;
        gap: 1.5em;
    }

    @media only screen and (max-width: 600px) {
        #game-options-bar {
            margin-right: 0em;
            gap: 1em;
        }
    }
</style>