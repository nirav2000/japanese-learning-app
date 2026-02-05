# Changelog

All notable changes to the Language Learning App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-02-05

### Added
- **Versioning System**: Complete version management with semantic versioning (MAJOR.MINOR.PATCH)
- **Version Display**: Footer showing current version number
- **What's New Modal**: Popup showing changes in current version
- **Version Archives**: All releases archived in `versions/` folder
- **CHANGELOG.md**: This changelog documenting all changes
- **Update Notifications**: Badge showing when new version is available
- **Console Version Info**: Version logged to browser console on load

### Changed
- Version indicator in header now links to version history

### Documentation
- Added comprehensive changelog
- Version archive system with README per version

---

## [2.0.0] - 2026-02-05

### Added
- **Study Mode**: Checkbox to enable review mode with answers immediately visible
- **Swipe Navigation**:
  - Swipe left to advance to next card
  - Swipe right to go to previous card
  - Works on mobile and tablet devices
- **Automatic Difficulty Rating**:
  - Response time tracking (< 3s = Easy, 3-8s = Good, > 8s = Hard)
  - Auto-selected button pulses to show which will be chosen
  - Auto-advances after 2 seconds
  - Users can override by clicking any rating button
- **Click to Reveal**: Click on character to show answer (in addition to "Show Answer" button)
- **Paul Noble Theme**:
  - Complete visual theme matching "Unlocking Japanese" book
  - Coral/red color scheme (#d95d4e)
  - Chapter-based structure for sequential learning
  - Building block indicators
  - Rule boxes
- **Paul Noble Templates**:
  - JSON template for adding book content
  - Chapter data structure
  - Image generation prompts
  - Setup guide (PAUL_NOBLE_SETUP.md)

### Fixed
- **Progress Screen Bug**: Removed obsolete 'characters' mode references
- **Dynamic Mode Stats**: Progress now generates stats based on actual modes
- **Welcome Screen**: Now updates dynamically based on selected language
- **Card ID Bug**: Fixed inconsistent card ID format (now uses language-mode-index)
- **Language Data Loading**: Fixed data.js duplicate definitions

### Changed
- Reference and Progress buttons now toggle instead of dismiss
- Rating buttons hidden in Study Mode
- Character display now has pointer cursor and is clickable

---

## [1.0.0] - 2026-02-04

### Added
- **Multi-Language Support**:
  - Japanese (Hiragana, Katakana, Kanji, Numbers, Colors, Words, Sentences)
  - French (Alphabet, Numbers, Colors, Words, Sentences)
  - Gujarati (Vowels, Consonants, Numbers, Colors, Words, Sentences)
- **Spaced Repetition**: SM-2 algorithm for optimal learning
- **Reference Charts**:
  - Traditional kana grid layout for Hiragana/Katakana
  - French alphabet with accented characters
  - Gujarati vowels and consonants
- **Progress Tracking**:
  - Cards learned counter
  - Review queue
  - Study streak
  - Study time tracking
  - Detailed statistics per mode
- **Hover Tooltips**: Individual character romaji on hover for words/sentences
- **Category Filtering**: Dropdown to focus on specific topics (numbers, colors)
- **Responsive Design**: Works on desktop, tablet, and mobile

### Initial Features
- Frequency-based learning (most common items first)
- Session-based practice (10 cards per session)
- Visual feedback and animations
- Local storage for progress persistence
- Clean, modern UI with gradient design

---

## Version Format

### Semantic Versioning
- **MAJOR** (X.0.0): Breaking changes, major new features
- **MINOR** (x.X.0): New features, backwards compatible
- **PATCH** (x.x.X): Bug fixes, small improvements

### Categories
- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Features marked for removal
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements

---

## Archive

All previous versions are archived in the `versions/` directory with complete source code.

- [v2.0.0](versions/v2.0.0/) - Study Mode & Auto-Rating Edition
- [v1.0.0](versions/v1.0.0/) - Initial Release

---

Built with ❤️ using Claude Code
Session: https://claude.ai/code/session_01TF9ks9D5qbozYcUmpa61jC
