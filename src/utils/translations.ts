import type { LanguageMode } from '../stores/student';

export interface TranslationDictionary {
  // Common Navigation & Buttons
  startLearningBtn: string;
  heroTagline: string;
  heroSub: string;
  heroStartBtn: string;
  heroWhyTitle: string;
  heroFeature1Title: string;
  heroFeature1Desc: string;
  heroFeature2Title: string;
  heroFeature2Desc: string;
  heroFeature3Title: string;
  heroFeature3Desc: string;
  heroFeature4Title: string;
  heroFeature4Desc: string;
  heroQuote: string;

  // Onboarding Form
  nameLabel: string;
  namePlaceholder: string;
  nameHelp: string;
  interestsLabel: string;
  interestsHelp: string;
  errNameRequired: string;
  errInterestsMin: string;
  errInterestsMax: string;
  submitOnboarding: string;

  // Intro Page
  introTitle: string;
  introSub: string;
  introStepsTitle: string;
  introStep1: string;
  introStep2: string;
  introStep3: string;
  introStep4: string;
  introStep5: string;
  introStartBtn: string;

  // Visualizer Controls & Labels
  play: string;
  pause: string;
  stepForward: string;
  stepBackward: string;
  reset: string;
  soundOn: string;
  muted: string;
  passText: string;
  stepCountText: string;

  // Master Quiz
  quizTitle: string;
  quizSub: string;
  questionText: string;
  submitAnswer: string;
  nextQuestion: string;
  scoreText: string;
}

