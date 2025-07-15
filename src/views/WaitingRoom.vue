<template>
  <div class="content">
    <div class="top-section">
        <div class="title">{{ gameName }}</div>
    </div>
    <div class="game-options-grid">
        <RoomCode :roomCode="gameData?.roomCode ?? 'Loading...'"></RoomCode>
        <GameMode></GameMode>
        <DrawingGameOptions v-if="gameName == 'Drawing Game'"></DrawingGameOptions>
    </div>

    <div v-if="gameData?.gameMode == 'Teams'">
      <!-- Teams -->
      <PlayerList
        v-for="(playerIds, team) in gameData?.teams"
        :key="team"
        :playerList="gameData?.getPlayersFromIdList(playerIds)"
        :title="team"
      ></PlayerList>
    </div>

    <div v-else>
      <!-- Non-Teams -->
      <PlayerList
        :playerList="gameData?.playerList"
      ></PlayerList>
    </div>
    
    <button v-if="gameData?.player.isHost" class="base-button important-button-colors vertical-small-margin" v-on:click="startGame()">Start Game</button>
    <div class="vertical-small-margin" v-else>Waiting for host to start the game.</div>
  </div>
</template>

<script>
import GameMode from '@/components/GameMode.vue';
import DrawingGameOptions from '@/components/Games/DrawingGame/DrawingGameOptions.vue';
import PlayerList from '@/components/PlayerList.vue';
import RoomCode from '@/components/RoomCode.vue';
import { mapActions, mapGetters } from 'vuex';
import router from '@/router';

export default {
    components: { PlayerList, RoomCode, GameMode, DrawingGameOptions },
    computed: {
      ...mapGetters(['gameName', 'connectionRequestData', 'connection', 'gameData']),
    },
    methods: {
      ...mapActions(['initConnection', 'initGameData', 'disconnectOnFailedGameJoin']),
      disconnectAndBackToList(){
        router.push(`/game-list`);
        this.disconnectOnFailedGameJoin();
      },
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
            .then(this.initGameData)
            .catch(this.disconnectAndBackToList);
      },
      startGame(){
        if(this.gameData?.roomCode == null){
          throw Error("Cannot start game with null gameData");
        }
        try{
            this.connection.invoke(
            'ReceiveUpdate', 
            this.gameData.roomCode,
            'GameStarted',
            {value: true},
          );
        }catch(err){
          console.log(err);
        }
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
.game-options-grid{
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 0 1em;
  width: fit-content;
}
.game-options-grid .nice-box {
  margin-top: 0;
}


@media only screen and (max-width: 800px) {
  .game-options-grid{
    grid-template-columns: auto auto auto;
  }
}

@media only screen and (max-width: 600px) {
  .game-options-grid{
    grid-template-columns: auto;
  }
}



</style>