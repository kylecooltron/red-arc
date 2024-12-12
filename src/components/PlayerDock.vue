<template>
    <div class="dock">
        <div class="player-card">
            <div class="player-list-shape">{{gameData?.player?.symbol}}</div>
            <div class="heading">{{gameData?.player?.name}}</div>
            <div style="color: rgb(131, 74, 28);">{{gameData?.player?.isHost ? '(host)' : ''}}</div>
        </div>
        <div class="player-card" style="color: rgb(131, 74, 28); margin-top: 0.5em;">
            Team {{gameData.getTeam()}}
        </div>
    </div>
  </template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
      ...mapGetters(['gameData']),
    },
};
</script>


<style>
    .dock
    {
        z-index: 3;
        position: absolute; 
        top: 0.5em;
        left: 0.5em;
    }
    .player-card
    {
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        line-height: 18px;
        background-color: rgba(24, 16, 14, 0.5);
        padding: 0.3em 0.5em;
        border-radius: 10px;
        font-size: 0.9em;
    }
    .player-list-shape
    {
        border-radius: 3px;
        background-color: white;
        min-width: 18px;
        min-height: 18px;
        text-align: center;
        font-size: 1.3em;
        line-height: 18px;
        border: 1px rgb(163, 126, 24) solid;
        background-color: rgb(26, 14, 14);
    }


    @media only screen and (max-width: 600px) {

            .player-card
        {
            font-size: 0.6em;
        }
    }

</style>