export const translations: Record<LanguageMode, TranslationDictionary> = {
  hinglish: {
    startLearningBtn: 'Start Learning',
    heroTagline: 'Visual, Fun & Interactive!',
    heroSub: 'Data Structures & Algorithms seekhna ab bilkul easy hai. Step-by-step visual animations, interactive playground, aur real-life analogies ke sath DSA ko master karo!',
    heroStartBtn: 'Start Learning',
    heroWhyTitle: 'Kyun padhDSA sabse best hai? 🌟',
    heroFeature1Title: 'Personalized Analogies',
    heroFeature1Desc: 'Cricket, Gaming, ya Food — jo tum select karoge, hum examples wahi se banayenge!',
    heroFeature2Title: 'Single Comprehensive Guide',
    heroFeature2Desc: 'No fragmented steps! Saare core concepts ek hi unified learning page par available hain.',
    heroFeature3Title: 'Live Visualizer & Audio SFX',
    heroFeature3Desc: 'Audio sound effects aur step-by-step control ke sath dekho elements kaise slide karke sort hote hain.',
    heroFeature4Title: 'Master Quiz & Certificate',
    heroFeature4Desc: '6-question master quiz attempt karke instant completion badge and WhatsApp share certificate claim karo!',
    heroQuote: 'Dhyan do! 💡 Pehle do items compare honge. Agar pehla wala bada hai, toh simply jagah swap kar do. Phir repeat!',

    nameLabel: 'Tumhara Naam Kya Hai?',
    namePlaceholder: 'e.g. Rahul, Ananya, Yash...',
    nameHelp: 'Bas wohi naam likho jisse dost bulate hain!',
    interestsLabel: 'Tumhare Top 2 ya 3 Hobbies Kya Hain?',
    interestsHelp: 'Select 2 ya 3 chips to customize your learning guide:',
    errNameRequired: 'Arre naam toh batate jao! (Type your name) ✏️',
    errInterestsMin: 'Kam se kam 2 interests chunna zaroori hai! 🎯',
    errInterestsMax: 'Maximum 3 interests allowed hain! 🛑',
    submitOnboarding: 'Save & Start Learning 🚀',

    introTitle: 'Meet Bubble Sort 🧼',
    introSub: 'Bubble Sort sabse fundamental sorting algorithm hai. Yeh adjacent items ko compare karta hai aur sabse bade item ko end tak bubble ki tarah move karta hai!',
    introStepsTitle: '5-Step Learning Roadmap:',
    introStep1: 'List & Index Mechanics (0-based indexing)',
    introStep2: 'Comparison Logic (Left vs Right)',
    introStep3: 'Swapping Mechanism (Exchanging positions)',
    introStep4: '1 Full Pass Execution (Settling max value)',
    introStep5: 'Repeat Until Sorted (0 swaps termination)',
    introStartBtn: 'Start Step 1: List Basics 🚀',

    play: 'Autoplay',
    pause: 'Pause',
    stepForward: 'Next',
    stepBackward: 'Prev',
    reset: 'Reset',
    soundOn: 'Sound ON',
    muted: 'Muted',
    passText: 'Pass',
    stepCountText: 'Step',

    quizTitle: 'Master Quiz',
    quizSub: 'Test your understanding of Bubble Sort algorithms & time complexity!',
    questionText: 'Question',
    submitAnswer: 'Submit Answer',
    nextQuestion: 'Next Question',
    scoreText: 'Score',
  },

  english: {
    startLearningBtn: 'Start Learning',
    heroTagline: 'Visual, Fun & Interactive!',
    heroSub: 'Learning Data Structures & Algorithms is now clear and visual. Master DSA with step-by-step animations, interactive playgrounds, and intuitive analogies!',
    heroStartBtn: 'Start Learning',
    heroWhyTitle: 'Why learn with padhDSA? 🌟',
    heroFeature1Title: 'Personalized Analogies',
    heroFeature1Desc: 'Cricket, Gaming, or Food — select your favorite topic, and examples adapt to your interests!',
    heroFeature2Title: 'Single Comprehensive Guide',
    heroFeature2Desc: 'No fragmented steps! All core concepts compiled seamlessly into one master guide.',
    heroFeature3Title: 'Live Visualizer & Audio SFX',
    heroFeature3Desc: 'Watch elements slide and swap in real time with step-by-step controls and audio feedback.',
    heroFeature4Title: 'Master Quiz & Certificate',
    heroFeature4Desc: 'Complete the 6-question quiz to earn your verifiable completion badge and certificate!',
    heroQuote: 'Key takeaway! 💡 Compare adjacent element pairs. If the left item is larger, swap them. Repeat until sorted!',

    nameLabel: 'What is your name?',
    namePlaceholder: 'e.g. Rahul, Ananya, Yash...',
    nameHelp: 'Enter your preferred name for certificates and guides.',
    interestsLabel: 'What are your Top 2 or 3 Hobbies?',
    interestsHelp: 'Select 2 or 3 chips to customize your visual learning guide:',
    errNameRequired: 'Please enter your name to proceed! ✏️',
    errInterestsMin: 'Please select at least 2 interests! 🎯',
    errInterestsMax: 'Maximum 3 interests allowed! 🛑',
    submitOnboarding: 'Save & Start Learning 🚀',

    introTitle: 'Meet Bubble Sort 🧼',
    introSub: 'Bubble Sort is a foundational comparison-based sorting algorithm. It compares adjacent elements and bubbles up the largest item to its correct position in each pass!',
    introStepsTitle: '5-Step Learning Roadmap:',
    introStep1: 'List & Index Mechanics (0-based indexing)',
    introStep2: 'Comparison Logic (Left vs Right)',
    introStep3: 'Swapping Mechanism (Exchanging positions)',
    introStep4: '1 Full Pass Execution (Settling max value)',
    introStep5: 'Repeat Until Sorted (0 swaps termination)',
    introStartBtn: 'Start Step 1: List Basics 🚀',

    play: 'Autoplay',
    pause: 'Pause',
    stepForward: 'Next',
    stepBackward: 'Prev',
    reset: 'Reset',
    soundOn: 'Sound ON',
    muted: 'Muted',
    passText: 'Pass',
    stepCountText: 'Step',

    quizTitle: 'Master Quiz',
    quizSub: 'Test your understanding of Bubble Sort algorithms & time complexity!',
    questionText: 'Question',
    submitAnswer: 'Submit Answer',
    nextQuestion: 'Next Question',
    scoreText: 'Score',
  },
};

export function getTranslation(lang: LanguageMode = 'hinglish'): TranslationDictionary {
  return translations[lang] || translations.hinglish;
}
