<template>
    <div id="game-message">
        <div class="anim-slide-rock">
            🎨<span class="title">Drawing Game</span>
        </div>
        <div>
            <!-- Free For All -->
            <div class="game-message-subtitle anim-fade-in" v-if="gameData?.gameMode == 'Free For All'">Free For All</div>
            <!-- Teams -->
            <div  v-if="gameData?.gameMode == 'Teams'">
                <div class="game-message-subtitle anim-fade-in">Teams</div>
                <span class="anim-fade-in-slow" v-for="(team, index) in Object.keys(gameData?.teams)" :key="team">
                    {{team}}
                    <span class="small-text" v-if="index !=  Object.keys(gameData?.teams).length - 1">VS</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
      ...mapGetters(['gameData']),
    },
    methods: {},
}
</script>

<style>
    #game-message
    {
        margin-top: 2em;
        width: 100%;
        text-align: center;
        font-size: 2em;
    }

    .anim-slide-rock
    {
        animation: slide 0.7s ease-out, rock 2s infinite ease-in-out 0.7s;
    }

    .anim-rock{
        animation: rock 2s infinite ease-in-out;
    }

    @keyframes rock {
        0%, 100% {
            transform: rotate(-5deg);
        }
        50% {
            transform: rotate(5deg);
        }
    }

    @keyframes slide {
        0% {
            transform: translateX(-30%); /* Slide in from left */
        }
        100% {
            transform: translateX(0) rotate(-5deg); /* End at center */
        }
    } 

    .anim-fade-in
    {
        animation: fade 1s ease 0.5s forwards;
        opacity: 0;
    }

    .anim-fade-in-slow
    {
        animation: fade 1s ease 1s forwards;
        opacity: 0;
    }
    
    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    } 

    .small-text
    {
        font-size: medium;
        padding: 1em;
        margin: 0;
    }

    .game-message-subtitle
    {
        margin: 2em;
    }
</style>

