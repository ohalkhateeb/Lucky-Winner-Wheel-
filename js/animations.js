// Animation and Visual Effects System
class AnimationManager {
    constructor() {
        this.confettiContainer = document.getElementById('confetti-container');
        this.confettiColors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    }

    // Create confetti animation
    createConfetti(count = 50) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createSingleConfetti();
            }, i * 50);
        }
    }

    // Create a single confetti piece
    createSingleConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const color = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
        const size = Math.random() * 8 + 4;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 2 + 2;
        const delay = Math.random() * 2;
        
        // Apply styles
        confetti.style.backgroundColor = color;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.left = left + '%';
        confetti.style.animationDuration = animationDuration + 's';
        confetti.style.animationDelay = delay + 's';
        
        // Add to container
        this.confettiContainer.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, (animationDuration + delay) * 1000);
    }

    // Clear all confetti
    clearConfetti() {
        this.confettiContainer.innerHTML = '';
    }

    // Animate winner announcement
    animateWinnerAnnouncement(element) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = 'winner-reveal 0.8s ease-out';
    }

    // Pulse animation for elements
    pulseElement(element, duration = 1000) {
        element.style.animation = `pulse ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }

    // Shake animation for errors
    shakeElement(element, duration = 500) {
        element.style.animation = `shake ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }

    // Glow effect for buttons
    glowButton(button, color = '#10B981', duration = 2000) {
        const originalBoxShadow = button.style.boxShadow;
        button.style.boxShadow = `0 0 20px ${color}`;
        
        setTimeout(() => {
            button.style.boxShadow = originalBoxShadow;
        }, duration);
    }

    // Typewriter effect for text
    typewriterEffect(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, speed);
    }

    // Fade in animation
    fadeIn(element, duration = 500) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    }

    // Fade out animation
    fadeOut(element, duration = 500) {
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        element.style.opacity = '0';
        
        return new Promise(resolve => {
            setTimeout(resolve, duration);
        });
    }

    // Scale animation
    scaleElement(element, scale = 1.1, duration = 300) {
        const originalTransform = element.style.transform;
        element.style.transition = `transform ${duration}ms ease-in-out`;
        element.style.transform = `scale(${scale})`;
        
        setTimeout(() => {
            element.style.transform = originalTransform;
        }, duration);
    }

    // Bounce animation
    bounceElement(element, height = 10, duration = 600) {
        const originalTransform = element.style.transform;
        element.style.transition = `transform ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        element.style.transform = `translateY(-${height}px)`;
        
        setTimeout(() => {
            element.style.transform = originalTransform;
        }, duration);
    }

    // Rotate animation
    rotateElement(element, degrees = 360, duration = 1000) {
        const originalTransform = element.style.transform;
        element.style.transition = `transform ${duration}ms ease-in-out`;
        element.style.transform = `rotate(${degrees}deg)`;
        
        setTimeout(() => {
            element.style.transform = originalTransform;
            element.style.transition = '';
        }, duration);
    }
}

// Add CSS for additional animations
const additionalCSS = `
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes glow {
    0%, 100% { box-shadow: 0 0 5px currentColor; }
    50% { box-shadow: 0 0 20px currentColor; }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Export for use in other files
window.AnimationManager = AnimationManager;

