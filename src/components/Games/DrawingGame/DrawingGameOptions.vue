<template>
    <div id="game-options-details-box" class="nice-box">
        <div class="heading">Rounds</div>
        <select v-if="gameData?.player.isHost" v-model="maxRounds" @change="handleChange" class="nice-input">
            <option value=1>1</option>
            <option value=2>2</option>
            <option value=3>3</option>
            <option value=4>4</option>
            <option value=5>5</option>
            <option value=6>6</option>
            <option value=7>7</option>
            <option value=8>8</option>
            <option value=9>9</option>
            <option value=10>10</option>
        </select>
        <select :value="gameData?.maxRounds" v-else class="nice-input" disabled>
            <option value=1>1</option>
            <option value=2>2</option>
            <option value=3>3</option>
            <option value=4>4</option>
            <option value=5>5</option>
            <option value=6>6</option>
            <option value=7>7</option>
            <option value=8>8</option>
            <option value=9>9</option>
            <option value=10>10</option>
        </select>
    </div>
    <div id="game-options-details-box" class="nice-box">
        <div class="heading">Difficulty</div>
        <select v-if="gameData?.player.isHost" v-model="difficulty" @change="handleChangeDifficulty" class="nice-input">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
        </select>
        <select :value="gameData?.difficulty" v-else class="nice-input" disabled>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
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
            maxRounds: 3,
            difficulty: "Easy",
      };
    },
    methods: {
      handleChange() {
            if(this.gameData?.roomCode == null){
            throw Error("Cannot change max rounds with null gameData");
            }
            this.connection.invoke(
                'ReceiveUpdate', 
                this.gameData.roomCode,
                'MaxRounds',
                {value: parseInt(this.maxRounds)},
            );
        },
        handleChangeDifficulty() {
            if(this.gameData?.roomCode == null){
            throw Error("Cannot change difficulty with null gameData");
            }
            this.connection.invoke(
                'ReceiveUpdate', 
                this.gameData.roomCode,
                'Difficulty',
                {value: this.difficulty},
            );
        }
    },
    mounted() {
        if(this.gameData != undefined){
            this.maxRounds = this.gameData.maxRounds;
            this.difficulty = this.gameData.difficulty;
        }
    }
}
</script>


<style>
#game-options-details-box{
    width: fit-content;
}
#game-options-details-box select{
    border: 1px rgb(163, 126, 24) solid;
    border-radius: 5px;
    margin-top: 0.5em;
    background-color: rgb(26, 14, 14);
    color: white;
    text-align: center;
    min-width: 70px;
}
#game-options-details-box select option{
    color: rgb(255, 234, 207);
}
#game-options-details-box select:disabled{
    appearance: none;
    box-decoration-break: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}
</style>
