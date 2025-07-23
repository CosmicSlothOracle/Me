# Character Position & Animation Test Suite

## Overview

Comprehensive testing tools to verify that the background character sprite animation appears correctly positioned and functions properly across different browsers and screen sizes.

## ✅ **HEATMAP SETUP COMPLETE**

Your heatmap reference has been successfully deployed to all themes:

```
✅ assets/themes/standard/background/background-with-character-heatmap.png
✅ assets/themes/pixel-art/background/background-with-character-heatmap.png
✅ assets/themes/modern/background/background-with-character-heatmap.png
✅ assets/themes/bauhaus/background/background-with-character-heatmap.png
✅ assets/themes/manga/background/background-with-character-heatmap.png
✅ assets/themes/integrated/background/background-with-character-heatmap.png
```

## Files Created

### 1. `character-positioning-test.html`

Main test suite with 4 comprehensive test sections:

#### Section 1: Original Page Load Test

- Loads your main index.html in an iframe
- Analyzes the actual character position and styling
- Tests animation performance and frame rates
- Verifies BackgroundCharacter class functionality

#### Section 2: Visual Position Verification

- Creates a visual test environment with positioning markers
- Shows expected position (green marker at 10% from bottom-right)
- Toggle grid overlay for precise alignment verification
- **Heatmap mode**: Replace sprite with black/white positioning guide
- Screenshot capture instructions for documentation

#### Section 3: Animation Performance Test

- Measures animation FPS over 5 seconds
- Tests spritesheet loading (idle_256x256_8.png)
- Validates fallback rendering functionality
- Performance rating system (Good/Acceptable/Poor)

#### Section 4: Cross-browser Compatibility

- Tests browser feature support (Canvas 2D, RequestAnimationFrame, CSS transforms)
- Responsive testing for Mobile/Tablet/Desktop viewports
- Validates character positioning across different screen sizes

### 2. `character-heatmap-generator.html`

Utility to generate black and white heatmap reference images:

- Creates 256x256px positioning guide with grid pattern
- Center cross marks for alignment verification
- Corner markers and percentage labels
- Download function for PNG export

### 3. `background-reference-generator.html`

Advanced tool for creating theme-specific heatmap references:

- Upload your background image
- Generate precise positioning overlay
- Choose between black area, white area, heatmap pattern, or outline
- Download PNG with exact positioning for your theme

### 4. **`theme-heatmap-test.html`** ⭐ **NEW**

**Specialized test for all themes with heatmap references:**

- Switch between all 6 themes instantly
- Visual comparison of original vs heatmap backgrounds
- Position testing with exact measurements
- Grid overlay for precise alignment
- "Test All Themes" button for comprehensive testing

## Current System Specifications

Based on your memory [[memory:3108762]], your current setup:

```html
<!-- Character container -->
<div
  id="background-character"
  style="position: fixed; bottom: 10%; right: 10%; z-index: 1; pointer-events: none;"
>
  <canvas
    id="background-canvas"
    width="192"
    height="192"
    style="image-rendering: pixelated; transform: scale(2);"
  ></canvas>
</div>
```

**Key Details:**

- Position: `bottom: 10%, right: 10%` (fixed positioning)
- Canvas: 192x192px scaled 2x = 384x384px effective size
- Spritesheet: `idle_256x256_8.png` (8 frames, 256x256 each)
- Animation: 8-frame idle loop with configurable speed
- Fallback: Blue square with "AI" text if spritesheet fails to load

## How to Use

### 🎯 **Quick Theme Testing (RECOMMENDED)**

1. Open `tests/theme-heatmap-test.html`
2. Click through different theme buttons
3. Click "Run Position Test" for each theme
4. Use "Test All Themes" for comprehensive testing

### Quick Test

1. Open `character-positioning-test.html` in your browser
2. Tests will auto-run on page load
3. Review results in each section

### Detailed Testing

1. **Load Original Page**: Click "Load Original Page" to test your actual site
2. **Visual Verification**: Use "Create Visual Test" to see positioning markers
3. **Toggle Grid**: Enable 10% grid overlay for precise alignment checking
4. **Heatmap Mode**: Check the "Use B&W Heatmap" option for clearer positioning reference
5. **Performance**: Run performance tests to verify smooth animation

### Creating Custom Heatmap Reference

1. Open `background-reference-generator.html`
2. Upload your background image
3. Adjust character size (384px) and position (10% from bottom/right)
4. Select "Black Area" for maximum contrast
5. Download PNG for your theme

## Expected Results

### ✅ PASS Criteria

- Character appears at bottom-right corner
- Positioned exactly 10% from bottom and right edges
- Animation runs at ~6 FPS (60fps / 10 frame speed)
- Character size is 384x384px (visible scaled size)
- No console errors
- Loads on mobile, tablet, and desktop
- **Heatmap shows black positioning area with white cross**

### ❌ FAIL Indicators

- Character not visible
- Incorrect positioning (not at 10% from edges)
- Animation not running or stuttering
- Console errors about missing spritesheets
- Performance below 15 FPS
- Character too large/small on mobile devices
- **Heatmap files not loading or corrupted**

## Heatmap Reference System

### 🎨 **Visual Guide**

Your heatmap shows:

- **Black area**: High contrast positioning guide (384x384px)
- **White cross**: Marks exact center point
- **Corner markers**: White squares for alignment verification
- **Exact positioning**: 10% from bottom-right edges

### 🔄 **Usage in Testing**

- **Original backgrounds**: Show the actual theme design
- **Heatmap references**: Show exactly where character should appear
- **Side-by-side comparison**: Easy visual verification
- **Grid overlay**: Precise percentage-based alignment

## Troubleshooting

### Common Issues

1. **Character not visible**: Check if spritesheet path is correct
2. **Wrong position**: Verify CSS positioning values in index.html
3. **No animation**: Check if BackgroundCharacter class initializes properly
4. **Performance issues**: Monitor frame rate and browser compatibility
5. **Heatmap not loading**: Verify file path and file integrity

### Debug Mode

Use browser developer tools:

- Console tab: Check for JavaScript errors
- Elements tab: Inspect character positioning styles
- Performance tab: Monitor animation frame rates

## Recommendation: Heatmap for Testing

**✅ CONFIRMED: Black and white heatmap is much better for testing** because:

1. **Precise Alignment**: Clear contrast makes positioning errors obvious
2. **No Visual Distractions**: Focus purely on positioning, not character details
3. **Grid References**: Built-in alignment guides and percentage markers
4. **Automated Testing**: Easier to verify positioning programmatically
5. **Cross-platform Consistency**: Same reference across all devices
6. **Theme Independence**: Works with any background design

### 🚀 **Next Steps**

1. Test with `theme-heatmap-test.html` to verify all themes work
2. Use heatmap references for precise positioning verification
3. Run performance tests to ensure smooth animation
4. Test across different browsers and devices
5. Document any positioning issues found

**Your heatmap system is now ready for comprehensive testing across all themes!**
