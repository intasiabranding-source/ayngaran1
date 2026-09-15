export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string | string[];
  successFeedback?: string;
  wrongFeedback?: string;
}

export interface MemoryItem {
  id: number;
  image: string;
  caption: string;
  date: string;
  location?: string;
  rotation?: number; // subtle rotation degree for Polaroid tilt
  objectPosition?: string; // custom focal point alignment (e.g. "center top", "center 85%")
}

export interface StoryConfig {
  recipientName: string;
  relationshipDate: string;
  birthdayDate: string;
  introSubtitle: string;
  introTitle: string;
  introCta: string;
  backgroundMusic: string;
  questions: QuizQuestion[];
  loveLetterTitle: string;
  loveLetter: string[];
  loveLetterSignature: string;
  loveLetterSignoff: string;
  memoriesTitle: string;
  memoriesSubtitle: string;
  memories: MemoryItem[];
  finalQuestionPrompt: string;
  finalQuestionHeading: string;
  finalQuestionYesText: string;
  finalQuestionNoText: string;
  finalQuestionSuccessMsg: string;
  finalPhoto: string;
  finalBirthdayHeading: string;
  finalQuote: string;
  finalClosingNote: string;
  finalWhisper: string;
}

export const storyConfig: StoryConfig = {
  // Personal Details
  recipientName: "My Queen",
  relationshipDate: "September 21, 2026",
  birthdayDate: "Forever & Always",

  // Scene 1: Opening / Cover Page
  introSubtitle: "A STORY MEANT TO BE TOLD",
  introTitle: "A Love Story Between\nAyn <3 Raga",
  introCta: "BEGIN THE STORY ♥",

  // Background Audio (place your mp3 file in /public/audio/background.mp3)
  // If not found, a soft romantic ambient chime/piano chord loop plays automatically!
  backgroundMusic: "/audio/background.mp3",

  // Scene 2: Interactive 3-Question Quiz
  questions: [
    {
      id: 1,
      question: "When did Ayngaran first saw you?",
      options: [
        "June 3, 2025",
        "May 15, 2025",
        "July 1, 2025",
        "August 20, 2025",
      ],
      correctAnswer: "June 3, 2025",
      successFeedback: "Correct, my love! June 3, 2025 🤍",
      wrongFeedback: "Think back... try again, my love 🤍",
    },
    {
      id: 2,
      question: "What is the first message he sent you?",
      options: [
        "Heyyy",
        "Hi there!",
        "Hello beautiful 🤍",
        "Are you free today?",
      ],
      correctAnswer: "Heyyy",
      successFeedback: "You remembered! 'Heyyy' 🥹🤍",
      wrongFeedback: "Not quite... try again, love 🤍",
    },
    {
      id: 3,
      question: "When did you accept his love?",
      options: [
        "July 20",
        "July 21",
        "June 25",
        "August 10",
      ],
      correctAnswer: ["July 20", "July 21"],
      successFeedback: "That unforgettable day... 🥹🤍",
      wrongFeedback: "Think back to that special date... try again, my love 🤍",
    },
  ],

  // Scene 3: The Handwritten Love Letter
  loveLetterTitle: "To My Love",
  loveLetter: [
    "My love, I don’t think words will ever be enough to explain how much I love you.",
    "I love you not only for your beauty, but for the beautiful heart you have and the way you treat me with so much love and care.",
    "Your beautiful eyes, your cute smile, your kindness, and everything about you make you so special to me.",
    "You have always been there for me, especially during the moments when I felt like I had nobody. When I thought I was alone, you simply told me, “I’m here,” and those words meant more to me than you could ever imagine.",
    "You are not just my girlfriend; you are my biggest support, my strength, and the backbone of my life.",
    "You make my life happier just by being in it.",
    "To me, you are my queen, my angel, and the person I want to cherish forever.",
    "I promise to always value your love, care for you, stand beside you, and remind you how special you are to me.",
    "I love you with all my heart, and I hope you always remember that you mean the world to me.",
  ],
  loveLetterSignature: "Forever Yours,",
  loveLetterSignoff: "Love Yuhhh soo much🥹🫶🏻🤍",

  // Scene 4: Nostalgic Photobooth & Polaroids
  // (Place your real photos in /public/photos/photo1.jpg, photo2.jpg, etc.)
  memoriesTitle: "Our Little Memories",
  memoriesSubtitle: "Every picture holds a moment I'd choose again.",
  memories: [
    { id: 1, image: "/photos/photo1.jpg", caption: "Photo #1", date: "Memory 1", rotation: -1.5, objectPosition: "center top" },
    { id: 2, image: "/photos/photo2.jpg", caption: "Photo #2", date: "Memory 2", rotation: 1.8, objectPosition: "center top" },
    { id: 3, image: "/photos/photo3.jpg", caption: "Photo #3", date: "Memory 3", rotation: -2.1, objectPosition: "center top" },
    { id: 4, image: "/photos/photo4.jpg", caption: "Photo #4", date: "Memory 4", rotation: 1.5, objectPosition: "center top" },
    { id: 5, image: "/photos/photo5.jpg", caption: "Photo #5", date: "Memory 5", rotation: -1.2, objectPosition: "center top" },
    { id: 6, image: "/photos/photo6.jpg", caption: "Photo #6", date: "Memory 6", rotation: 2.2, objectPosition: "center 30%" },
    { id: 7, image: "/photos/photo7.jpg", caption: "Photo #7", date: "Memory 7", rotation: -1.7, objectPosition: "center 32%" },
    { id: 8, image: "/photos/photo8.jpg", caption: "Photo #8", date: "Memory 8", rotation: 1.4, objectPosition: "center 80%" },
    { id: 9, image: "/photos/photo9.jpg", caption: "Photo #9", date: "Memory 9", rotation: -2.4, objectPosition: "right 20%" },
    { id: 10, image: "/photos/photo10.jpg", caption: "Photo #10", date: "Memory 10", rotation: 1.6, objectPosition: "center 20%" },
    { id: 11, image: "/photos/photo11.jpg", caption: "Photo #11", date: "Memory 11", rotation: -1.8, objectPosition: "center 25%" },
    { id: 12, image: "/photos/photo12.jpg", caption: "Photo #12", date: "Memory 12", rotation: 2.0, objectPosition: "right 15%" },
    { id: 13, image: "/photos/photo13.jpg", caption: "Photo #13", date: "Memory 13", rotation: -1.3, objectPosition: "center 22%" },
    { id: 14, image: "/photos/photo14.jpg", caption: "Photo #14", date: "Memory 14", rotation: 1.9, objectPosition: "center 22%" },
    { id: 15, image: "/photos/photo15.jpg", caption: "Photo #15", date: "Memory 15", rotation: -2.0, objectPosition: "center 30%" },
    { id: 16, image: "/photos/photo16.jpg", caption: "Photo #16", date: "Memory 16", rotation: 1.7, objectPosition: "center 20%" },
    { id: 17, image: "/photos/photo17.jpg", caption: "Photo #17", date: "Memory 17", rotation: -1.6, objectPosition: "center 25%" },
    { id: 18, image: "/photos/photo18.jpg", caption: "Photo #18", date: "Memory 18", rotation: 2.1, objectPosition: "center 20%" },
    { id: 19, image: "/photos/photo19.jpg", caption: "Photo #19", date: "Memory 19", rotation: -1.9, objectPosition: "center 20%" },
    { id: 20, image: "/photos/photo20.jpg", caption: "Photo #20", date: "Memory 20", rotation: 1.5, objectPosition: "center 15%" },
  ],

  // Scene 5: The Playful Question
  finalQuestionPrompt: "But I have one last question...",
  finalQuestionHeading: "Do you love me? 🥹",
  finalQuestionYesText: "YES 🤍",
  finalQuestionNoText: "NO",
  finalQuestionSuccessMsg: "I knew it. 🥹🤍",

  // Scene 6: Final Birthday Ending
  // (Place your hero birthday photo in /public/photos/final-photo.jpg)
  finalPhoto: "/photos/final-photo.jpg",
  finalBirthdayHeading: "HAPPY BIRTHDAY, MY LOVE 🤍",
  finalQuote: "In every lifetime, in every version of my story, I'd still choose you.",
  finalClosingNote:
    "Happy Birthday, my love. Here's to you, to us, and to every beautiful memory still waiting for us. 🥹🤍",
  finalWhisper: "Forever isn't long enough with you.",
};
