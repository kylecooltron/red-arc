<template>
    <canvas id="confettiCanvas"></canvas>
</template>
  
<script>
  export default {
    mounted() {
      const canvas = document.querySelector('#confettiCanvas');
      const ctx = canvas.getContext('2d');
  
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      let confettiPieces = Array.from({ length: 100 }, () => ({
        x: canvas.width * 0.5 + (Math.random() * 80) - 40,
        y: canvas.height + Math.random() * 200,
        r: Math.random() * 6 + 1,
        dx: Math.random() * 6 - 3,
        dy: -(Math.random() * 12 + 8),
        ang: (Math.random() * 360 * Math.PI) / 180,
        spin: (Math.random() - 0.5)*0.09,
        maxyvel: 3 + Math.random() * 2,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      }));
  
      function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach(p => {
        //   ctx.beginPath();
        //   ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        //   ctx.fillStyle = p.color;
        //   ctx.fill();

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.ang);
            ctx.fillStyle = p.color;

            let xWidth = p.r;
            let yWidth = p.r;
            if(p.dy > 0){
                xWidth = p.r*1.8*Math.cos(p.x*0.01);
                yWidth = p.r*Math.cos(p.y*0.02);
            }

            ctx.fillRect(-yWidth, -xWidth, yWidth * 2, xWidth * 2);
            ctx.restore();


        });
      }
  
      function updateConfetti() {
        confettiPieces = confettiPieces.filter(p => {
            p.x += p.dx;
            p.y += p.dy;
            p.dy += 0.1;
            if(p.dy > p.maxyvel){
                p.dy = p.maxyvel;
            }
            p.ang += p.spin;
            if (p.y > canvas.height && p.dy > 0) {
            return false;
            }
            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;
            return true; // Keep this piece
        });
        }
  
      function animateConfetti() {
        if (confettiPieces.length === 0) {
            return;
        }
        drawConfetti();
        updateConfetti();
        requestAnimationFrame(animateConfetti);
      }
  
      animateConfetti();
  
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    },
  };
</script>
  
<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
  