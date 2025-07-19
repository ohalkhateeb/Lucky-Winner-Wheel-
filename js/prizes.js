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
        this.prizePool = this.generatePrizePool();
        this.shufflePrizePool();
    }

    // Generate the complete prize pool
    generatePrizePool() {
        const pool = [];
        
        // Add 1x 1000 AED prize
        pool.push({ amount: 1000, type: 'gold', icon: 'fas fa-crown' });
        
        // Add 10x 500 AED prizes
        for (let i = 0; i < 10; i++) {
            pool.push({ amount: 500, type: 'silver', icon: 'fas fa-star' });
        }
        
        // Add 12x 300 AED prizes
        for (let i = 0; i < 12; i++) {
            pool.push({ amount: 300, type: 'bronze', icon: 'fas fa-medal' });
        }
        
        return pool;
    }

    // Shuffle the prize pool using Fisher-Yates algorithm
    shufflePrizePool() {
        for (let i = this.prizePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.prizePool[i], this.prizePool[j]] = [this.prizePool[j], this.prizePool[i]];
        }
    }

    // Check if employee has already won
    hasEmployeeWon(employeeName) {
        return this.usedEmployees.has(employeeName.toLowerCase().trim());
    }

    // Get the next prize for a winner
    getNextPrize(employeeName) {
        if (this.hasEmployeeWon(employeeName)) {
            throw new Error('Employee has already won a prize!');
        }

        if (this.prizePool.length === 0) {
            throw new Error('All prizes have been distributed!');
        }

        // Get the next prize from the shuffled pool
        const prize = this.prizePool.shift();
        
        // Update remaining counts
        const prizeType = this.prizes.find(p => p.amount === prize.amount);
        if (prizeType) {
            prizeType.remaining--;
        }

        // Record the winner
        const winner = {
            name: employeeName.trim(),
            prize: prize,
            timestamp: new Date(),
            order: this.winners.length + 1
        };

        this.winners.push(winner);
        this.usedEmployees.add(employeeName.toLowerCase().trim());

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
        return this.prizePool.length === 0;
    }

    // Reset the prize system
    reset() {
        this.prizes.forEach(prize => {
            prize.remaining = prize.count;
        });
        this.winners = [];
        this.usedEmployees.clear();
        this.prizePool = this.generatePrizePool();
        this.shufflePrizePool();
    }

    // Get progress percentage
    getProgress() {
        return Math.round((this.getTotalWinners() / 23) * 100);
    }
}

// Export for use in other files
window.PrizeManager = PrizeManager;

