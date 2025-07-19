// Sound Generation System using Web Audio API
class SoundGenerator {
    constructor() {
        this.audioContext = null;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Web Audio API not supported');
        }
    }

    // Generate spinning sound effect
    generateSpinSound() {
        if (!this.audioContext) return;

        const duration = 4; // 4 seconds
        const sampleRate = this.audioContext.sampleRate;
        const frameCount = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
        const channelData = buffer.getChannelData(0);

        // Generate a spinning sound (frequency sweep with noise)
        for (let i = 0; i < frameCount; i++) {
            const t = i / sampleRate;
            const progress = t / duration;
            
            // Frequency sweep from high to low (spinning slowing down)
            const frequency = 800 - (progress * 600); // 800Hz to 200Hz
            
            // Add some noise for texture
            const noise = (Math.random() - 0.5) * 0.1;
            
            // Generate tone with envelope
            const envelope = Math.exp(-progress * 2); // Fade out
            const tone = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
            
            channelData[i] = tone + noise;
        }

        return buffer;
    }

    // Generate winning sound effect
    generateWinSound() {
        if (!this.audioContext) return;

        const duration = 2; // 2 seconds
        const sampleRate = this.audioContext.sampleRate;
        const frameCount = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
        const channelData = buffer.getChannelData(0);

        // Generate a celebratory sound (ascending notes)
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        const noteLength = frameCount / notes.length;

        for (let i = 0; i < frameCount; i++) {
            const t = i / sampleRate;
            const noteIndex = Math.floor(i / noteLength);
            const frequency = notes[noteIndex] || notes[notes.length - 1];
            
            // Add harmonics for richer sound
            const fundamental = Math.sin(2 * Math.PI * frequency * t);
            const harmonic2 = Math.sin(2 * Math.PI * frequency * 2 * t) * 0.3;
            const harmonic3 = Math.sin(2 * Math.PI * frequency * 3 * t) * 0.1;
            
            // Envelope for each note
            const noteProgress = (i % noteLength) / noteLength;
            const envelope = Math.sin(Math.PI * noteProgress) * 0.5;
            
            channelData[i] = (fundamental + harmonic2 + harmonic3) * envelope;
        }

        return buffer;
    }

    // Play generated sound
    playBuffer(buffer) {
        if (!this.audioContext || !buffer) return;

        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        source.start();
    }

    // Create and play spin sound
    playSpinSound() {
        const buffer = this.generateSpinSound();
        this.playBuffer(buffer);
    }

    // Create and play win sound
    playWinSound() {
        const buffer = this.generateWinSound();
        this.playBuffer(buffer);
    }

    // Resume audio context (required for user interaction)
    resumeAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// Export for use in other files
window.SoundGenerator = SoundGenerator;

