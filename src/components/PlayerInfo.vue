<template>
    <div id="customize-player" class="nice-box">
        <div class="heading">Player</div>
        <input
            class="nice-input"
            v-model="playerName"
            placeholder="Name"
            @keyup.enter="keyUp"
        />
    </div>
  </template>
<script>
  
export default {
    props: {
        submitName: Function,
        keyUp: Function,
    },
    data () {
        return {
            playerName: '',
        }
    },
    watch: {
        playerName(value) {
            this.error = null;
            const formatted = value
                .replace(/[^a-zA-Z0-9]/g, '')
                .slice(0, 10);
            if (value !== formatted) {
                this.playerName = formatted;
            }
            this.submitName(this.playerName);
        }
    }
};
</script>

<style>
#customize-player{
    width: fit-content;
}
</style>

