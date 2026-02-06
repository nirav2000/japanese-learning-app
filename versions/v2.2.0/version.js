// Version Management System
// Language Learning App Version Information

const APP_VERSION = {
    current: '2.2.0',
    name: 'Theme Switcher Edition',
    releaseDate: '2026-02-05',

    // Version history
    history: [
        {
            version: '2.2.0',
            name: 'Theme Switcher Edition',
            date: '2026-02-05',
            type: 'minor',
            highlights: [
                'Added theme selector dropdown to switch between Default and Paul Noble themes',
                'Paul Noble theme now integrated and switchable in main app',
                'Theme preference saved to localStorage',
                'Smooth theme switching without page reload',
                'Visual feedback on theme selection'
            ],
            bugfixes: [],
            breaking: []
        },
        {
            version: '2.1.0',
            name: 'Versioning Edition',
            date: '2026-02-05',
            type: 'minor',
            highlights: [
                'Added complete versioning system',
                'Version display in footer',
                'What\'s New modal for updates',
                'Automatic version archiving',
                'CHANGELOG.md documentation'
            ],
            bugfixes: [],
            breaking: []
        },
        {
            version: '2.0.0',
            name: 'Study Mode & Auto-Rating Edition',
            date: '2026-02-05',
            type: 'major',
            highlights: [
                'Study Mode - review with answers visible',
                'Swipe navigation (left/right)',
                'Automatic difficulty rating based on response time',
                'Click on character to reveal answer',
                'Paul Noble theme and chapter structure'
            ],
            bugfixes: [
                'Fixed progress screen with dynamic mode generation',
                'Fixed welcome screen to update per language',
                'Fixed card ID format consistency'
            ],
            breaking: []
        },
        {
            version: '1.0.0',
            name: 'Initial Release',
            date: '2026-02-04',
            type: 'major',
            highlights: [
                'Multi-language support (Japanese, French, Gujarati)',
                'Spaced repetition with SM-2 algorithm',
                'Reference charts for all languages',
                'Progress tracking and statistics',
                'Hover tooltips for character pronunciation'
            ],
            bugfixes: [],
            breaking: []
        }
    ],

    // Get specific version details
    getVersion(versionNumber) {
        return this.history.find(v => v.version === versionNumber);
    },

    // Get latest N versions
    getRecent(count = 3) {
        return this.history.slice(0, count);
    },

    // Check if there's a new version since last visit
    checkForUpdates() {
        const lastSeenVersion = localStorage.getItem('lastSeenVersion');
        if (!lastSeenVersion || lastSeenVersion !== this.current) {
            return {
                hasUpdate: true,
                lastSeen: lastSeenVersion,
                current: this.current
            };
        }
        return { hasUpdate: false };
    },

    // Mark current version as seen
    markVersionSeen() {
        localStorage.setItem('lastSeenVersion', this.current);
    },

    // Format version for display
    getDisplayVersion() {
        return `v${this.current}`;
    },

    // Get full version string with name
    getFullVersion() {
        return `v${this.current} - ${this.name}`;
    }
};

// Show version in console
console.log(`%c📦 Language Learning App ${APP_VERSION.getFullVersion()}`, 'color: #667eea; font-weight: bold; font-size: 14px;');
console.log(`Released: ${APP_VERSION.releaseDate}`);
