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

### Changing Prize Amounts
Edit the `prizes` array in `js/prizes.js`:
```javascript
this.prizes = [
    { amount: 1000, count: 1, remaining: 1, type: 'gold', icon: 'fas fa-crown' },
    { amount: 500, count: 10, remaining: 10, type: 'silver', icon: 'fas fa-star' },
    { amount: 300, count: 12, remaining: 12, type: 'bronze', icon: 'fas fa-medal' }
];
```

### Changing Number of Employees
Update the `segments` property in `js/wheel.js`:
```javascript
this.segments = 23; // Change to your desired number
```

### Customizing Colors
Modify the color scheme in `css/styles.css`:
```css
:root {
    --primary-gold: #FFD700;
    --primary-blue: #1E3A8A;
    --background-dark: #0F172A;
}
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

