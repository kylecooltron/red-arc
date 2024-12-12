<template>
    <div>
            ⏰ {{ timeRemaining }}
    </div>
</template>

<script>

export default {
    props: {
      duration: Number,
    },
    data() {
        return {
        timeRemaining: 0,
        timer: null,
        };
    },
    methods: {
        startTimer(duration) {
        this.timeRemaining = duration;
        this.timer = setInterval(() => {
            if (this.timeRemaining > 0) {
                this.timeRemaining--;
                } else {
                clearInterval(this.timer);
                }
            }, 1000);
        },
    },
    mounted() {
        this.startTimer(this.duration);
    },
    beforeUnmount() {
        if (this.timer) {
        clearInterval(this.timer);
        }
    },
}
</script>