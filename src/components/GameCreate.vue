<template>
    <PlayerInfo :submitName="submitName" :keyUp="createWaitingRoom"></PlayerInfo>
    <div class="error-message">{{this.error ?? ''}}</div>
    <button class="base-button important-button-colors" v-on:click="createWaitingRoom()">Create Room</button>
</template>

<script>
import { mapActions } from 'vuex';
import PlayerInfo from './PlayerInfo.vue';

export default {
    components: { PlayerInfo },
    props: {
        toWaitingRoom: Function,
    },
    data() {
      return {
        playerName: '',
        error: null,
        testPlayerList: [
            {
                name: "Karl",
                isHost: false,
                symbol: '◆',
            }
        ],
      };
    },
    methods: {
        ...mapActions(['setConnectionRequestData']),
        submitName(playerName){
            this.playerName = playerName;
        },
        createWaitingRoom(){
            if (this.playerName.length == 0){
                this.error = "Player name cannot be blank."
                return;
            }
            this.setConnectionRequestData(
                {
                    isHost: true, 
                    name: this.playerName,
                }
            );
            this.$router.push(`/red-arc/waiting-room`);
        }
    }
}
</script>