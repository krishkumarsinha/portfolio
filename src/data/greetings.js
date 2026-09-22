/**
 * Top 50 most spoken languages in the world (by total speakers: native + second language)
 * with authentic native language script, Romanized pronunciation, and script font families.
 */

/**
 * Lazy font loading via FontFace API.
 * Non-Latin Noto fonts are loaded on-demand when the greeting rotation
 * first needs them, instead of blocking initial page load (~400KB+ saved).
 */
const NOTO_FONT_URLS = {
  devanagari: 'Noto+Sans+Devanagari',
  chinese: 'Noto+Sans+SC',
  japanese: 'Noto+Sans+JP',
  korean: 'Noto+Sans+KR',
  arabic: 'Noto+Sans+Arabic',
  bengali: 'Noto+Sans+Bengali',
  thai: 'Noto+Sans+Thai',
  tamil: 'Noto+Sans+Tamil',
  telugu: 'Noto+Sans+Telugu',
  kannada: 'Noto+Sans+Kannada',
  gujarati: 'Noto+Sans+Gujarati',
  malayalam: 'Noto+Sans+Malayalam',
  gurmukhi: 'Noto+Sans+Gurmukhi',
  odia: 'Noto+Sans+Oriya',
  burmese: 'Noto+Sans+Myanmar',
  ethiopic: 'Noto+Sans+Ethiopic',
};

const loadedFonts = new Set();

