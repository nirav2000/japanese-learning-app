# Paul Noble Theme - Setup Guide

This guide shows you how to set up and use the Paul Noble companion mode for your "Unlocking Japanese with Paul Noble" book.

## 📚 What You Get

1. **Visual Theme** matching the book's red/coral color scheme
2. **Chapter-based structure** following the book's progression
3. **Step-by-step learning** with rules and building blocks
4. **JSON template** for adding content as you study

---

## 🚀 Quick Start

### Step 1: Enable the Paul Noble Theme

Add this line to your `index.html` in the `<head>` section:

```html
<link rel="stylesheet" href="paul-noble-theme.css">
```

And add the theme class to the body:

```html
<body class="paul-noble-theme">
```

### Step 2: Load Chapter Data

Add this script tag to `index.html` before the closing `</body>` tag:

```html
<script src="paul-noble-chapters.js"></script>
```

### Step 3: Add Chapter Mode to Configuration

Update your `data.js` file to include Paul Noble chapters:

```javascript
const languageConfig = {
    japanese: {
        title: 'Japanese Learning App',
        subtitle: 'Master Hiragana, Katakana & Kanji with Spaced Repetition',
        modes: ['hiragana', 'katakana', 'kanji', 'numbers', 'colors', 'words', 'sentences', 'paul-noble'],
        categories: {
            'numbers': 'Numbers',
            'colors': 'Colors',
            'paul-noble': 'Paul Noble Method'
        }
    },
    // ... rest of config
};
```

---

## 📝 Adding Book Content

### Method 1: Using the JSON Template

1. Open `paul-noble-template.json`
2. Fill in content from your book as you study each chapter
3. Use a JSON to JS converter, or manually copy to `paul-noble-chapters.js`

### Method 2: Direct JavaScript Entry

Edit `paul-noble-chapters.js` directly:

```javascript
{
    number: 3,
    title: "I made a hotel reservation online last night - we're going to go to Kyoto!",
    description: "Making plans and talking about the future",
    icon: "🏨",
    rules: [
        {
            number: 2,
            text: "Build on what you know",
            explanation: "Each new phrase uses words you've already learned"
        }
    ],
    vocabulary: [
        {
            char: "ホテル",
            romaji: "hoteru",
            meaning: "hotel",
            frequency: 1,
            example: "ホテルの予約 (hoteru no yoyaku - hotel reservation)",
            category: "travel",
            buildingBlock: "English loan word - sounds like 'hotel'"
        },
        {
            char: "予約",
            romaji: "yoyaku",
            meaning: "reservation",
            frequency: 2,
            example: "予約する (yoyaku suru - to make a reservation)",
            category: "travel"
        }
        // ... add more vocabulary
    ],
    sentences: [
        {
            char: "昨夜ホテルの予約をしました",
            romaji: "sakuya hoteru no yoyaku wo shimashita",
            meaning: "I made a hotel reservation last night",
            frequency: 1,
            example: "Past tense (-mashita)",
            buildingBlock: "Combining: sakuya (last night) + hoteru (hotel) + yoyaku (reservation)"
        }
        // ... add more sentences
    ]
}
```

### Field Explanations:

- **char**: Japanese characters (hiragana, katakana, or kanji)
- **romaji**: Pronunciation guide
- **meaning**: English translation
- **frequency**: Order introduced (1, 2, 3...)
- **example**: Context or usage note
- **category**: Word type (greeting, travel, food, etc.)
- **buildingBlock**: How this builds on previous learning (optional)

---

## 🎨 Customizing the Theme

### Change Colors

Edit `paul-noble-theme.css`:

```css
:root {
    --pn-primary: #d95d4e;        /* Main red/coral */
    --pn-primary-dark: #b84739;   /* Darker red */
    --pn-cream: #f9f6f1;          /* Background cream */
    /* ... change these to your preference */
}
```

### Add Custom Icons

1. Generate images using prompts from `IMAGE_PROMPTS.md`
2. Save to `/images/` folder
3. Reference in CSS or HTML

---

## 📖 How to Use with the Book

### Recommended Workflow:

1. **Read a chapter** in the Paul Noble book
2. **Add vocabulary** to `paul-noble-chapters.js` in order of appearance
3. **Select Chapter mode** in the app
4. **Enable Study Mode** (checkbox) to review with answers visible
5. **Practice cards** with spaced repetition
6. **Move to next chapter** when comfortable

### Study Tips:

- ✅ Follow the book's order - don't skip ahead
- ✅ Use Study Mode first to learn, then test yourself
- ✅ Pay attention to "building blocks" - how words combine
- ✅ Review chapters regularly even after moving forward

---

## 🔧 Troubleshooting

### Theme not applying?
- Check that `paul-noble-theme.css` is loaded
- Verify `<body class="paul-noble-theme">` is present
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)

### Chapters not showing?
- Ensure `paul-noble-chapters.js` is loaded before `app.js`
- Check browser console for JavaScript errors
- Verify chapter data structure matches template

### Content not saving?
- The app uses localStorage - data stays on your device
- Progress is saved separately for each language/mode
- Clearing browser data will reset progress

---

## 📁 File Structure

```
japanese-learning-app/
├── index.html
├── styles.css
├── app.js
├── data.js
├── paul-noble-theme.css          ← Theme stylesheet
├── paul-noble-chapters.js         ← Chapter data
├── paul-noble-template.json       ← Template for offline editing
├── IMAGE_PROMPTS.md               ← Image generation guides
└── PAUL_NOBLE_SETUP.md           ← This file
```

---

## 🎯 Next Steps

1. ✅ Enable the theme
2. ✅ Add Chapter 1 content from your book
3. ✅ Test in Study Mode
4. ✅ Add more chapters as you progress through the book
5. ✅ Generate custom icons (optional)

---

## 💡 Pro Tips

- **Backup your data**: Export `paul-noble-chapters.js` regularly
- **Use categories**: Group related words for focused practice
- **Building blocks**: Always note how new words relate to old ones
- **Study Mode**: Use it like flashcards before testing yourself
- **Frequency matters**: Keep the order from the book for best results

---

Happy learning! Remember: **Don't skip anything!** 🎯
