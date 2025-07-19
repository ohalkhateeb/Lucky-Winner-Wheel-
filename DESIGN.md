# Lucky Winner Spinning Wheel - Design Document

## Visual Design Concept

### Color Scheme
- **Primary Colors**: Gold (#FFD700), Deep Blue (#1E3A8A), White (#FFFFFF)
- **Accent Colors**: Green (#10B981) for winners, Red (#EF4444) for excitement
- **Background**: Dark gradient (#0F172A to #1E293B) for dramatic effect
- **Wheel Segments**: Alternating light colors for visibility

### Wheel Design
- **Size**: 400px diameter (responsive)
- **Segments**: 23 equal segments (360° / 23 = ~15.65° each)
- **Colors**: Alternating between light blue (#DBEAFE), light yellow (#FEF3C7), and light green (#D1FAE5)
- **Border**: Gold border around the wheel
- **Center**: Decorative center hub with logo/title

### Prize Tiers Visual Representation
- **💰 1000 AED**: Gold color with crown icon
- **💰 500 AED**: Silver color with star icon  
- **💰 300 AED**: Bronze color with medal icon

### UI Components
1. **Spinning Wheel**: Central focus with static arrow pointer
2. **Spin Button**: Large, attractive button below the wheel
3. **Prize Display**: Current winner announcement area
4. **Remaining Prizes Counter**: Side panel showing available prizes
5. **Winner History**: List of previous winners (optional)

### Animation Design
- **Spin Animation**: Smooth rotation with easing (fast start, slow end)
- **Duration**: 3-5 seconds for suspense
- **Sound Effects**: Spinning sound + winner celebration sound
- **Visual Effects**: Confetti or sparkles for winners

### Layout Structure
```
┌─────────────────────────────────────┐
│              TITLE                  │
├─────────────┬───────────────────────┤
│             │    REMAINING PRIZES   │
│   SPINNING  │    💰 1000: 1 left    │
│    WHEEL    │    💰 500: 10 left    │
│             │    💰 300: 12 left    │
├─────────────┴───────────────────────┤
│           SPIN BUTTON               │
├─────────────────────────────────────┤
│         WINNER DISPLAY              │
└─────────────────────────────────────┘
```

## Technical Specifications

### Prize Distribution Algorithm
- Total employees: 23
- Prize allocation: 1×1000 + 10×500 + 12×300 = 23 prizes
- Random assignment ensuring no duplicates
- Fair distribution using Fisher-Yates shuffle

### Responsive Design
- Mobile-first approach
- Wheel scales appropriately on different screen sizes
- Touch-friendly controls for mobile devices

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox for layout
- JavaScript ES6+ features with fallbacks if needed

