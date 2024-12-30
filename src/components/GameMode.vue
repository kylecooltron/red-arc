<template>
    <div id="game-mode-box" class="nice-box">
        <div class="heading">Game Mode</div>
        <select v-if="gameData?.player.isHost" v-model="selectedMode" @change="handleChange" class="nice-input" :disabled="!gameData?.player.isHost">
            <option value="Free For All">Free For All</option>
            <option value="Teams">Teams</option>
        </select>
        <select :value="gameData?.gameMode" v-else class="nice-input" disabled>
            <option value="Free For All">Free For All</option>
            <option value="Teams">Teams</option>
        </select>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
      ...mapGetters(['connection', 'gameData']),
    },
    data() {
        return {
        selectedMode: 'Free For All'
      };
    },
    methods: {
      handleChange() {
            if(this.gameData?.roomCode == null){
            throw Error("Cannot change game mode with null gameData");
            }
            this.connection.invoke(
                'ReceiveUpdate', 
                this.gameData.roomCode,
                'GameMode',
                {value: this.selectedMode},
            );
        }
    },
    mounted() {
        if(this.gameData != undefined){
            this.selectedMode = this.gameData.gameMode;
        }
    }
}
</script>

<style>
#game-mode-box{
    width: fit-content;
}
#game-mode-box select{
    border: 1px rgb(163, 126, 24) solid;
    border-radius: 5px;
    margin-top: 0.5em;
    background-color: rgb(26, 14, 14);
    color: white;
    text-align: center;
    min-width: 160px;
}
#game-mode-box select option{
    color: rgb(255, 234, 207);
}
#game-mode-box select:disabled{
    appearance: none;
    box-decoration-break: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}
</style>

