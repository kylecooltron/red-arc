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
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            GameList: [
                {
                    name: "Drawing Game",
                    enabled: true,
                },
                {
                    name: "Madlib Game",
                    enabled: true,
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
    computed: {
        ...mapGetters(['connection']),
    },
    methods: {
        ...mapActions(['setGameName', 'disconnectOnFailedGameJoin']),
        gameClicked(gameName){
            this.setGameName(gameName);
            this.$router.push(`/game-details`);
        }
    },
    mounted(){
         if(this.connection != null){
            this.disconnectOnFailedGameJoin();
            return;
        }
    },
}
</script>