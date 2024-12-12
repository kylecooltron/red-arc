<template>
    <div class="grid" :style="gridStyle">
            <DrawingGameTile
            v-for="(tile, index) in grid?.getList()" 
            :key="index"
            :color="tile.color"
            :borderLeft="tile.borderLeft()"
            :borderRight="tile.borderRight()"
            :borderBottom="tile.borderBottom()"
            :size="this.size ?? 90"

            v-on:click="triggerTileClicked(index)"
            v-on:dragover="triggerTileClicked(index)"
            v-on:mouseenter="tileTryClick(index, $event)"
            v-on:mouseleave="tileTryClick(index, $event)"
            draggable="false"

            ></DrawingGameTile>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DrawingGameTile from './DrawingGameTile.vue';

export default {
    props: {
      grid: Object,
      size: Number,
      tileClicked: Function
    },
    components: { DrawingGameTile},
    computed: {
      ...mapGetters(['gameData']),
    },
    methods: {
      ...mapActions(['setGameState']),
      triggerTileClicked(index){
          if(this.tileClicked != null){
            this.tileClicked(index);
          }
        },
      tileTryClick(index, event){
        if (event.buttons === 1) {
          this.triggerTileClicked(index);
        }
      },
    },
    data() {
      return{
        gridStyle: {
            gridTemplateColumns: '1fr',
        },
      }
    },
    mounted(){
      this.gridStyle.gridTemplateColumns = `repeat(${this.grid?.width}, 1fr)`
    }
}
</script>


<style>
.grid{
  display: grid;
  width: fit-content;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style>