<template>
    <div class="content">
    <div class="title">Choose a Game</div>
    <ul class="nice-list">
        <li v-for="game in GameList" :key="game.name">
            <span>{{game.name}}</span>
            <span class="leader"></span>
            <button class="base-button normal-button-colors" @click="gameClicked(game.name)" :disabled="!game.enabled" >Play</button>
        </li>
    </ul>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            GameList: [
                {
                    name: "Drawing Game",
                    enabled: true,
                },
                {
                    name: "Test Game 1",
                    enabled: false,
                },
                {
                    name: "Test Game 2",
                    enabled: false,
                },
                {
                    name: "Test Game 3",
                    enabled: false,
                },
                {
                    name: "Test Game 4",
                    enabled: false,
                }
            ],
        };
    },
    methods: {
        ...mapActions(['setGameName']),
        gameClicked(gameName){
            this.setGameName(gameName);
            this.$router.push(`/red-arc/game-details`);
        }
    }
}
</script>