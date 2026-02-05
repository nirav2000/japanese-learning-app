// Paul Noble Chapter Data
// Populate this file with content from your "Unlocking Japanese" book

const paulNobleChapters = {
    bookInfo: {
        title: "Unlocking Japanese with Paul Noble",
        subtitle: "Step by Step",
        author: "Paul Noble",
        method: "No memorization required - build your knowledge step by step"
    },

    chapters: [
        {
            number: 1,
            title: "Getting Started",
            description: "Your first steps in Japanese - building the foundations",
            icon: "🏯",
            rules: [
                {
                    number: 1,
                    text: "Don't skip anything!",
                    explanation: "Each part builds on what came before. If you skip sections, you will end up confused and lost!"
                }
            ],
            vocabulary: [
                // Add your vocabulary from Chapter 1 here
                // Example format:
                // {
                //     char: "こんにちは",
                //     romaji: "konnichiwa",
                //     meaning: "hello",
                //     frequency: 1,
                //     example: "Basic greeting",
                //     category: "greeting",
                //     buildingBlock: "Your first word in Japanese!"
                // }
            ],
            sentences: [
                // Add sentences from Chapter 1 here
            ]
        },
        {
            number: 2,
            title: "Chapter 2 Title",
            description: "What you'll learn...",
            icon: "📖",
            rules: [],
            vocabulary: [],
            sentences: []
        },
        {
            number: 3,
            title: "I made a hotel reservation online last night - we're going to go to Kyoto!",
            description: "Making plans and talking about the future",
            icon: "🏨",
            rules: [],
            vocabulary: [
                // Example from the book page shown:
                // {
                //     char: "ホテル",
                //     romaji: "hoteru",
                //     meaning: "hotel",
                //     frequency: 1,
                //     example: "ホテルの予約 (hotel reservation)",
                //     category: "travel"
                // }
            ],
            sentences: []
        }
        // Add more chapters as you work through the book
    ],

    // Helper function to get all vocabulary from a chapter
    getChapterVocab(chapterNumber) {
        const chapter = this.chapters.find(ch => ch.number === chapterNumber);
        return chapter ? chapter.vocabulary : [];
    },

    // Helper function to get all sentences from a chapter
    getChapterSentences(chapterNumber) {
        const chapter = this.chapters.find(ch => ch.number === chapterNumber);
        return chapter ? chapter.sentences : [];
    },

    // Get combined content for learning
    getChapterContent(chapterNumber) {
        const chapter = this.chapters.find(ch => ch.number === chapterNumber);
        if (!chapter) return [];

        // Combine vocabulary and sentences, maintaining order by frequency
        const combined = [...chapter.vocabulary, ...chapter.sentences];
        return combined.sort((a, b) => a.frequency - b.frequency);
    },

    // Get all chapter titles for navigation
    getChapterList() {
        return this.chapters.map(ch => ({
            number: ch.number,
            title: ch.title,
            icon: ch.icon
        }));
    }
};

// Convert Paul Noble chapters to app format
const paulNobleData = {
    // Each chapter becomes a mode
    chapters: paulNobleChapters.chapters.reduce((acc, chapter) => {
        const modeName = `chapter${chapter.number}`;
        acc[modeName] = paulNobleChapters.getChapterContent(chapter.number);
        return acc;
    }, {})
};