export function preloadScriptFont(script) {
  if (script === 'latin' || script === 'cyrillic' || script === 'greek') return;
  if (loadedFonts.has(script)) return;

  const fontName = NOTO_FONT_URLS[script];
  if (!fontName) return;

  loadedFonts.add(script);

  // Inject a <link> for the Google Font asynchronously
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400;600;700&display=swap`;
  link.media = 'print'; // Load without blocking
  link.onload = () => { link.media = 'all'; };
  document.head.appendChild(link);
}

export const SCRIPT_FONTS = {
  latin: "'Montserrat', sans-serif",
  devanagari: "'Noto Sans Devanagari', 'Mangal', 'Nirmala UI', sans-serif",
  chinese: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  japanese: "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif",
  korean: "'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif",
  arabic: "'Noto Sans Arabic', 'Segoe UI', 'Geeza Pro', 'Tahoma', sans-serif",
  bengali: "'Noto Sans Bengali', 'Shonar Bangla', 'Vrinda', sans-serif",
  thai: "'Noto Sans Thai', 'Leelawadee', 'Thonburi', sans-serif",
  tamil: "'Noto Sans Tamil', 'Latha', 'Vijaya', sans-serif",
  telugu: "'Noto Sans Telugu', 'Gautami', sans-serif",
  kannada: "'Noto Sans Kannada', 'Tunga', sans-serif",
  gujarati: "'Noto Sans Gujarati', 'Shruti', sans-serif",
  malayalam: "'Noto Sans Malayalam', 'Kartika', sans-serif",
  gurmukhi: "'Noto Sans Gurmukhi', 'Raavi', sans-serif",
  odia: "'Noto Sans Oriya', 'Kalinga', sans-serif",
  burmese: "'Noto Sans Myanmar', 'Myanmar Text', sans-serif",
  ethiopic: "'Noto Sans Ethiopic', 'Nyala', sans-serif",
  cyrillic: "'Montserrat', 'Noto Sans', sans-serif",
  greek: "'Montserrat', 'Noto Sans', sans-serif",

};

export const GREETINGS = [
  { id: 1, language: 'English', text: 'Hello', romanized: 'Hello', script: 'latin', speakers: '1,456M' },
  { id: 2, language: 'Mandarin Chinese', text: '你好', romanized: 'Nǐ Hǎo', script: 'chinese', speakers: '1,138M' },
  { id: 3, language: 'Hindi', text: 'नमस्ते', romanized: 'Namaste', script: 'devanagari', speakers: '609M' },
  { id: 4, language: 'Spanish', text: '¡Hola!', romanized: 'Hola', script: 'latin', speakers: '559M' },
  { id: 5, language: 'French', text: 'Bonjour', romanized: 'Bonjour', script: 'latin', speakers: '310M' },
  { id: 6, language: 'Modern Standard Arabic', text: 'مَرْحَبَاً', romanized: 'Marhaban', script: 'arabic', speakers: '274M' },
  { id: 7, language: 'Bengali', text: 'নমস্কার', romanized: 'Nomoshkar', script: 'bengali', speakers: '273M' },
  { id: 8, language: 'Portuguese', text: 'Olá', romanized: 'Olá', script: 'latin', speakers: '264M' },
  { id: 9, language: 'Russian', text: 'Привет', romanized: 'Privet', script: 'cyrillic', speakers: '255M' },
  { id: 10, language: 'Urdu', text: 'آداب', romanized: 'Adaab', script: 'arabic', speakers: '231M' },
  { id: 11, language: 'Indonesian', text: 'Halo', romanized: 'Halo', script: 'latin', speakers: '199M' },
  { id: 12, language: 'German', text: 'Hallo', romanized: 'Hallo', script: 'latin', speakers: '133M' },
  { id: 13, language: 'Japanese', text: 'こんにちは', romanized: 'Konnichiwa', script: 'japanese', speakers: '125M' },
  { id: 14, language: 'Nigerian Pidgin', text: 'How far', romanized: 'How Far', script: 'latin', speakers: '121M' },
  { id: 15, language: 'Marathi', text: 'नमस्कार', romanized: 'Namaskar', script: 'devanagari', speakers: '99M' },
  { id: 16, language: 'Telugu', text: 'నమస్కారం', romanized: 'Namaskaram', script: 'telugu', speakers: '96M' },
  { id: 17, language: 'Turkish', text: 'Merhaba', romanized: 'Merhaba', script: 'latin', speakers: '90M' },
  { id: 18, language: 'Tamil', text: 'வணக்கம்', romanized: 'Vanakkam', script: 'tamil', speakers: '86M' },
  { id: 19, language: 'Cantonese', text: '你好', romanized: 'Néih Hóu', script: 'chinese', speakers: '86M' },
  { id: 20, language: 'Vietnamese', text: 'Xin chào', romanized: 'Xin Chào', script: 'latin', speakers: '85M' },
  { id: 21, language: 'Tagalog (Filipino)', text: 'Kumusta', romanized: 'Kumusta', script: 'latin', speakers: '83M' },
  { id: 22, language: 'Wu Chinese', text: '侬好', romanized: 'Nóng Hō', script: 'chinese', speakers: '82M' },
  { id: 23, language: 'Korean', text: '안녕', romanized: 'Annyeong', script: 'korean', speakers: '82M' },
  { id: 24, language: 'Persian (Farsi)', text: 'درود', romanized: 'Dorood', script: 'arabic', speakers: '77M' },
  { id: 25, language: 'Hausa', text: 'Sannu', romanized: 'Sannu', script: 'latin', speakers: '77M' },
  { id: 26, language: 'Swahili', text: 'Jambo', romanized: 'Jambo', script: 'latin', speakers: '72M' },
  { id: 27, language: 'Javanese', text: 'Sugeng', romanized: 'Sugeng', script: 'latin', speakers: '68M' },
  { id: 28, language: 'Italian', text: 'Ciao', romanized: 'Ciao', script: 'latin', speakers: '68M' },
  { id: 29, language: 'Punjabi', text: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', romanized: 'Sat Sri Akal', script: 'gurmukhi', speakers: '66M' },
  { id: 30, language: 'Kannada', text: 'ನಮಸ್ಕಾರ', romanized: 'Namaskara', script: 'kannada', speakers: '64M' },
  { id: 31, language: 'Gujarati', text: 'કેમ છો', romanized: 'Kem Cho', script: 'gujarati', speakers: '62M' },
  { id: 32, language: 'Thai', text: 'สวัสดี', romanized: 'Sawasdee', script: 'thai', speakers: '61M' },
  { id: 33, language: 'Polish', text: 'Cześć', romanized: 'Cześć', script: 'latin', speakers: '45M' },
  { id: 34, language: 'Malayalam', text: 'നമസ്കാരം', romanized: 'Namaskaram', script: 'malayalam', speakers: '38M' },
  { id: 35, language: 'Odia', text: 'ନମସ୍କାର', romanized: 'Namaskara', script: 'odia', speakers: '38M' },
  { id: 36, language: 'Burmese', text: 'မင်္ဂလာပါ', romanized: 'Mingalaba', script: 'burmese', speakers: '33M' },
  { id: 37, language: 'Ukrainian', text: 'Привіт', romanized: 'Pryvit', script: 'cyrillic', speakers: '33M' },
  { id: 38, language: 'Bhojpuri', text: 'प्रणाम', romanized: 'Pranam', script: 'devanagari', speakers: '52M' },
  { id: 39, language: 'Sundanese', text: 'Sampurasun', romanized: 'Sampurasun', script: 'latin', speakers: '42M' },
  { id: 40, language: 'Romanian', text: 'Bună', romanized: 'Bună', script: 'latin', speakers: '28M' },
  { id: 41, language: 'Dutch', text: 'Hallo', romanized: 'Hallo', script: 'latin', speakers: '25M' },
  { id: 42, language: 'Yoruba', text: 'Báwo', romanized: 'Bawo', script: 'latin', speakers: '45M' },
  { id: 43, language: 'Amharic', text: 'ሰላም', romanized: 'Selam', script: 'ethiopic', speakers: '32M' },
  { id: 44, language: 'Pashto', text: 'سلام', romanized: 'Salam', script: 'arabic', speakers: '30M' },
  { id: 45, language: 'Maithili', text: 'प्रणाम', romanized: 'Pranam', script: 'devanagari', speakers: '34M' },
  { id: 46, language: 'Uzbek', text: 'Salom', romanized: 'Salom', script: 'latin', speakers: '30M' },
  { id: 47, language: 'Sindhi', text: 'سلام', romanized: 'Salam', script: 'arabic', speakers: '25M' },
  { id: 48, language: 'Greek', text: 'Γειά σας', romanized: 'Yassas', script: 'greek', speakers: '13M' },
  { id: 49, language: 'Czech', text: 'Ahoj', romanized: 'Ahoj', script: 'latin', speakers: '11M' },
  { id: 50, language: 'Swedish', text: 'Hej', romanized: 'Hej', script: 'latin', speakers: '10M' },
];

export default GREETINGS;
