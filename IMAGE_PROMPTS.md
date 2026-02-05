# Image Generation Prompts for Paul Noble Theme

Use these prompts with image generation tools (DALL-E, Midjourney, Stable Diffusion, etc.) to create illustrations matching the book's style.

## Style Guidelines
- **Art Style**: Simple, clean line art with minimal detail
- **Colors**: White/cream outlines on coral red (#d95d4e) background
- **Tone**: Friendly, approachable, hand-drawn feel
- **Format**: SVG or PNG with transparent background preferred

---

## 1. Japanese Pagoda/Temple Icon
```
Create a simple, minimalist line drawing of a 5-tier Japanese pagoda (like Kyoto temple).
Style: white line art on transparent background, clean geometric shapes, friendly and approachable,
minimal detail, similar to a travel guide illustration.
Dimensions: 300x400px, suitable for chapter headers.
```

## 2. Step-by-Step Arrow
```
Create a decorative arrow pointing downward, made of concentric chevron/arrow shapes stacked
vertically. Style: hand-drawn feel, coral red color (#d95d4e), slightly sketchy but clean lines.
The arrow should convey "next step" or "continue" in a friendly way.
Dimensions: 100x100px, SVG preferred.
```

## 3. Chapter Number Circles
```
Create a circular badge/medallion design for chapter numbers. Style: solid coral red circle
with white border, clean and modern but with slight hand-drawn character. Include subtle
decorative elements like small dots or lines.
Dimensions: 100x100px, leave center clear for number text.
```

## 4. Building Block Icon
```
Create a simple icon of 2-3 building blocks or bricks stacking together, representing
"building block" learning. Style: minimalist line art, coral red (#d95d4e), friendly appearance.
Dimensions: 50x50px.
```

## 5. Success/Celebration Icon
```
Create a celebratory icon showing confetti, stars, or fireworks in a circular design.
Style: playful but simple, coral red with cream/white accents, hand-drawn feel.
Use when completing chapters.
Dimensions: 150x150px.
```

## 6. Study Mode Icon
```
Create an icon of an open book with reading glasses or a magnifying glass.
Style: simple line drawing, coral red, friendly and inviting.
Dimensions: 80x80px.
```

## 7. Progress Trophy/Badge
```
Create a simple trophy or achievement badge design. Style: minimalist, coral red and cream colors,
geometric shapes, suitable for marking learning milestones.
Dimensions: 120x120px.
```

## 8. Language Flag Icons (Optional)
```
Create stylized, geometric versions of:
- Japanese flag (simplified red circle)
- French flag (simplified tricolor)
- Indian flag (simplified for Gujarati)
Style: minimal, flat design, matching the book's aesthetic
Dimensions: 60x40px each
```

---

## Alternative: CSS-Based Icons

If you prefer not to generate images, here are CSS-based alternatives:

### Arrow (using CSS):
```css
.step-arrow::before {
    content: '▼';
    font-size: 3em;
    color: #d95d4e;
}
```

### Building Block (using emoji):
```html
🧱 or 📦
```

### Chapter Circle (pure CSS):
```css
.chapter-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #d95d4e;
    border: 3px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
}
```

---

## Usage in App

Once you have the images:

1. Save them in `/japanese-learning-app/images/` folder
2. Name them: `pagoda.svg`, `arrow-down.svg`, `building-block.svg`, etc.
3. Reference them in the CSS or HTML:

```css
.chapter-icon {
    background-image: url('images/pagoda.svg');
}
```

or

```html
<img src="images/arrow-down.svg" alt="Next step" class="step-arrow">
```
