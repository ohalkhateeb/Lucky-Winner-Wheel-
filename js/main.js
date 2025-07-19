// Main Application Logic
class LuckyWinnerApp {
    constructor() {
        this.prizeManager = new PrizeManager();
        this.wheel = new SpinningWheel('wheel-canvas');
        this.animationManager = new AnimationManager();
        this.soundGenerator = new SoundGenerator();
        
        this.elements = {
            spinButton: document.getElementById('spin-button'),
            employeeInput: document.getElementById('employee-name'),
            currentWinner: document.getElementById('current-winner'),
            historyList: document.getElementById('history-list'),
            progressFill: document.getElementById('progress-fill'),
            progressText: document.getElementById('progress-text'),
            prize1000Count: document.getElementById('prize-1000-count'),
            prize500Count: document.getElementById('prize-500-count'),
            prize300Count: document.getElementById('prize-300-count'),
            spinSound: document.getElementById('spin-sound'),
            winSound: document.getElementById('win-sound')
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateUI();
    }

    setupEventListeners() {
        // Spin button click
        this.elements.spinButton.addEventListener('click', () => {
            this.handleSpin();
        });

        // Enter key in employee input
        this.elements.employeeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSpin();
            }
        });

        // Wheel spin complete event
        document.addEventListener('wheelSpinComplete', (e) => {
            this.handleWinnerSelection(e.detail.segment);
        });

        // Employee input validation
        this.elements.employeeInput.addEventListener('input', (e) => {
            this.validateEmployeeInput(e.target.value);
        });
    }

    handleSpin() {
        const employeeName = this.elements.employeeInput.value.trim();
        
        // Validation
        if (!employeeName) {
            this.showError('Please enter an employee name!');
            this.animationManager.shakeElement(this.elements.employeeInput);
            return;
        }

        if (this.prizeManager.hasEmployeeWon(employeeName)) {
            this.showError(`${employeeName} has already won a prize!`);
            this.animationManager.shakeElement(this.elements.employeeInput);
            return;
        }

        if (this.prizeManager.isComplete()) {
            this.showError('All prizes have been distributed!');
            return;
        }

        if (this.wheel.getIsSpinning()) {
            return;
        }

        // Start spinning
        this.startSpin(employeeName);
    }

    startSpin(employeeName) {
        // Disable controls
        this.elements.spinButton.disabled = true;
        this.elements.employeeInput.disabled = true;
        
        // Update button text
        this.elements.spinButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>SPINNING...</span>';
        
        // Play spin sound
        this.playSound('spin');
        
        // Start wheel animation
        this.wheel.spin(4000);
        
        // Store current employee name for later use
        this.currentEmployee = employeeName;
    }

    handleWinnerSelection(segment) {
        try {
            // Get the prize for this winner
            const winner = this.prizeManager.getNextPrize(this.currentEmployee);
            
            // Play win sound
            this.playSound('win');
            
            // Show winner announcement
            this.displayWinner(winner);
            
            // Create confetti
            this.animationManager.createConfetti(60);
            
            // Update UI
            this.updateUI();
            
            // Clear employee input
            this.elements.employeeInput.value = '';
            
            // Check if all prizes are distributed
            if (this.prizeManager.isComplete()) {
                this.showCompletionMessage();
            }
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            // Re-enable controls
            setTimeout(() => {
                this.elements.spinButton.disabled = false;
                this.elements.employeeInput.disabled = false;
                this.elements.spinButton.innerHTML = '<i class="fas fa-play"></i><span>SPIN THE WHEEL</span>';
                this.elements.employeeInput.focus();
            }, 2000);
        }
    }

    displayWinner(winner) {
        const winnerHtml = `
            <div class="winner-announcement">
                <div class="winner-name">${winner.name}</div>
                <div class="winner-prize ${winner.prize.type}">
                    <i class="${winner.prize.icon}"></i>
                    💰 ${winner.prize.amount} AED
                </div>
                <div class="winner-message">Congratulations! 🎉</div>
            </div>
        `;
        
        this.elements.currentWinner.innerHTML = winnerHtml;
        this.animationManager.animateWinnerAnnouncement(this.elements.currentWinner);
        
        // Add to history
        this.addToHistory(winner);
    }

    addToHistory(winner) {
        // Remove "no winners" message if it exists
        const noWinners = this.elements.historyList.querySelector('.no-winners');
        if (noWinners) {
            noWinners.remove();
        }
        
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${winner.prize.type}`;
        historyItem.innerHTML = `
            <strong>${winner.name}</strong><br>
            <i class="${winner.prize.icon}"></i> ${winner.prize.amount} AED
        `;
        
        // Add to top of list
        this.elements.historyList.insertBefore(historyItem, this.elements.historyList.firstChild);
        
        // Animate new item
        this.animationManager.fadeIn(historyItem);
    }

    updateUI() {
        // Update prize counters
        const remaining = this.prizeManager.getRemainingCounts();
        this.elements.prize1000Count.textContent = `${remaining[1000]} left`;
        this.elements.prize500Count.textContent = `${remaining[500]} left`;
        this.elements.prize300Count.textContent = `${remaining[300]} left`;
        
        // Update progress
        const progress = this.prizeManager.getProgress();
        const totalWinners = this.prizeManager.getTotalWinners();
        
        this.elements.progressFill.style.width = `${progress}%`;
        this.elements.progressText.textContent = `${totalWinners} / 23 winners`;
        
        // Update prize item styles based on remaining count
        this.updatePrizeItemStyles(remaining);
    }

    updatePrizeItemStyles(remaining) {
        const prizeItems = document.querySelectorAll('.prize-item');
        prizeItems.forEach((item, index) => {
            const amounts = [1000, 500, 300];
            const count = remaining[amounts[index]];
            
            if (count === 0) {
                item.style.opacity = '0.5';
                item.style.filter = 'grayscale(100%)';
            } else {
                item.style.opacity = '1';
                item.style.filter = 'none';
            }
        });
    }

    validateEmployeeInput(value) {
        const trimmedValue = value.trim();
        
        if (trimmedValue && this.prizeManager.hasEmployeeWon(trimmedValue)) {
            this.elements.employeeInput.style.borderColor = '#EF4444';
            this.showError(`${trimmedValue} has already won!`, false);
        } else {
            this.elements.employeeInput.style.borderColor = '';
            this.clearError();
        }
    }

    showError(message, shake = true) {
        // Create or update error message
        let errorElement = document.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #EF4444;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 500;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
            `;
            document.body.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        if (shake) {
            this.animationManager.shakeElement(errorElement);
        }
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.clearError();
        }, 3000);
    }

    clearError() {
        const errorElement = document.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    showCompletionMessage() {
        setTimeout(() => {
            const completionHtml = `
                <div class="completion-message">
                    <div style="font-size: 2rem; margin-bottom: 15px;">🎉</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #FFD700; margin-bottom: 10px;">
                        Event Complete!
                    </div>
                    <div style="color: #10B981;">
                        All 23 employees have won prizes!
                    </div>
                    <button onclick="app.resetEvent()" style="
                        margin-top: 20px;
                        padding: 10px 20px;
                        background: #10B981;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Start New Event</button>
                </div>
            `;
            
            this.elements.currentWinner.innerHTML = completionHtml;
            this.animationManager.createConfetti(100);
        }, 3000);
    }

    resetEvent() {
        // Reset all systems
        this.prizeManager.reset();
        this.wheel.reset();
        this.animationManager.clearConfetti();
        
        // Reset UI
        this.elements.currentWinner.innerHTML = `
            <div class="winner-placeholder">
                <i class="fas fa-question-circle"></i>
                <p>Spin the wheel to reveal the winner!</p>
            </div>
        `;
        
        this.elements.historyList.innerHTML = '<p class="no-winners">No winners yet...</p>';
        this.elements.employeeInput.value = '';
        this.elements.employeeInput.disabled = false;
        this.elements.spinButton.disabled = false;
        
        this.updateUI();
        this.clearError();
        
        // Focus on input
        this.elements.employeeInput.focus();
    }

    playSound(type) {
        try {
            // Resume audio context if needed (required for user interaction)
            this.soundGenerator.resumeAudioContext();
            
            if (type === 'spin') {
                this.soundGenerator.playSpinSound();
            } else if (type === 'win') {
                this.soundGenerator.playWinSound();
            }
        } catch (error) {
            console.log('Sound error:', error);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new LuckyWinnerApp();
    
    // Focus on employee input
    document.getElementById('employee-name').focus();
});

