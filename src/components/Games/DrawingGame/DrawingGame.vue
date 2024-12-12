<template>
    <DrawingGameTitle v-if="gameData?.state == 0"></DrawingGameTitle>
    <DrawingGameColor v-if="gameData?.state == 1"></DrawingGameColor>
    <DrawingGameMemorize v-if="gameData?.state == 2"></DrawingGameMemorize>
    <DrawingGameDraw v-if="gameData?.state == 3"></DrawingGameDraw>
    <DrawingGameScore v-if="gameData?.state == 4"></DrawingGameScore>

</template>

<script>
import DrawingGameColor from '@/components/Games/DrawingGame/DrawingGameColor.vue';
import DrawingGameTitle from '@/components/Games/DrawingGame/DrawingGameTitle.vue';
import { mapGetters } from 'vuex';
import DrawingGameMemorize from './DrawingGameMemorize.vue';
import DrawingGameDraw from './DrawingGameDraw.vue';
import DrawingGameScore from './DrawingGameScore.vue';

export default {
    components: { DrawingGameTitle, DrawingGameColor, DrawingGameMemorize, DrawingGameDraw, DrawingGameScore },
    computed: {
      ...mapGetters(['gameData']),
    },
}
</script>