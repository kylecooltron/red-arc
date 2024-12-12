<template>
  <div class="content">
    <div class="top-section">
        <div class="title">{{ gameName }}</div>
        <RoomCode :roomCode="gameData?.roomCode ?? 'Loading...'"></RoomCode>
        <GameMode></GameMode>
    </div>

    <!-- Non-Teams -->
    <PlayerList
      v-if="!gameData?.teams"
      :playerList="gameData?.playerList"
    ></PlayerList>

    <!-- Teams -->
    <PlayerList
      v-for="(playerIds, team) in (gameData?.teams || {})"
      :key="team"
      :playerList="gameData?.getPlayersFromIdList(playerIds)"
      :title="team"
    ></PlayerList>

    <button v-if="gameData?.player.isHost" class="base-button important-button-colors vertical-small-margin" v-on:click="startGame()">Start Game</button>
    <div class="vertical-small-margin" v-else>Waiting for host to start the game.</div>
  </div>
</template>

<script>
import GameMode from '@/components/GameMode.vue';
import PlayerList from '@/components/PlayerList.vue';
import RoomCode from '@/components/RoomCode.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: { PlayerList, RoomCode, GameMode },
    computed: {
      ...mapGetters(['gameName', 'connectionRequestData', 'connection', 'gameData']),
    },
    methods: {
      ...mapActions(['initConnection', 'initGameData']),
      async init(){
        if(this.connection != null){
          // Already connected
          return;
        }
        if(this.connectionRequestData == null){
          this.$router.push(`/game-list`);
          throw Error("Connection request info missing. Redirected to home page.");
        }
        await this.initConnection();
        this.connection.invoke(...this.connectionRequestData.get())
            .then(this.initGameData);
      },
      startGame(){
        if(this.gameData?.roomCode == null){
          throw Error("Cannot start game with null gameData");
        }
        this.connection.invoke(
          'ReceiveUpdate', 
          this.gameData.roomCode,
          'GameStarted',
          {value: true},
        );
      },
    },
    async mounted() {
        await this.init();
    },
}
</script>

<style>
.vertical-small-margin
{
  margin: 2em 0;
}
</style>