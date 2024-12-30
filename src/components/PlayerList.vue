<template>
    <div v-if="title != null" class="heading" id="team-title">Team {{ title}}</div>
    <ul class="nice-list dropzone"
        @dragover.prevent
        @drop="onDrop"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        :class="{ 'drag-over': isDraggingOver }"
    >
        <li 
        v-for="(player, index) in playerList" 
        :key="index"
        class="draggable"
        draggable="true"
        @dragstart="onDragStart(player)"
        @dragover.prevent
        @dragenter.prevent
        @dragleave.prevent
        >
            <span>{{player.name}}</span>
            <span style="color: rgb(131, 74, 28);margin-left:0.5em;">{{player.isHost ? '(host)' : ''}}</span>
            <span class="leader"></span>
            <div class="player-list-shape">{{player.symbol}}</div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        playerList: {
            type: Array,
            required: true,
            default: () => []
        },
        title: String
    },
    data() {
        return {
            draggedItem: null,
            isDraggingOver: false,
            dragCounter: 0,
        };
    },
    methods: {
        onDragStart(item) {
            this.draggedItem = item;
        },
        onDrop() {
            alert(`Dropped: ${this.draggedItem}`);
            this.draggedItem = null;
            this.isDraggingOver = false;
            this.dragCounter = 0;
        },
        onDragEnter(event) {
            if (event.currentTarget === event.target) {
                this.dragCounter++;
                if (this.dragCounter === 1) {
                    this.isDraggingOver = true;
                }
            }
        },
        onDragLeave(event) {
            if (event.currentTarget === event.target) {
                this.dragCounter--;
                if (this.dragCounter === 0) {
                    this.isDraggingOver = false;
                }
            }
        },
  },
}
</script>

<style>
    .player-list-shape
    {
        border-radius: 3px;
        background-color: white;
        min-width: 32px;
        min-height: 32px;
        text-align: center;
        font-size: 1.4em;
        line-height: 32px;

        border: 1px rgb(163, 126, 24) solid;
        background-color: rgb(26, 14, 14);
    }
    #team-title
    {
        color: rgb(228, 179, 45);
    }
    .draggable {
        cursor: grab;
    }
    .drag-over {
        border: 1px solid white;
    }
</style>

