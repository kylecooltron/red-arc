<template>
    <PlayerInfo :submitName="submitName" :keyUp="playerInfoKeyUp"></PlayerInfo>
    <div class="nice-box code-box">
        <div class="heading">Room</div>
        <input
            id="codeInput"
            class="nice-input"
            v-model="roomCode" 
            placeholder="Code" 
            @keyup.enter="joinRoom"
        />
    </div>
    <div class="error-message">{{this.error ?? ''}}</div>
    <button class="base-button important-button-colors" @click="joinRoom">Join Game</button>
</template>


<script>
import { mapActions } from 'vuex';
import PlayerInfo from './PlayerInfo.vue';

export default {
    components: { PlayerInfo },
    data () {
        return {
            roomCode: '',
            playerName: '',
            error: null,
        }
    },
    watch: {
        roomCode(value) {
            const formatted = value
                .replace(/[^a-zA-Z0-9]/g, '')
                .toUpperCase()
                .slice(0, 6);
            if (value !== formatted) {
                this.roomCode = formatted;
            }
        }
    },
    methods: {
        ...mapActions(['setConnectionRequestData']),
        submitName(playerName){
            this.playerName = playerName;
        },
        async joinRoom(){
            if (this.playerName.length == 0){
                this.error = "Player name cannot be blank."
                return;
            }
            if (this.roomCode.length != 6) {
                this.error = "Room code must be six characters."
                return;
            }
            this.setConnectionRequestData(
                {
                    isHost: false, 
                    name: this.playerName,
                    roomCode: this.roomCode,
                }
            );
            this.$router.push(`/waiting-room`);
        },
        playerInfoKeyUp(){
            const codeInput = document.querySelector("#codeInput");
            codeInput?.focus();
        }
    }
}
</script>

<style>
.code-box
{
    width: fit-content;
}
.code-box input
{
    font-weight: bold;
}
</style>