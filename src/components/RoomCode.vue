<template>
    <div id="room-code-box" class="nice-box">
        <div class="heading">Room Code</div>
        <input
            class="nice-input"
            :value="roomCode"
            :class="{ copied: isCopied }"
            v-on:click="copyCode()"
            readonly
        />
    </div>
</template>

<script>
export default {
    props: {
        roomCode: String,
    },
    data() {
        return {
            isCopied: false,
        };
    },
    methods: {
        copyCode(){
            navigator.clipboard.writeText(this.roomCode);
            this.isCopied = true;
            setTimeout(() => {
                this.isCopied = false;
            }, 100);
        }
    }
};
</script>

<style>
#room-code-box{
    width: fit-content;
}
#room-code-box input{
    border: 1px rgb(163, 126, 24) solid;
    border-radius: 5px;
    max-width: 160px;
    margin-top: 0.5em;
    background-color: rgb(26, 14, 14);
    color: white;
    text-align: center;
    font-weight:bold;
    transition: border-color 0.5s ease, color 0.5s ease;
    outline: none;
}
#room-code-box input:focus {
    border-color: rgb(163, 126, 24);
}
#room-code-box input.copied {
    border-color: rgb(60, 226, 255);
    color: rgb(159, 241, 255);
    transition: none;
}
</style>
