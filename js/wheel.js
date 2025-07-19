// Spinning Wheel System
class SpinningWheel {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.radius = 200;
        this.segments = 22;
        this.segmentAngle = (2 * Math.PI) / this.segments;
        this.currentRotation = 0;
        this.isSpinning = false;
        
        // Colors for segments (alternating pattern)
        this.segmentColors = [
            '#DBEAFE', // Light blue
            '#FEF3C7', // Light yellow
            '#D1FAE5', // Light green
            '#FECACA', // Light red
            '#E0E7FF', // Light indigo
            '#FCE7F3'  // Light pink
        ];
        
        this.init();
    }

    init() {
        this.drawWheel();
    }

    // Draw the wheel with 23 segments
    drawWheel() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw segments
        for (let i = 0; i < this.segments; i++) {
            const startAngle = i * this.segmentAngle;
            const endAngle = (i + 1) * this.segmentAngle;
            
            // Select color
            const colorIndex = i % this.segmentColors.length;
            const segmentColor = this.segmentColors[colorIndex];
            
            // Draw segment
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, this.radius, startAngle, endAngle);
            this.ctx.closePath();
            
            // Fill segment
            this.ctx.fillStyle = segmentColor;
            this.ctx.fill();
            
            // Draw border
            this.ctx.strokeStyle = '#FFFFFF';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Draw segment number
            this.drawSegmentNumber(centerX, centerY, i + 1, startAngle + this.segmentAngle / 2);
        }
        
        // Draw outer border
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
        this.ctx.strokeStyle = '#FFD700';
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
    }

    // Draw segment numbers
    drawSegmentNumber(centerX, centerY, number, angle) {
        const textRadius = this.radius * 0.75;
        const x = centerX + Math.cos(angle) * textRadius;
        const y = centerY + Math.sin(angle) * textRadius;
        
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle + Math.PI / 2);
        
        this.ctx.fillStyle = '#1F2937';
        this.ctx.font = 'bold 16px Poppins';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(number.toString(), 0, 0);
        
        this.ctx.restore();
    }

    // Spin the wheel
    spin(duration = 4000) {
        if (this.isSpinning) return false;
        
        this.isSpinning = true;
        
        // Calculate random rotation (multiple full rotations + random angle)
        const minRotations = 5;
        const maxRotations = 8;
        const rotations = minRotations + Math.random() * (maxRotations - minRotations);
        const finalAngle = rotations * 2 * Math.PI;
        
        const startTime = Date.now();
        const startRotation = this.currentRotation;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            this.currentRotation = startRotation + finalAngle * easeOut;
            
            // Apply rotation to wheel
            this.canvas.style.transform = `rotate(${this.currentRotation}rad)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isSpinning = false;
                this.onSpinComplete();
            }
        };
        
        requestAnimationFrame(animate);
        return true;
    }

    // Get the winning segment based on current rotation
    getWinningSegment() {
        // The arrow points to the top, so we need to calculate which segment is at the top
        // Normalize rotation to 0-2π range
        const normalizedRotation = ((this.currentRotation % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
        
        // Calculate which segment is at the top (arrow position)
        // We subtract from 2π because the wheel rotates clockwise but segments are numbered counter-clockwise
        const segmentIndex = Math.floor(((2 * Math.PI - normalizedRotation) % (2 * Math.PI)) / this.segmentAngle);
        
        return (segmentIndex % this.segments) + 1;
    }

    // Callback for when spin completes
    onSpinComplete() {
        const winningSegment = this.getWinningSegment();
        
        // Dispatch custom event
        const event = new CustomEvent('wheelSpinComplete', {
            detail: { segment: winningSegment }
        });
        document.dispatchEvent(event);
    }

    // Reset wheel rotation
    reset() {
        this.currentRotation = 0;
        this.canvas.style.transform = 'rotate(0rad)';
        this.isSpinning = false;
    }

    // Check if wheel is currently spinning
    getIsSpinning() {
        return this.isSpinning;
    }
}

// Export for use in other files
window.SpinningWheel = SpinningWheel;

