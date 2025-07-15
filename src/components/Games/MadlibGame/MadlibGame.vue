<template>
    <div class="madlib-container">
        <div v-if="gameData?.state == 0">State 0</div>
        <div v-if="gameData?.state == 1">State 1</div>
        <div v-if="gameData?.state == 2">State 2</div>
        <div v-if="gameData?.state == 3">State 3</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    components: { },
    computed: {
      ...mapGetters(['gameData']),
    },
}
</script>

<style>
    .madlib-container{
        margin-top: 0.5em;
        width: 100%;
        text-align: center;
        font-size: 1.2em;
    }
</style>