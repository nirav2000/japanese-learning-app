// Multi-Language Learning Data
// Frequency-based data for spaced repetition learning

// Language configurations
const languageConfig = {
    japanese: {
        title: 'Japanese Learning App',
        subtitle: 'Master Hiragana, Katakana & Kanji with Spaced Repetition',
        modes: ['hiragana', 'katakana', 'kanji', 'numbers', 'colors', 'words', 'sentences'],
        categories: {
            'numbers': 'Numbers',
            'colors': 'Colors'
        }
    },
    french: {
        title: 'French Learning App',
        subtitle: 'Master French Alphabet & Vocabulary with Spaced Repetition',
        modes: ['alphabet', 'numbers', 'colors', 'words', 'sentences'],
        categories: {
            'numbers': 'Numbers (Nombres)',
            'colors': 'Colors (Couleurs)'
        }
    },
    gujarati: {
        title: 'Gujarati Learning App',
        subtitle: 'Master Gujarati Script & Vocabulary with Spaced Repetition',
        modes: ['vowels', 'consonants', 'numbers', 'colors', 'words', 'sentences'],
        categories: {
            'numbers': 'Numbers',
            'colors': 'Colors'
        }
    }
};

// Character to pronunciation mapping for hover tooltips
const charToRomaji = {
    // Hiragana
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'だ': 'da', 'ぢ': 'dji', 'づ': 'dzu', 'で': 'de', 'ど': 'do',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'ゐ': 'wi', 'ゑ': 'we', 'を': 'wo', 'ん': 'n',
    // Katakana
    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
    'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
    'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
    'ダ': 'da', 'ヂ': 'dji', 'ヅ': 'dzu', 'デ': 'de', 'ド': 'do',
    'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
    'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
    'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
    'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
    'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
    'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
    'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
    'ワ': 'wa', 'ヰ': 'wi', 'ヱ': 'we', 'ヲ': 'wo', 'ン': 'n',
    // Punctuation and particles
    '？': '?', '！': '!', '、': ',', '。': '.',

    // French alphabet
    'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j',
    'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't',
    'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z',
    'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J',
    'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T',
    'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z',
    'é': 'é', 'è': 'è', 'ê': 'ê', 'ë': 'ë', 'à': 'à', 'â': 'â', 'ù': 'ù', 'û': 'û',
    'ô': 'ô', 'î': 'î', 'ï': 'ï', 'ç': 'ç', 'œ': 'œ', 'æ': 'æ', 'ÿ': 'ÿ',

    // Gujarati vowels
    'અ': 'a', 'આ': 'ā', 'ઇ': 'i', 'ઈ': 'ī', 'ઉ': 'u', 'ઊ': 'ū', 'ઋ': 'ṛ',
    'એ': 'e', 'ઐ': 'ai', 'ઓ': 'o', 'ઔ': 'au',
    // Gujarati consonants
    'ક': 'ka', 'ખ': 'kha', 'ગ': 'ga', 'ઘ': 'gha', 'ઙ': 'ṅa',
    'ચ': 'ca', 'છ': 'cha', 'જ': 'ja', 'ઝ': 'jha', 'ઞ': 'ña',
    'ટ': 'ṭa', 'ઠ': 'ṭha', 'ડ': 'ḍa', 'ઢ': 'ḍha', 'ણ': 'ṇa',
    'ત': 'ta', 'થ': 'tha', 'દ': 'da', 'ધ': 'dha', 'ન': 'na',
    'પ': 'pa', 'ફ': 'pha', 'બ': 'ba', 'ભ': 'bha', 'મ': 'ma',
    'ય': 'ya', 'ર': 'ra', 'લ': 'la', 'વ': 'va',
    'શ': 'śa', 'ષ': 'ṣa', 'સ': 'sa', 'હ': 'ha', 'ળ': 'ḷa', 'ક્ષ': 'kṣa', 'જ્ઞ': 'jña',

    // Common kanji
    '人': 'hito', '日': 'hi/nichi', '一': 'ichi', '国': 'kuni',
    '会': 'kai', '年': 'nen', '大': 'dai', '十': 'juu',
    '二': 'ni', '本': 'hon', '中': 'naka', '長': 'nagai',
    '出': 'de', '三': 'san', '時': 'ji/toki', '行': 'i(ku)',
    '見': 'mi(ru)', '月': 'tsuki', '分': 'wa(karu)', '後': 'ato',
    '前': 'mae', '生': 'i(kiru)', '五': 'go', '間': 'kan',
    '上': 'ue', '東': 'higashi', '四': 'yon', '今': 'ima',
    '金': 'kane', '九': 'kyuu', '入': 'iru', '学': 'gaku',
    '高': 'takai', '円': 'en', '子': 'ko', '外': 'soto',
    '八': 'hachi', '六': 'roku', '下': 'shita', '来': 'ku(ru)',
    '気': 'ki', '小': 'chiisai', '七': 'nana', '山': 'yama',
    '話': 'hana(su)', '女': 'onna', '北': 'kita', '午': 'go',
    '百': 'hyaku', '書': 'ka(ku)', '語': 'go', '読': 'yo(mu)',
    '聞': 'ki(ku)', '強': 'benkyo', '事': 'koto', '校': 'kou',
    '先': 'sen', '私': 'watashi', '元': 'gen', '何': 'nani',
    '度': 'do', '願': 'nega(i)', '腹': 'hara', '空': 'a(ku)',
    '勉': 'ben', '仕': 'shi', '天': 'ten', '食': 'ta(beru)',
    '飲': 'no(mu)', '聞': 'ki(ku)', 'お': 'o', 'は': 'wa', 'が': 'ga',
    'を': 'wo', 'に': 'ni', 'で': 'de', 'か': 'ka', 'ね': 'ne',
    'よ': 'yo', 'す': 'su', 'ま': 'ma'
};

// Unified data structure
const languageData = {
    japanese: japaneseData,
    french: frenchData,
    gujarati: gujaratiData
};
