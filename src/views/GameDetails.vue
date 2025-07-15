<template>
    <div class="content">
    <div class="top-section">
        <GameListLink></GameListLink>
        <div class="title">{{ gameName ?? 'Loading...' }}</div>
        <GameInfo></GameInfo>
    </div>
    <GameOptionBar :createGameClicked="createGameClicked" :joinGameClicked="joinGameClicked" :backClicked="backClicked"></GameOptionBar>
    <GameCreate v-if="optionsState == 'creating'"></GameCreate>
    <GameJoin v-if="optionsState == 'joining'"></GameJoin>
</div>
</template>

<script>
import GameCreate from '@/components/GameCreate.vue';
import GameInfo from '@/components/GameInfo.vue';
import GameJoin from '@/components/GameJoin.vue';
import GameListLink from '@/components/GameListLink.vue';
import GameOptionBar from '@/components/GameOptionBar.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: { GameListLink, GameInfo, GameOptionBar, GameCreate, GameJoin },
    data() {
      return {
        optionsState: null
      };
    },
    computed: {
      ...mapGetters(['gameName', 'connection']),
    },
    methods: {
        ...mapActions(['disconnectOnFailedGameJoin']),
        createGameClicked(){
            this.optionsState = "creating";
        },
        joinGameClicked(){
            this.optionsState = "joining";
        },
        backClicked(){
            this.optionsState = null;
        },
    },
    mounted(){
        if(this.gameName == null || this.connection != null){
            this.$router.push('/game-list');
            this.disconnectOnFailedGameJoin();
            return;
        }
    },
}
</script>

