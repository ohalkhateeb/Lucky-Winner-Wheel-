// Prize Distribution System
class PrizeManager {
    constructor() {
        this.prizes = [
            { amount: 1000, count: 1, remaining: 1, type: 'gold', icon: 'fas fa-crown' },
            { amount: 500, count: 10, remaining: 10, type: 'silver', icon: 'fas fa-star' },
            { amount: 300, count: 12, remaining: 12, type: 'bronze', icon: 'fas fa-medal' }
        ];
        
        this.winners = [];
        this.usedEmployees = new Set();
        this.segmentPrizes = this.generateSegmentPrizes();
        this.availableSegments = new Set(Array.from({length: 23}, (_, i) => i));
    }

    // Generate prize assignments for each segment
    generateSegmentPrizes() {
        const segments = [];
        
        // Add 1x 1000 AED prize
        segments.push({ amount: 1000, type: 'gold', icon: 'fas fa-crown' });
        
        // Add 10x 500 AED prizes
        for (let i = 0; i < 10; i++) {
            segments.push({ amount: 500, type: 'silver', icon: 'fas fa-star' });
        }
        
        // Add 12x 300 AED prizes
        for (let i = 0; i < 12; i++) {
            segments.push({ amount: 300, type: 'bronze', icon: 'fas fa-medal' });
        }
        
        // Shuffle the segments using Fisher-Yates algorithm
        for (let i = segments.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [segments[i], segments[j]] = [segments[j], segments[i]];
        }
        
        return segments;
    }

    // Get the prize assignments for all segments
    getSegmentPrizes() {
        return this.segmentPrizes;
    }

    // Check if employee has already won
    hasEmployeeWon(employeeName) {
        return this.usedEmployees.has(employeeName.toLowerCase().trim());
    }

    // Get prize for a specific segment
    getPrizeForSegment(segmentIndex, employeeName) {
        if (this.hasEmployeeWon(employeeName)) {
            throw new Error('Employee has already won a prize!');
        }

        if (!this.availableSegments.has(segmentIndex)) {
            throw new Error('This segment has already been won!');
        }

        // Get the prize for this segment
        const prize = this.segmentPrizes[segmentIndex];
        
        // Update remaining counts
        const prizeType = this.prizes.find(p => p.amount === prize.amount);
        if (prizeType) {
            prizeType.remaining--;
        }

        // Record the winner
        const winner = {
            name: employeeName.trim(),
            prize: prize,
            segment: segmentIndex + 1,
            timestamp: new Date(),
            order: this.winners.length + 1
        };

        this.winners.push(winner);
        this.usedEmployees.add(employeeName.toLowerCase().trim());
        this.availableSegments.delete(segmentIndex);

        return winner;
    }

    // Get remaining prize counts
    getRemainingCounts() {
        return {
            1000: this.prizes.find(p => p.amount === 1000).remaining,
            500: this.prizes.find(p => p.amount === 500).remaining,
            300: this.prizes.find(p => p.amount === 300).remaining
        };
    }

    // Get total winners count
    getTotalWinners() {
        return this.winners.length;
    }

    // Get all winners
    getAllWinners() {
        return [...this.winners];
    }

    // Check if all prizes are distributed
    isComplete() {
        return this.availableSegments.size === 0;
    }

    // Reset the prize system
    reset() {
        this.prizes.forEach(prize => {
            prize.remaining = prize.count;
        });
        this.winners = [];
        this.usedEmployees.clear();
        this.segmentPrizes = this.generateSegmentPrizes();
        this.availableSegments = new Set(Array.from({length: 23}, (_, i) => i));
    }

    // Get progress percentage
    getProgress() {
        return Math.round((this.getTotalWinners() / 23) * 100);
    }
}

// Export for use in other files
window.PrizeManager = PrizeManager;

