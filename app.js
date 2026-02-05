// Japanese Learning App with Spaced Repetition
// SM-2 Algorithm Implementation

class SpacedRepetitionApp {
    constructor() {
        this.currentLanguage = 'japanese';
        this.currentMode = null;
        this.currentData = [];
        this.reviewQueue = [];
        this.currentCard = null;
        this.currentIndex = 0;
        this.sessionCards = [];
        this.reviewMode = false;

        // Touch/swipe handling
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;

        // Local storage key base
        this.STORAGE_KEY_BASE = 'multiLangLearningSRS';

        // Theme management
        this.currentTheme = localStorage.getItem('appTheme') || 'default';

        // Load saved progress
        this.loadProgress();

        // Apply saved theme
        this.applyTheme(this.currentTheme);

        // Initialize UI
        this.initializeUI();
    }

    initializeUI() {
        // Language selection buttons
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.language-btn');
                if (button) {
                    this.selectLanguage(button.dataset.language);
                }
            });
        });

        // Mode selection buttons - will be dynamically generated
        this.updateModeButtons();

        // Category dropdown
        const categoryDropdown = document.getElementById('categoryDropdown');
        if (categoryDropdown) {
            categoryDropdown.addEventListener('change', (e) => {
                this.handleCategoryChange(e.target.value);
            });
        }

        // Review mode checkbox
        const reviewModeCheckbox = document.getElementById('reviewModeCheckbox');
        if (reviewModeCheckbox) {
            reviewModeCheckbox.addEventListener('change', (e) => {
                this.reviewMode = e.target.checked;
                if (this.currentMode) {
                    // Restart current session with new mode
                    this.selectMode(this.currentMode);
                }
            });
        }

        // Theme selector dropdown
        const themeDropdown = document.getElementById('themeDropdown');
        if (themeDropdown) {
            // Set initial value from saved theme
            themeDropdown.value = this.currentTheme;

            themeDropdown.addEventListener('change', (e) => {
                this.switchTheme(e.target.value);
            });
        }

        // Show answer button
        document.getElementById('showAnswerBtn').addEventListener('click', () => {
            this.showAnswer();
        });

        // Rating buttons
        document.querySelectorAll('.rating-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                this.rateCard(rating);
            });
        });

        // Restart button
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.selectMode(this.currentMode);
        });

        // Reference button - toggleable
        const referenceBtn = document.getElementById('referenceBtn');
        if (referenceBtn) {
            referenceBtn.addEventListener('click', () => {
                this.toggleReferenceChart();
            });
        }

        // Progress button - toggleable
        const progressBtn = document.getElementById('progressBtn');
        if (progressBtn) {
            progressBtn.addEventListener('click', () => {
                this.toggleProgressScreen();
            });
        }

        // Close Chart button
        document.getElementById('closeChartBtn').addEventListener('click', () => {
            this.closeReferenceChart();
        });

        // Close Progress button
        document.getElementById('closeProgressBtn').addEventListener('click', () => {
            this.closeProgressScreen();
        });

        // Setup swipe gestures on learning area
        this.setupSwipeGestures();

        // Update UI for current language
        this.updateLanguageUI();

        // Update stats display
        this.updateStats();

        // Update status indicator to show JS is loaded
        const jsStatus = document.getElementById('jsStatus');
        if (jsStatus) {
            jsStatus.textContent = `${APP_VERSION.getDisplayVersion()} - Ready ✓`;
            jsStatus.style.color = '#4CAF50';
        }

        // Setup version modal
        this.setupVersionModal();

        // Check for updates and show what's new if needed
        this.checkVersionUpdate();
    }

    setupVersionModal() {
        const whatsNewBtn = document.getElementById('whatsNewBtn');
        const closeWhatsNew = document.getElementById('closeWhatsNew');
        const modalOkBtn = document.getElementById('modalOkBtn');
        const modalOverlay = document.getElementById('modalOverlay');

        if (whatsNewBtn) {
            whatsNewBtn.addEventListener('click', () => {
                this.showWhatsNew();
            });
        }

        if (closeWhatsNew) {
            closeWhatsNew.addEventListener('click', () => {
                this.hideWhatsNew();
            });
        }

        if (modalOkBtn) {
            modalOkBtn.addEventListener('click', () => {
                this.hideWhatsNew();
                APP_VERSION.markVersionSeen();
            });
        }

        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                this.hideWhatsNew();
            });
        }

        // Version history button
        const versionHistoryBtn = document.getElementById('versionHistoryBtn');
        if (versionHistoryBtn) {
            versionHistoryBtn.addEventListener('click', () => {
                this.showVersionHistory();
            });
        }

        // Version history modal close buttons
        const closeVersionHistory = document.getElementById('closeVersionHistory');
        const versionHistoryOkBtn = document.getElementById('versionHistoryOkBtn');
        const versionHistoryOverlay = document.getElementById('versionHistoryOverlay');

        if (closeVersionHistory) {
            closeVersionHistory.addEventListener('click', () => {
                this.hideVersionHistory();
            });
        }

        if (versionHistoryOkBtn) {
            versionHistoryOkBtn.addEventListener('click', () => {
                this.hideVersionHistory();
            });
        }

        if (versionHistoryOverlay) {
            versionHistoryOverlay.addEventListener('click', () => {
                this.hideVersionHistory();
            });
        }

        // Version switcher dropdown
        const versionSwitcher = document.getElementById('versionSwitcher');
        if (versionSwitcher) {
            versionSwitcher.addEventListener('change', (e) => {
                this.handleVersionSwitch(e.target.value);
            });
        }
    }

    showWhatsNew() {
        const modal = document.getElementById('whatsNewModal');
        const content = document.getElementById('whatsNewContent');

        if (!modal || !content) return;

        // Get current version details
        const currentVersion = APP_VERSION.getVersion(APP_VERSION.current);

        if (currentVersion) {
            let html = `<div class="version-badge">Version ${currentVersion.version}</div>`;
            html += `<p><strong>${currentVersion.name}</strong> - Released ${currentVersion.date}</p>`;

            if (currentVersion.highlights && currentVersion.highlights.length > 0) {
                html += '<h3>✨ New Features</h3><ul>';
                currentVersion.highlights.forEach(item => {
                    html += `<li>${item}</li>`;
                });
                html += '</ul>';
            }

            if (currentVersion.bugfixes && currentVersion.bugfixes.length > 0) {
                html += '<h3>🐛 Bug Fixes</h3><ul>';
                currentVersion.bugfixes.forEach(item => {
                    html += `<li>${item}</li>`;
                });
                html += '</ul>';
            }

            if (currentVersion.breaking && currentVersion.breaking.length > 0) {
                html += '<h3>⚠️ Breaking Changes</h3><ul>';
                currentVersion.breaking.forEach(item => {
                    html += `<li>${item}</li>`;
                });
                html += '</ul>';
            }

            content.innerHTML = html;
        }

        modal.style.display = 'flex';
    }

    hideWhatsNew() {
        const modal = document.getElementById('whatsNewModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    showVersionHistory() {
        const modal = document.getElementById('versionHistoryModal');
        const content = document.getElementById('versionHistoryContent');

        if (!modal || !content) return;

        // Populate version history
        let html = '';

        // Get all versions except current
        const archivedVersions = APP_VERSION.history.slice(1); // Skip first (current) version

        archivedVersions.forEach(version => {
            html += `
                <div class="version-item">
                    <div class="version-item-header">
                        <div class="version-item-title">
                            v${version.version} - ${version.name}
                            <span class="archived-badge">ARCHIVED</span>
                        </div>
                    </div>
                    <div class="version-item-date">${version.date}</div>
                    <div class="version-item-description">
                        ${version.highlights && version.highlights.length > 0 ?
                            `<strong>Features:</strong> ${version.highlights[0]}` :
                            'Legacy version'}
                    </div>
                    <a href="versions/v${version.version}/index.html" class="version-item-link" target="_blank">
                        🚀 Open v${version.version}
                    </a>
                </div>
            `;
        });

        content.innerHTML = html;
        modal.style.display = 'flex';
    }

    hideVersionHistory() {
        const modal = document.getElementById('versionHistoryModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    handleVersionSwitch(value) {
        if (value === 'current') {
            // Already on current version, do nothing
            return;
        }

        // Navigate to archived version
        const targetUrl = `versions/v${value}/index.html`;

        // Confirm navigation
        if (confirm(`Switch to version ${value}? This will open the archived version in a new tab.`)) {
            window.open(targetUrl, '_blank');

            // Reset dropdown to current
            const versionSwitcher = document.getElementById('versionSwitcher');
            if (versionSwitcher) {
                versionSwitcher.value = 'current';
            }
        } else {
            // Reset dropdown to current if user cancels
            const versionSwitcher = document.getElementById('versionSwitcher');
            if (versionSwitcher) {
                versionSwitcher.value = 'current';
            }
        }
    }

    checkVersionUpdate() {
        const updateCheck = APP_VERSION.checkForUpdates();

        if (updateCheck.hasUpdate) {
            console.log(`%c🎉 New version available: ${APP_VERSION.current}`, 'color: #27ae60; font-weight: bold;');

            // Show "What's New" automatically on first load after update
            setTimeout(() => {
                this.showWhatsNew();
            }, 1000);
        }
    }

    setupSwipeGestures() {
        const learningArea = document.getElementById('learningArea');
        if (!learningArea) return;

        learningArea.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
            this.touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        learningArea.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;
        const minSwipeDistance = 50;

        // Check if horizontal swipe is longer than vertical (to avoid conflicts with scrolling)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - go to previous card
                this.goToPreviousCard();
            } else {
                // Swipe left - go to next card
                if (this.reviewMode) {
                    // In review mode, just go to next card
                    this.currentIndex++;
                    this.showNextCard();
                } else {
                    // In normal mode, need to rate first
                    if (document.getElementById('answerSection').style.display === 'block') {
                        // Answer is shown, auto-rate as "Good" on swipe
                        this.rateCard(3);
                    }
                }
            }
        }
    }

    goToPreviousCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.showNextCard();
        }
    }

    updateModeButtons() {
        console.log('[updateModeButtons] Starting...');
        const modeSelector = document.getElementById('modeSelector');
        if (!modeSelector) {
            console.error('[updateModeButtons] modeSelector element not found!');
            return;
        }

        // Clear existing buttons
        modeSelector.innerHTML = '';

        // Get modes for current language
        console.log('[updateModeButtons] Current language:', this.currentLanguage);
        console.log('[updateModeButtons] languageConfig:', typeof languageConfig);
        const config = languageConfig[this.currentLanguage];
        if (!config || !config.modes) {
            console.error('[updateModeButtons] Config or modes not found!', config);
            return;
        }

        console.log('[updateModeButtons] Creating buttons for modes:', config.modes);
        // Create buttons for each mode
        config.modes.forEach(mode => {
            const btn = document.createElement('button');
            btn.className = 'mode-btn';
            btn.dataset.mode = mode;
            btn.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);

            btn.addEventListener('click', () => {
                this.selectMode(mode);
            });

            modeSelector.appendChild(btn);
        });
        console.log('[updateModeButtons] Created', config.modes.length, 'mode buttons');

        // Update category dropdown for categories
        this.updateCategoryDropdown();
    }

    updateCategoryDropdown() {
        const categorySelector = document.getElementById('categorySelector');
        const categoryDropdown = document.getElementById('categoryDropdown');

        if (!categorySelector || !categoryDropdown) return;

        const config = languageConfig[this.currentLanguage];

        // Clear existing options except "All"
        categoryDropdown.innerHTML = '<option value="">All</option>';

        // Check if language has categories
        if (config && config.categories) {
            // Show category selector
            categorySelector.style.display = 'flex';

            // Add category options
            Object.keys(config.categories).forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = config.categories[key];
                categoryDropdown.appendChild(option);
            });
        } else {
            // Hide category selector if no categories
            categorySelector.style.display = 'none';
        }
    }

    handleCategoryChange(category) {
        if (!category) {
            // Show all modes
            document.querySelectorAll('.mode-btn').forEach(btn => {
                btn.style.display = '';
            });
        } else {
            // Only show the selected category button
            document.querySelectorAll('.mode-btn').forEach(btn => {
                if (btn.dataset.mode === category) {
                    btn.style.display = '';
                } else {
                    btn.style.display = 'none';
                }
            });
        }
    }

    toggleReferenceChart() {
        const referenceChart = document.getElementById('referenceChart');
        const referenceBtn = document.getElementById('referenceBtn');
        const welcomeScreen = document.getElementById('welcomeScreen');
        const learningArea = document.getElementById('learningArea');
        const progressScreen = document.getElementById('progressScreen');

        if (referenceChart.style.display === 'block') {
            // Hide reference chart
            referenceChart.style.display = 'none';
            referenceBtn.classList.remove('active');

            // Show previous screen
            if (this.currentMode) {
                learningArea.style.display = 'block';
            } else {
                welcomeScreen.style.display = 'block';
            }
        } else {
            // Show reference chart
            this.showReferenceChart();
            referenceBtn.classList.add('active');

            // Hide progress button active state
            document.getElementById('progressBtn').classList.remove('active');
        }
    }

    toggleProgressScreen() {
        const progressScreen = document.getElementById('progressScreen');
        const progressBtn = document.getElementById('progressBtn');
        const welcomeScreen = document.getElementById('welcomeScreen');
        const learningArea = document.getElementById('learningArea');
        const referenceChart = document.getElementById('referenceChart');

        if (progressScreen.style.display === 'block') {
            // Hide progress screen
            progressScreen.style.display = 'none';
            progressBtn.classList.remove('active');

            // Show previous screen
            if (this.currentMode) {
                learningArea.style.display = 'block';
            } else {
                welcomeScreen.style.display = 'block';
            }
        } else {
            // Show progress screen
            this.showProgressScreen();
            progressBtn.classList.add('active');

            // Hide reference button active state
            document.getElementById('referenceBtn').classList.remove('active');
        }
    }

    selectLanguage(language) {
        // Remove active class from all language buttons
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to selected button
        const selectedBtn = document.querySelector(`[data-language="${language}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }

        this.currentLanguage = language;

        // Reload progress for this language
        this.loadProgress();

        // Update UI
        this.updateLanguageUI();
        this.updateModeButtons();
        this.updateStats();

        // Reset current mode if active
        if (this.currentMode) {
            document.getElementById('learningArea').style.display = 'none';
            document.getElementById('welcomeScreen').style.display = 'block';
            this.currentMode = null;
        }

        // Hide reference and progress screens
        document.getElementById('referenceChart').style.display = 'none';
        document.getElementById('progressScreen').style.display = 'none';
        document.getElementById('referenceBtn').classList.remove('active');
        document.getElementById('progressBtn').classList.remove('active');
    }

    updateLanguageUI() {
        const config = languageConfig[this.currentLanguage];
        if (config) {
            document.getElementById('appTitle').textContent = config.title;
            document.getElementById('appSubtitle').textContent = config.subtitle;

            // Update welcome screen title
            const languageName = this.currentLanguage.charAt(0).toUpperCase() + this.currentLanguage.slice(1);
            const welcomeTitle = document.getElementById('welcomeTitle');
            if (welcomeTitle) {
                welcomeTitle.textContent = `Welcome to ${languageName} Learning!`;
            }
        }
    }

    selectMode(mode) {
        // Remove active class from all buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to selected button
        const selectedBtn = document.querySelector(`[data-mode="${mode}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }

        this.currentMode = mode;
        const currentLangData = languageData[this.currentLanguage];

        // Get data for the selected mode
        this.currentData = currentLangData[mode] || [];

        // Get due cards or new cards
        this.sessionCards = this.getSessionCards();
        this.currentIndex = 0;

        // Show learning area, hide other screens
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('completionScreen').style.display = 'none';
        document.getElementById('referenceChart').style.display = 'none';
        document.getElementById('progressScreen').style.display = 'none';
        document.getElementById('learningArea').style.display = 'block';

        // Remove active states from quick action buttons
        document.getElementById('referenceBtn').classList.remove('active');
        document.getElementById('progressBtn').classList.remove('active');

        // Start the session
        this.showNextCard();
    }

    getSessionCards() {
        const cards = [];
        const now = Date.now();

        // Get cards that are due for review
        this.currentData.forEach((item, index) => {
            const cardId = `${this.currentLanguage}-${this.currentMode}-${index}`;
            const cardData = this.progress[cardId];

            if (!cardData) {
                // New card
                if (cards.length < 10) {
                    cards.push({
                        ...item,
                        id: cardId,
                        isNew: true
                    });
                }
            } else if (cardData.nextReview <= now) {
                // Due for review
                cards.push({
                    ...item,
                    id: cardId,
                    isNew: false,
                    ...cardData
                });
            }
        });

        // If no cards available, add some new ones
        if (cards.length === 0) {
            for (let i = 0; i < Math.min(10, this.currentData.length); i++) {
                const item = this.currentData[i];
                const cardId = `${this.currentLanguage}-${this.currentMode}-${i}`;
                if (!this.progress[cardId]) {
                    cards.push({
                        ...item,
                        id: cardId,
                        isNew: true
                    });
                }
            }
        }

        // Sort by frequency (lower frequency number = more common)
        return cards.sort((a, b) => a.frequency - b.frequency);
    }

    showNextCard() {
        if (this.currentIndex >= this.sessionCards.length) {
            this.showCompletion();
            return;
        }

        this.currentCard = this.sessionCards[this.currentIndex];

        // Update character display with individual character hover
        const charDisplay = document.getElementById('characterDisplay');
        charDisplay.innerHTML = ''; // Clear previous content
        charDisplay.style.cursor = 'pointer';

        // Add click handler to character display to show answer
        charDisplay.onclick = () => {
            if (document.getElementById('showAnswerBtn').style.display === 'block') {
                this.showAnswer();
            }
        };

        // For words and sentences, create hoverable individual characters
        if (this.currentMode === 'words' || this.currentMode === 'sentences') {
            const chars = this.currentCard.char.split('');
            chars.forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'hoverable-char';
                const romaji = charToRomaji[char] || char;
                span.setAttribute('data-char-romaji', romaji);
                charDisplay.appendChild(span);
            });
        } else {
            // For single characters (hiragana, katakana, kanji), show normally
            charDisplay.textContent = this.currentCard.char;
            charDisplay.setAttribute('data-romaji', this.currentCard.romaji);
        }

        document.getElementById('hint').style.display = 'none';
        document.getElementById('answerSection').style.display = 'none';
        document.getElementById('showAnswerBtn').style.display = 'block';

        // Track start time for automatic difficulty rating
        this.cardStartTime = Date.now();

        // Update progress bar
        const progress = (this.currentIndex / this.sessionCards.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressText').textContent =
            `${this.currentIndex} / ${this.sessionCards.length}`;

        // In review mode, automatically show the answer
        if (this.reviewMode) {
            setTimeout(() => {
                this.showAnswer();
            }, 100);
        }
    }

    showAnswer() {
        // Clear any existing auto-advance timeout
        if (this.autoAdvanceTimeout) {
            clearTimeout(this.autoAdvanceTimeout);
            this.autoAdvanceTimeout = null;
        }

        document.getElementById('showAnswerBtn').style.display = 'none';
        document.getElementById('answerSection').style.display = 'block';

        // Display answer information
        document.getElementById('romaji').textContent = this.currentCard.romaji;
        document.getElementById('meaning').textContent = this.currentCard.meaning;

        if (this.currentCard.example) {
            document.getElementById('example').textContent = this.currentCard.example;
            document.getElementById('example').style.display = 'block';
        } else {
            document.getElementById('example').style.display = 'none';
        }

        // Calculate response time for automatic difficulty rating
        const responseTime = this.cardStartTime ? (Date.now() - this.cardStartTime) / 1000 : 0;

        if (this.reviewMode) {
            // In review mode, hide rating buttons
            document.querySelectorAll('.rating-btn').forEach(btn => {
                btn.style.display = 'none';
            });
        } else {
            // Show rating buttons
            document.querySelectorAll('.rating-btn').forEach(btn => {
                btn.style.display = '';
                btn.classList.remove('auto-selected');
            });

            // Automatically rate based on response time
            let rating;
            let selectedBtn;
            if (responseTime < 3) {
                rating = 5; // Easy - fast response
                selectedBtn = document.querySelector('[data-rating="5"]');
            } else if (responseTime < 8) {
                rating = 3; // Good - moderate response
                selectedBtn = document.querySelector('[data-rating="3"]');
            } else {
                rating = 1; // Hard - slow response
                selectedBtn = document.querySelector('[data-rating="1"]');
            }

            // Highlight the auto-selected button
            if (selectedBtn) {
                selectedBtn.classList.add('auto-selected');
            }

            // Show answer briefly, then auto-advance
            this.autoAdvanceTimeout = setTimeout(() => {
                this.rateCard(rating);
            }, 2000); // Show answer for 2 seconds before advancing
        }
    }

    rateCard(rating) {
        // Clear auto-advance timeout if user manually clicked
        if (this.autoAdvanceTimeout) {
            clearTimeout(this.autoAdvanceTimeout);
            this.autoAdvanceTimeout = null;
        }

        // Calculate study time for this card
        const studyTime = this.cardStartTime ? (Date.now() - this.cardStartTime) / 1000 : 0;

        // Update card using SM-2 algorithm
        const cardId = this.currentCard.id;
        const cardData = this.progress[cardId] || {
            easeFactor: 2.5,
            interval: 1,
            repetitions: 0,
            nextReview: Date.now(),
            mistakes: 0,
            studyTime: 0
        };

        // SM-2 Algorithm
        let { easeFactor, interval, repetitions, mistakes, studyTime: totalStudyTime } = cardData;

        if (rating >= 3) {
            // Correct response
            if (repetitions === 0) {
                interval = 1;
            } else if (repetitions === 1) {
                interval = 6;
            } else {
                interval = Math.round(interval * easeFactor);
            }
            repetitions += 1;
        } else {
            // Incorrect response
            mistakes = (mistakes || 0) + 1;
            repetitions = 0;
            interval = 1;
        }

        // Update ease factor
        easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
        easeFactor = Math.max(1.3, easeFactor); // Minimum ease factor

        // Calculate next review time
        const nextReview = Date.now() + (interval * 24 * 60 * 60 * 1000);

        // Save progress
        this.progress[cardId] = {
            easeFactor,
            interval,
            repetitions,
            nextReview,
            lastReview: Date.now(),
            mistakes,
            studyTime: (totalStudyTime || 0) + studyTime
        };

        this.saveProgress();
        this.updateStats();

        // Move to next card
        this.currentIndex++;
        this.showNextCard();
    }

    showCompletion() {
        document.getElementById('learningArea').style.display = 'none';
        document.getElementById('completionScreen').style.display = 'block';

        const message = `Great job! You reviewed ${this.sessionCards.length} ${this.currentMode} cards. Keep up the good work!`;
        document.getElementById('completionMessage').textContent = message;

        this.updateStats();
    }

    loadProgress() {
        const storageKey = `${this.STORAGE_KEY_BASE}_${this.currentLanguage}`;
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            const data = JSON.parse(saved);
            this.progress = data.progress || {};
            this.streak = data.streak || 0;
            this.lastStudyDate = data.lastStudyDate || null;
        } else {
            this.progress = {};
            this.streak = 0;
            this.lastStudyDate = null;
        }

        // Update streak
        this.updateStreak();
    }

    saveProgress() {
        const storageKey = `${this.STORAGE_KEY_BASE}_${this.currentLanguage}`;
        const data = {
            progress: this.progress,
            streak: this.streak,
            lastStudyDate: this.lastStudyDate
        };
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastDate = this.lastStudyDate ? new Date(this.lastStudyDate).toDateString() : null;

        if (lastDate !== today) {
            if (lastDate === new Date(Date.now() - 86400000).toDateString()) {
                // Studied yesterday, increment streak
                this.streak++;
            } else if (lastDate !== today) {
                // Missed a day, reset streak
                this.streak = 1;
            }
            this.lastStudyDate = Date.now();
            this.saveProgress();
        }
    }

    updateStats() {
        // Count learned cards (cards with repetitions > 0)
        let learnedCount = 0;
        let reviewCount = 0;
        const now = Date.now();

        Object.keys(this.progress).forEach(key => {
            const card = this.progress[key];
            if (card.repetitions > 0) {
                learnedCount++;
            }
            if (card.nextReview <= now) {
                reviewCount++;
            }
        });

        document.getElementById('learnedCount').textContent = learnedCount;
        document.getElementById('reviewCount').textContent = reviewCount;
        document.getElementById('streakCount').textContent = this.streak;
    }

    showReferenceChart() {
        // Determine which data to show
        let title = 'Reference Chart';

        if (this.currentMode) {
            title = `${this.currentMode.charAt(0).toUpperCase() + this.currentMode.slice(1)} Reference Chart`;
        } else {
            title = 'Choose a learning mode to see its reference chart';
        }

        // Update title
        document.getElementById('chartTitle').textContent = title;

        // Clear previous chart
        const chartGrid = document.getElementById('chartGrid');
        chartGrid.innerHTML = '';

        const currentLangData = languageData[this.currentLanguage];

        // Different layouts based on language and mode
        if (this.currentLanguage === 'japanese' && (this.currentMode === 'hiragana' || this.currentMode === 'katakana')) {
            // Show kana chart for hiragana or katakana
            this.renderKanaChart(chartGrid, this.currentMode);
        } else if (this.currentLanguage === 'french' && this.currentMode === 'alphabet') {
            // Show French alphabet chart
            this.renderFrenchAlphabetChart(chartGrid);
        } else if (this.currentLanguage === 'gujarati' && (this.currentMode === 'vowels' || this.currentMode === 'consonants')) {
            // Show Gujarati vowels or consonants chart
            this.renderGujaratiChart(chartGrid, this.currentMode);
        } else {
            // For all other modes, use list chart
            this.renderListChart(chartGrid);
        }

        // Hide other screens, show chart
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('learningArea').style.display = 'none';
        document.getElementById('completionScreen').style.display = 'none';
        document.getElementById('referenceChart').style.display = 'block';
    }

    renderKanaChart(container, mode) {
        // Traditional kana chart layout
        const kanaChart = mode === 'hiragana' ? [
            ['あ', 'い', 'う', 'え', 'お'],
            ['か', 'き', 'く', 'け', 'こ'],
            ['さ', 'し', 'す', 'せ', 'そ'],
            ['た', 'ち', 'つ', 'て', 'と'],
            ['な', 'に', 'ぬ', 'ね', 'の'],
            ['は', 'ひ', 'ふ', 'へ', 'ほ'],
            ['ま', 'み', 'む', 'め', 'も'],
            ['や', '', 'ゆ', '', 'よ'],
            ['ら', 'り', 'る', 'れ', 'ろ'],
            ['わ', '', '', '', 'を'],
            ['ん', '', '', '', '']
        ] : [
            ['ア', 'イ', 'ウ', 'エ', 'オ'],
            ['カ', 'キ', 'ク', 'ケ', 'コ'],
            ['サ', 'シ', 'ス', 'セ', 'ソ'],
            ['タ', 'チ', 'ツ', 'テ', 'ト'],
            ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
            ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
            ['マ', 'ミ', 'ム', 'メ', 'モ'],
            ['ヤ', '', 'ユ', '', 'ヨ'],
            ['ラ', 'リ', 'ル', 'レ', 'ロ'],
            ['ワ', '', '', '', 'ヲ'],
            ['ン', '', '', '', '']
        ];

        // Add vowel headers
        const headerRow = document.createElement('div');
        headerRow.className = 'chart-header-row';
        ['', 'A', 'I', 'U', 'E', 'O'].forEach(vowel => {
            const header = document.createElement('div');
            header.className = 'chart-header';
            header.textContent = vowel;
            headerRow.appendChild(header);
        });
        container.appendChild(headerRow);

        // Add consonant rows
        const consonants = ['', 'K', 'S', 'T', 'N', 'H', 'M', 'Y', 'R', 'W', 'N'];
        kanaChart.forEach((row, index) => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'chart-row';

            // Add consonant label
            const consonantLabel = document.createElement('div');
            consonantLabel.className = 'chart-consonant';
            consonantLabel.textContent = consonants[index];
            rowDiv.appendChild(consonantLabel);

            row.forEach(char => {
                const cell = document.createElement('div');
                cell.className = 'chart-cell';
                if (char) {
                    const charDiv = document.createElement('div');
                    charDiv.className = 'chart-character';
                    charDiv.textContent = char;

                    const romajiDiv = document.createElement('div');
                    romajiDiv.className = 'chart-romaji';
                    romajiDiv.textContent = charToRomaji[char] || '';

                    cell.appendChild(charDiv);
                    cell.appendChild(romajiDiv);
                }
                rowDiv.appendChild(cell);
            });
            container.appendChild(rowDiv);
        });
    }

    renderFrenchAlphabetChart(container) {
        const currentLangData = languageData[this.currentLanguage];
        const alphabetData = currentLangData.alphabet || [];

        // Create a grid layout for French alphabet
        // Split into basic letters and accented characters
        const basicLetters = alphabetData.filter(item => item.char.length === 1 && item.char.match(/[a-z]/i));
        const accentedChars = alphabetData.filter(item => !item.char.match(/^[a-z]$/i));

        // Basic alphabet section
        if (basicLetters.length > 0) {
            const basicSection = document.createElement('div');
            basicSection.innerHTML = '<h3 style="color: #667eea; margin: 20px 0;">Basic Alphabet</h3>';
            container.appendChild(basicSection);

            const gridContainer = document.createElement('div');
            gridContainer.style.display = 'grid';
            gridContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(80px, 1fr))';
            gridContainer.style.gap = '15px';
            gridContainer.style.marginBottom = '30px';

            basicLetters.forEach(item => {
                const cell = document.createElement('div');
                cell.className = 'chart-cell';
                cell.style.textAlign = 'center';
                cell.style.padding = '15px';
                cell.style.background = 'white';
                cell.style.borderRadius = '10px';
                cell.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';

                const charDiv = document.createElement('div');
                charDiv.className = 'chart-character';
                charDiv.style.fontSize = '2em';
                charDiv.style.fontWeight = 'bold';
                charDiv.style.color = '#667eea';
                charDiv.textContent = item.char.toUpperCase() + ' ' + item.char.toLowerCase();

                const romajiDiv = document.createElement('div');
                romajiDiv.className = 'chart-romaji';
                romajiDiv.style.fontSize = '0.9em';
                romajiDiv.style.color = '#888';
                romajiDiv.style.marginTop = '5px';
                romajiDiv.textContent = item.romaji;

                cell.appendChild(charDiv);
                cell.appendChild(romajiDiv);
                gridContainer.appendChild(cell);
            });

            container.appendChild(gridContainer);
        }

        // Accented characters section
        if (accentedChars.length > 0) {
            const accentSection = document.createElement('div');
            accentSection.innerHTML = '<h3 style="color: #667eea; margin: 20px 0;">Accented Characters</h3>';
            container.appendChild(accentSection);

            const gridContainer = document.createElement('div');
            gridContainer.style.display = 'grid';
            gridContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(80px, 1fr))';
            gridContainer.style.gap = '15px';

            accentedChars.forEach(item => {
                const cell = document.createElement('div');
                cell.className = 'chart-cell';
                cell.style.textAlign = 'center';
                cell.style.padding = '15px';
                cell.style.background = 'white';
                cell.style.borderRadius = '10px';
                cell.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';

                const charDiv = document.createElement('div');
                charDiv.className = 'chart-character';
                charDiv.style.fontSize = '2em';
                charDiv.style.fontWeight = 'bold';
                charDiv.style.color = '#667eea';
                charDiv.textContent = item.char;

                const romajiDiv = document.createElement('div');
                romajiDiv.className = 'chart-romaji';
                romajiDiv.style.fontSize = '0.9em';
                romajiDiv.style.color = '#888';
                romajiDiv.style.marginTop = '5px';
                romajiDiv.textContent = item.romaji;

                cell.appendChild(charDiv);
                cell.appendChild(romajiDiv);
                gridContainer.appendChild(cell);
            });

            container.appendChild(gridContainer);
        }
    }

    renderGujaratiChart(container, mode) {
        const currentLangData = languageData[this.currentLanguage];
        const chartData = currentLangData[mode] || [];

        // Create a grid layout for Gujarati vowels or consonants
        const gridContainer = document.createElement('div');
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = mode === 'vowels'
            ? 'repeat(auto-fill, minmax(100px, 1fr))'
            : 'repeat(auto-fill, minmax(90px, 1fr))';
        gridContainer.style.gap = '15px';
        gridContainer.style.marginBottom = '20px';

        chartData.forEach(item => {
            const cell = document.createElement('div');
            cell.className = 'chart-cell';
            cell.style.textAlign = 'center';
            cell.style.padding = '15px';
            cell.style.background = 'white';
            cell.style.borderRadius = '10px';
            cell.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';

            const charDiv = document.createElement('div');
            charDiv.className = 'chart-character';
            charDiv.style.fontSize = '2.5em';
            charDiv.style.fontWeight = 'bold';
            charDiv.style.color = '#667eea';
            charDiv.textContent = item.char;

            const romajiDiv = document.createElement('div');
            romajiDiv.className = 'chart-romaji';
            romajiDiv.style.fontSize = '0.9em';
            romajiDiv.style.color = '#888';
            romajiDiv.style.marginTop = '8px';
            romajiDiv.textContent = item.romaji;

            const meaningDiv = document.createElement('div');
            meaningDiv.style.fontSize = '0.75em';
            meaningDiv.style.color = '#aaa';
            meaningDiv.style.marginTop = '4px';
            meaningDiv.textContent = item.meaning;

            cell.appendChild(charDiv);
            cell.appendChild(romajiDiv);
            cell.appendChild(meaningDiv);
            gridContainer.appendChild(cell);
        });

        container.appendChild(gridContainer);
    }

    renderListChart(container) {
        const currentLangData = languageData[this.currentLanguage];
        const chartData = currentLangData[this.currentMode] || [];

        chartData.forEach(item => {
            const chartItem = document.createElement('div');
            chartItem.className = 'chart-list-item';

            const character = document.createElement('div');
            character.className = 'chart-list-character';
            character.textContent = item.char;

            const details = document.createElement('div');
            details.className = 'chart-list-details';

            const romaji = document.createElement('div');
            romaji.className = 'chart-list-romaji';
            romaji.textContent = item.romaji;

            const meaning = document.createElement('div');
            meaning.className = 'chart-list-meaning';
            meaning.textContent = item.meaning;

            details.appendChild(romaji);
            details.appendChild(meaning);

            chartItem.appendChild(character);
            chartItem.appendChild(details);

            container.appendChild(chartItem);
        });
    }

    closeReferenceChart() {
        document.getElementById('referenceChart').style.display = 'none';

        // Show appropriate screen based on state
        if (this.currentMode && this.sessionCards.length > 0 && this.currentIndex < this.sessionCards.length) {
            document.getElementById('learningArea').style.display = 'block';
        } else if (this.currentMode && this.currentIndex >= this.sessionCards.length) {
            document.getElementById('completionScreen').style.display = 'block';
        } else {
            document.getElementById('welcomeScreen').style.display = 'block';
        }
    }

    showProgressScreen() {
        const now = Date.now();

        // Calculate total learned
        let totalLearned = 0;
        let totalStudyTime = 0;
        const currentLangData = languageData[this.currentLanguage];

        // Create mode stats dynamically based on current language
        const modeStats = {};
        const config = languageConfig[this.currentLanguage];

        // Initialize stats for all modes in current language
        if (config && config.modes) {
            config.modes.forEach(mode => {
                if (currentLangData[mode]) {
                    modeStats[mode] = {
                        learned: 0,
                        total: currentLangData[mode].length
                    };
                }
            });
        }

        const upcomingCards = [];
        const mistakeCards = [];

        Object.keys(this.progress).forEach(key => {
            const card = this.progress[key];
            // key format: language-mode-index
            const parts = key.split('-');
            if (parts.length < 3) return; // Skip old format keys

            const [lang, mode, index] = parts;
            if (lang !== this.currentLanguage) return; // Skip other languages

            if (card.repetitions > 0) {
                totalLearned++;
                if (modeStats[mode]) {
                    modeStats[mode].learned++;
                }
            }

            if (card.studyTime) {
                totalStudyTime += card.studyTime;
            }

            // Cards due soon
            if (card.nextReview && card.nextReview <= now + 24 * 60 * 60 * 1000) {
                const modeData = currentLangData[mode];
                if (modeData && modeData[parseInt(index)]) {
                    upcomingCards.push({
                        ...modeData[parseInt(index)],
                        mode,
                        nextReview: card.nextReview
                    });
                }
            }

            // Cards with mistakes (low repetitions or short intervals)
            if (card.repetitions < 3 && card.lastReview) {
                const modeData = currentLangData[mode];
                if (modeData && modeData[parseInt(index)]) {
                    mistakeCards.push({
                        ...modeData[parseInt(index)],
                        mode,
                        mistakes: card.mistakes || 0
                    });
                }
            }
        });

        // Update progress summary
        document.getElementById('progressTotalLearned').textContent = totalLearned;
        document.getElementById('progressStreak').textContent = `${this.streak} days`;
        document.getElementById('progressStudyTime').textContent = `${Math.round(totalStudyTime / 60)} min`;

        // Populate mode progress
        const modesList = document.getElementById('progressModesList');
        modesList.innerHTML = '';
        Object.keys(modeStats).forEach(mode => {
            const stats = modeStats[mode];
            const percentage = stats.total > 0 ? (stats.learned / stats.total * 100) : 0;

            const modeItem = document.createElement('div');
            modeItem.className = 'progress-mode-item';
            modeItem.innerHTML = `
                <div>
                    <div class="progress-mode-name">${mode.charAt(0).toUpperCase() + mode.slice(1)}</div>
                    <div class="progress-mode-stats">${stats.learned} / ${stats.total} learned (${Math.round(percentage)}%)</div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
            modesList.appendChild(modeItem);
        });

        // Populate upcoming reviews
        const upcomingList = document.getElementById('progressUpcoming');
        upcomingList.innerHTML = '';
        const sortedUpcoming = upcomingCards.sort((a, b) => a.nextReview - b.nextReview).slice(0, 10);
        if (sortedUpcoming.length === 0) {
            upcomingList.innerHTML = '<p style="color: #888; text-align: center;">No cards due for review</p>';
        } else {
            sortedUpcoming.forEach(card => {
                const timeUntil = this.formatTimeUntil(card.nextReview - now);
                const upcomingItem = document.createElement('div');
                upcomingItem.className = 'progress-upcoming-item';
                upcomingItem.innerHTML = `
                    <div class="progress-upcoming-char">${card.char} - ${card.romaji}</div>
                    <div class="progress-upcoming-time">Due in ${timeUntil}</div>
                `;
                upcomingList.appendChild(upcomingItem);
            });
        }

        // Populate mistake cards
        const mistakesList = document.getElementById('progressMistakes');
        mistakesList.innerHTML = '';
        const sortedMistakes = mistakeCards.sort((a, b) => (b.mistakes || 0) - (a.mistakes || 0)).slice(0, 10);
        if (sortedMistakes.length === 0) {
            mistakesList.innerHTML = '<p style="color: #888; text-align: center;">No cards needing practice</p>';
        } else {
            sortedMistakes.forEach(card => {
                const mistakeItem = document.createElement('div');
                mistakeItem.className = 'progress-mistake-item';
                mistakeItem.innerHTML = `
                    <div class="progress-mistake-char">${card.char} - ${card.romaji}</div>
                    <div class="progress-mistake-count">${card.mistakes || 0} mistakes</div>
                `;
                mistakesList.appendChild(mistakeItem);
            });
        }

        // Hide other screens, show progress
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('learningArea').style.display = 'none';
        document.getElementById('completionScreen').style.display = 'none';
        document.getElementById('referenceChart').style.display = 'none';
        document.getElementById('progressScreen').style.display = 'block';
    }

    closeProgressScreen() {
        document.getElementById('progressScreen').style.display = 'none';

        // Show appropriate screen based on state
        if (this.currentMode && this.sessionCards.length > 0 && this.currentIndex < this.sessionCards.length) {
            document.getElementById('learningArea').style.display = 'block';
        } else if (this.currentMode && this.currentIndex >= this.sessionCards.length) {
            document.getElementById('completionScreen').style.display = 'block';
        } else {
            document.getElementById('welcomeScreen').style.display = 'block';
        }
    }

    formatTimeUntil(ms) {
        if (ms < 0) return 'now';
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        if (days > 0) return `${days} day${days !== 1 ? 's' : ''}`;
        if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''}`;
        const minutes = Math.floor(ms / (1000 * 60));
        return `${minutes} min`;
    }

    // Theme Management
    applyTheme(theme) {
        const body = document.body;
        const paulNobleThemeLink = document.getElementById('paulNobleTheme');

        if (theme === 'paul-noble') {
            // Enable Paul Noble theme
            body.classList.add('paul-noble-theme');
            if (paulNobleThemeLink) {
                paulNobleThemeLink.disabled = false;
            }
            console.log('🎨 Paul Noble theme enabled');
        } else {
            // Use default theme
            body.classList.remove('paul-noble-theme');
            if (paulNobleThemeLink) {
                paulNobleThemeLink.disabled = true;
            }
            console.log('🎨 Default theme enabled');
        }

        this.currentTheme = theme;
    }

    switchTheme(theme) {
        // Save theme preference
        localStorage.setItem('appTheme', theme);

        // Apply the theme
        this.applyTheme(theme);

        console.log(`%c✨ Theme switched to: ${theme}`, 'color: #667eea; font-weight: bold;');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const jsStatus = document.getElementById('jsStatus');
    try {
        // Check if required data is available
        if (typeof languageConfig === 'undefined') {
            throw new Error('languageConfig is not defined');
        }
        if (typeof languageData === 'undefined') {
            throw new Error('languageData is not defined');
        }
        if (typeof japaneseData === 'undefined') {
            throw new Error('japaneseData is not defined');
        }
        if (typeof frenchData === 'undefined') {
            throw new Error('frenchData is not defined');
        }
        if (typeof gujaratiData === 'undefined') {
            throw new Error('gujaratiData is not defined');
        }

        window.app = new SpacedRepetitionApp();
    } catch (error) {
        console.error('Failed to initialize app:', error);
        if (jsStatus) {
            jsStatus.textContent = 'Error: ' + error.message;
            jsStatus.style.color = '#f44336';
        }
    }
});
