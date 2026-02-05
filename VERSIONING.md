# Versioning System Documentation

## Overview

This app uses **Semantic Versioning** (MAJOR.MINOR.PATCH) to track releases and changes.

## Version Format

```
vMAJOR.MINOR.PATCH
```

- **MAJOR** (v3.0.0): Breaking changes, major architectural changes
- **MINOR** (v2.1.0): New features, backwards compatible
- **PATCH** (v2.0.1): Bug fixes, small improvements

## Current Version

**v2.1.0** - "Versioning Edition"

## Files in Versioning System

### Core Files
- `version.js` - Version information and management
- `CHANGELOG.md` - Human-readable changelog
- `VERSIONING.md` - This file

### Archive Structure
```
versions/
├── v2.0.0/
│   ├── README.md
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── ... (all app files)
├── v2.1.0/
│   └── ...
```

## How to Release a New Version

### 1. Before Making Changes

**Archive the current version:**

```bash
cd /home/user/japanese-learning-app

# Create version directory
mkdir -p versions/v2.1.0

# Copy all app files
cp index.html styles.css app.js data.js *.js versions/v2.1.0/

# Create version README
cat > versions/v2.1.0/README.md << 'EOF'
# Version 2.1.0 - "Version Name"
Release Date: YYYY-MM-DD

## Features
- Feature 1
- Feature 2

## Bug Fixes
- Fix 1
EOF
```

### 2. Update Version Files

**Update `version.js`:**

```javascript
const APP_VERSION = {
    current: '2.2.0',  // Increment version
    name: 'New Feature Edition',
    releaseDate: '2026-02-06',

    history: [
        {
            version: '2.2.0',  // Add new entry at top
            name: 'New Feature Edition',
            date: '2026-02-06',
            type: 'minor',
            highlights: [
                'New feature description'
            ],
            bugfixes: [],
            breaking: []
        },
        // ... existing versions
    ]
}
```

**Update `CHANGELOG.md`:**

```markdown
## [2.2.0] - 2026-02-06

### Added
- New feature

### Fixed
- Bug fix

---

## [2.1.0] - 2026-02-05
...
```

**Update `index.html`:**

```html
<span id="versionNumber">v2.2.0</span>
```

### 3. Commit and Push

```bash
git add .
git commit -m "Release v2.2.0 - New Feature Edition"
git push origin main
```

## Version Naming Conventions

### Version Names (Examples)
- **Major (v2.0.0)**: "Study Mode & Auto-Rating Edition"
- **Minor (v2.1.0)**: "Versioning Edition"
- **Patch (v2.0.1)**: "Bug Fix Update"

### Commit Message Format

```
Release v2.1.0 - Versioning Edition

- Added versioning system
- Added footer with version display
- Added What's New modal
- Archived previous version

https://claude.ai/code/session_xxx
```

## Automatic Features

### Update Detection
- App checks `localStorage` for `lastSeenVersion`
- Shows "What's New" modal automatically on first visit after update
- User can click footer info icon to see version details anytime

### Version Display
- Footer shows current version number
- Status indicator shows version in header
- Console logs version on app load

## Archive Best Practices

1. **Always archive before releasing**: Preserve the working state
2. **Include README**: Document what's in each version
3. **Complete snapshot**: Copy ALL relevant files
4. **Test archive**: Verify archived version still works

## Version History Quick Reference

| Version | Date | Type | Name |
|---------|------|------|------|
| 2.1.0 | 2026-02-05 | Minor | Versioning Edition |
| 2.0.0 | 2026-02-05 | Major | Study Mode & Auto-Rating Edition |
| 1.0.0 | 2026-02-04 | Major | Initial Release |

## Changelog Standards

Follow [Keep a Changelog](https://keepachangelog.com/) format:

### Categories
- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements

### Example Entry

```markdown
## [2.1.0] - 2026-02-05

### Added
- Versioning system with semantic versioning
- Footer displaying current version
- What's New modal for update notifications

### Changed
- Status indicator now shows version number

### Fixed
- None in this release
```

## Tools

### Quick Archive Script
Create `archive-version.sh`:

```bash
#!/bin/bash
VERSION=$1

if [ -z "$VERSION" ]; then
    echo "Usage: ./archive-version.sh v2.1.0"
    exit 1
fi

mkdir -p versions/$VERSION
cp *.html *.css *.js versions/$VERSION/
echo "Archived $VERSION"
```

Usage:
```bash
chmod +x archive-version.sh
./archive-version.sh v2.1.0
```

## FAQs

**Q: When should I bump the MAJOR version?**
A: When making breaking changes that aren't backwards compatible.

**Q: Should I archive PATCH versions?**
A: Yes! Archive all releases for complete history.

**Q: Can users see old versions?**
A: Archives are in the repo but not exposed in the UI (could add version selector feature).

**Q: How long to keep archives?**
A: Keep all versions indefinitely - storage is cheap, history is valuable.

---

**Last Updated:** February 5, 2026
**Current Version:** v2.1.0
