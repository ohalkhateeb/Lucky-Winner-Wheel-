# Lucky Winner Spinning Wheel

A fun, fair, and engaging browser-based spinning wheel for employee prize distribution events.

## Features

- **23 Employee Segments**: Wheel divided into 23 equal segments for fair distribution
- **3 Prize Tiers**: 
  - 💰 1000 AED (1 winner)
  - 💰 500 AED (10 winners)  
  - 💰 300 AED (12 winners)
- **Fair Distribution**: Ensures each employee wins only once and prize limits are respected
- **Engaging Animations**: Smooth spinning with suspense and confetti celebrations
- **Sound Effects**: Generated spinning and winning sounds using Web Audio API
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Live prize counters and progress tracking
- **Winner History**: Track all previous winners

## Technical Specifications

- **100% Browser-based**: No server or backend required
- **Zero Dependencies**: Pure HTML, CSS, and JavaScript
- **Responsive Design**: Mobile-first approach with touch support
- **Modern Browser Support**: Chrome, Firefox, Safari, Edge
- **Offline Capable**: Works without internet connection after initial load

## Quick Start

### Option 1: Direct File Access
1. Download all files to a folder
2. Open `index.html` in any modern web browser
3. Start spinning!

### Option 2: Local Server (Recommended)
1. Download all files to a folder
2. Start a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8080
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8080
   ```
3. Open `http://localhost:8080` in your browser

## Deployment Options

### GitHub Pages
1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your app will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop the project folder to Netlify dashboard
3. Your app will be deployed instantly with a custom URL

### Vercel
1. Create account at [vercel.com](https://vercel.com)
2. Import your GitHub repository or upload files
3. Deploy with one click

### Other Static Hosting Services
- **Firebase Hosting**: `firebase deploy`
- **Surge.sh**: `surge .`
- **Cloudflare Pages**: Connect GitHub repository

## File Structure

```
lucky-winner-wheel/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling and animations
├── js/
│   ├── main.js         # Main application logic
│   ├── wheel.js        # Spinning wheel mechanics
│   ├── prizes.js       # Prize distribution system
│   ├── animations.js   # Visual effects and animations
│   └── sounds.js       # Sound generation system
├── assets/             # (Optional) Additional assets
├── sounds/             # (Optional) Audio files
└── README.md           # This file
```

## How to Use

1. **Enter Employee Name**: Type the employee's name in the input field
2. **Spin the Wheel**: Click the "SPIN THE WHEEL" button
3. **Watch the Magic**: Enjoy the spinning animation and sound effects
4. **Celebrate**: See the winner announcement with confetti
5. **Track Progress**: Monitor remaining prizes and winner history
6. **Repeat**: Continue until all 23 employees have won

## Customization

### Changing Prize Amounts and Distribution
To change the prize amounts, their counts, or add new prize tiers, modify the `this.prizes` array and the `generateSegmentPrizes()` method in `js/prizes.js`.

**1. `this.prizes` array:**
This array defines the prize tiers, their initial counts, and visual properties. You can adjust the `amount`, `count`, `type`, and `icon` for each prize.
```javascript
// js/prizes.js
this.prizes = [
    { amount: 1000, count: 1, remaining: 1, type: 'gold', icon: 'fas fa-crown' },
    { amount: 500, count: 10, remaining: 10, type: 'silver', icon: 'fas fa-star' },
    { amount: 300, count: 12, remaining: 12, type: 'bronze', icon: 'fas fa-medal' }
];
```

**2. `generateSegmentPrizes()` method:**
This method populates the wheel segments with prizes based on the counts defined in `this.prizes`. If you change the `count` in `this.prizes`, you must also adjust the loops in this method accordingly to ensure the correct number of each prize is added to the wheel.
```javascript
// js/prizes.js
generateSegmentPrizes() {
    const segments = [];
    
    // Example: Add 1x 1000 AED prize
    segments.push({ amount: 1000, type: 'gold', icon: 'fas fa-crown' });
    
    // Example: Add 10x 500 AED prizes
    for (let i = 0; i < 10; i++) {
        segments.push({ amount: 500, type: 'silver', icon: 'fas fa-star' });
    }
    
    // Example: Add 12x 300 AED prizes
    for (let i = 0; i < 12; i++) {
        segments.push({ amount: 300, type: 'bronze', icon: 'fas fa-medal' });
    }
    
    // Ensure the total number of prizes pushed here matches the total number of segments (employees)
    // The wheel currently has 23 segments, so ensure 23 prizes are pushed.
    
    // Shuffle the segments (important for random distribution)
    for (let i = segments.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [segments[i], segments[j]] = [segments[j], segments[i]];
    }
    
    return segments;
}
```

### Changing Number of Employees (Segments on Wheel)
To change the total number of employees (which corresponds to the number of segments on the wheel), you need to modify two places:

**1. `this.segments` property in `js/wheel.js`:**
This defines how many equal segments the wheel will be divided into.
```javascript
// js/wheel.js
this.segments = 23; // Change this number to your desired total number of employees/segments
```

**2. `PrizeManager` constructor and `getProgress()` method in `js/prizes.js`:**
- In the `PrizeManager` constructor, update the `availableSegments` initialization to match the new total number of segments.
- In the `getProgress()` method, update the total number of winners used for percentage calculation.
```javascript
// js/prizes.js
constructor() {
    // ... other properties
    this.availableSegments = new Set(Array.from({length: 23}, (_, i) => i)); // Update '23' to your new total
}

// ...

getProgress() {
    return Math.round((this.getTotalWinners() / 23) * 100); // Update '23' to your new total
}
```

**Important Note**: When changing the number of employees/segments, ensure that the total number of prizes defined in `js/prizes.js` (`generateSegmentPrizes()` method) exactly matches the new `this.segments` value in `js/wheel.js`.

### Customizing Colors
Modify the color scheme in `css/styles.css`:
```css
/* Example of colors you can change */
body {
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%);
}

.title {
    color: #FFD700;
}

/* And other color properties throughout styles.css */
```

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Load Time**: < 2 seconds on average connection
- **File Size**: < 100KB total (excluding fonts)
- **Memory Usage**: < 50MB during operation
- **CPU Usage**: Minimal (only during animations)

## Troubleshooting

### Wheel Not Spinning
- Ensure JavaScript is enabled in your browser
- Check browser console for errors
- Try refreshing the page

### Sound Not Working
- Click anywhere on the page first (browser autoplay policy)
- Check if browser supports Web Audio API
- Ensure volume is not muted

### Layout Issues
- Clear browser cache and refresh
- Ensure you're using a modern browser
- Check if CSS files loaded correctly

## Support

For issues or questions:
1. Check the browser console for error messages
2. Ensure all files are in the correct directory structure
3. Verify you're using a supported browser
4. Try opening in an incognito/private window

## License

This project is open source and available under the MIT License.

---

**Enjoy your Lucky Winner event! 🎉**

