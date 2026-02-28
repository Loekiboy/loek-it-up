// ===== Sound Effects =====
function playCorrectSound() {
    const audio = new Audio('sounds/correct.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => console.log('Sound play failed'));
}

function playCompleteSound() {
    const audio = new Audio('sounds/confetti.mp3');
    audio.volume = 0.6;
    audio.play().catch(() => console.log('Sound play failed'));
}

// ===== Confetti Animation =====
class Confetti {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 12;
        this.vy = Math.random() * -12 - 5;
        this.gravity = 0.15;
        this.opacity = 1;
        this.size = Math.random() * 6 + 3;
        this.color = ['#FFD93D', '#FF8C42', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#FFD700'][
            Math.floor(Math.random() * 7)
        ];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.3;
        this.shape = Math.random() > 0.5 ? 'square' : 'circle';
        this.lifespan = Math.random() * 60 + 120;
        this.age = 0;
    }

    update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.age++;
        this.opacity = Math.max(0, 1 - (this.age / this.lifespan));
        
        // Slow down horizontal movement over time
        this.vx *= 0.98;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        
        if (this.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }
        
        // Add shimmer effect
        ctx.globalAlpha = this.opacity * 0.4;
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
    }
}

let confettiPieces = [];
let confettiAnimationId = null;

function createConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
    }

    confettiPieces = [];

    canvas.classList.remove('hidden');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    
    // Create confetti pieces
    for (let i = 0; i < 220; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * -canvas.height * 0.2;
        confettiPieces.push(new Confetti(x, y));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces = confettiPieces.filter(p => p.opacity > 0);

        confettiPieces.forEach(p => {
            p.update();
            p.draw(ctx);
        });

        if (confettiPieces.length > 0) {
            confettiAnimationId = requestAnimationFrame(animate);
        } else {
            canvas.classList.add('hidden');
            confettiPieces = [];
            confettiAnimationId = null;
        }
    }

    animate();
}

// Handle window resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas && !canvas.classList.contains('hidden')) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
