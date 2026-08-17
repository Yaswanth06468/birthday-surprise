/**
 * ====================================================================
 * 💖 BIRTHDAY SURPRISE WEBSITE CONFIGURATION 💖
 * ====================================================================
 * 
 * Edit this file to personalize everything on the website!
 * You do NOT need to modify HTML or CSS files. Everything customizable
 * is right here in this configuration file.
 */

const CONFIG = {
  // ==================================================================
  // 1. HER NAME & GENERAL INFO
  // ==================================================================
  girlfriendName: "Sophia",
  yourName: "Alex",

  // ==================================================================
  // 2. PASSWORD SURPRISE 🔐
  // ==================================================================
  passwordProtection: {
    enabled: true, // Set to 'false' if you want to disable the password gate
    secretPassword: "Siya", // The secret word she needs to enter (case-insensitive)
    titleText: "Before you enter... prove it's you 😉",
    placeholderText: "Enter the secret word ❤️",
    unlockButtonText: "Unlock My Heart 🔑",
    errorMessage: "Hmm... that's not it 😅 Try again!",
    unlockSuccessMessage: "Welcome, my love! ❤️"
  },

  // ==================================================================
  // 3. BIRTHDAY COUNTDOWN ⏳
  // ==================================================================
  birthdayCountdown: {
    // Format: "YYYY-MM-DDTHH:MM:SS" (e.g. "2026-08-15T00:00:00")
    // Set a date in the future for countdown, or past date to trigger birthday reveal immediately!
    targetDate: "2026-08-15T00:00:00",
    subheading: "Something special is coming... ❤️",
    birthdayArrivedTitle: "IT'S YOUR DAY! 🎂❤️",
    birthdayArrivedSubtitle: "Happy Birthday to the most amazing girl in the world! ✨"
  },

  // ==================================================================
  // 4. BACKGROUND MUSIC 🎵
  // ==================================================================
  backgroundMusic: {
    enabled: true,
    autoplay: false, // Default is OFF as requested
    audioFilePath: "/assets/music/bgm.mp3", // Path to your music file
    buttonTitle: "Toggle Music"
  },

  // ==================================================================
  // 5. "OPEN WHEN..." LETTERS 💌
  // ==================================================================
  openWhenLetters: [
    {
      id: "happy",
      icon: "😊",
      title: "Open when you're happy",
      subtitle: "To celebrate your radiant joy!",
      message: "Whenever you're happy, my whole world lights up double! Keep shining your bright light on everyone around you. Never forget how radiant your joy makes everything. I love seeing your beautiful smile!"
    },
    {
      id: "sad",
      icon: "🤗",
      title: "Open when you're sad",
      subtitle: "A tight warm hug from me to you",
      message: "I wish I could wrap my arms around you right now and hold you close. Remember that bad days pass, but my love for you is constant, strong, and unwavering. You are resilient, precious, and never alone. Call me anytime!"
    },
    {
      id: "miss-me",
      icon: "💭",
      title: "Open when you miss me",
      subtitle: "Close your eyes...",
      message: "If you're missing me right now, close your eyes for 5 seconds and feel your heartbeat—I'm right there inside your heart. Distance is just a number when two souls are connected like ours. I'm thinking of you right this second too!"
    },
    {
      id: "angry",
      icon: "🥺",
      title: "Open when you're angry with me",
      subtitle: "I'm so sorry! 🌹",
      message: "First of all: I am deeply sorry! 🥺 Even when we disagree or I do something silly, you are still my absolute favorite human being. Let me make it up to you with your favorite snacks, extra cuddles, and endless love."
    },
    {
      id: "hug",
      icon: "💖",
      title: "Open when you need a hug",
      subtitle: "Virtual warmth inside",
      message: "Sending you the biggest, warmest, longest squeeze possible! Hold onto this letter, picture my arms around you, and know that you are safe, treasured, and deeply adored beyond words."
    },
    {
      id: "smile",
      icon: "✨",
      title: "Open when you want to smile",
      subtitle: "A quick reminder",
      message: "Fun fact: You have the most breathtaking smile in the entire universe! Also, remember that time we laughed so hard our stomachs hurt? I promise to keep making magical memories like that with you forever!"
    }
  ],

  // ==================================================================
  // 6. HIDDEN MESSAGES ❤️ (Random hearts around the page)
  // ==================================================================
  hiddenMessages: [
    "You're my favorite person in the whole universe ❤️",
    "Just a quick reminder: Don't forget how deeply I love you.",
    "Okay... you're really cute 😭❤️",
    "One more reason why I fall for you every single day.",
    "My heart skips a beat every time your name pops up on my phone ✨",
    "You make every ordinary moment feel like pure magic ☀️",
    "Forever and always yours 💍"
  ],

  // ==================================================================
  // 7. SECRET EASTER EGG 👀
  // ==================================================================
  secretEasterEgg: {
    clickRequirement: 5, // Click a special heart 5 times to reveal
    title: "YOU FOUND MY SECRET MESSAGE ❤️",
    message: "You discovered my hidden secret heart! 🙈 You win 10,000 extra kisses and a blank check for your favorite dessert date anytime! I love you so much, smarty pants! 😘"
  },

  // ==================================================================
  // 8. OUR MEMORIES — POLAROID GALLERY 📸
  // ==================================================================
  memories: [
    {
      title: "The Beginning",
      date: "Oct 12, 2023",
      caption: "The day my life changed forever ✨",
      image: "/assets/images/photo1.svg", // Replace with your photo path (e.g. assets/images/photo1.jpg)
      rotation: "-3deg"
    },
    {
      title: "Sunset Magic",
      date: "Dec 24, 2023",
      caption: "Golden hour with my golden girl 🌅",
      image: "/assets/images/photo2.svg",
      rotation: "2deg"
    },
    {
      title: "Cozy Coffee Date",
      date: "Feb 14, 2024",
      caption: "Warm cups & endless sweet smiles ☕❤️",
      image: "/assets/images/photo3.svg",
      rotation: "-2deg"
    },
    {
      title: "Weekend Getaway",
      date: "May 20, 2024",
      caption: "Exploring new roads together 🚗💨",
      image: "/assets/images/photo4.svg",
      rotation: "4deg"
    },
    {
      title: "Unforgettable Laughs",
      date: "Jul 04, 2024",
      caption: "Laughed until our cheeks hurt! 😂",
      image: "/assets/images/photo5.svg",
      rotation: "-4deg"
    },
    {
      title: "Under The Stars",
      date: "Sep 18, 2024",
      caption: "Under the stars with my whole universe ✨",
      image: "/assets/images/photo6.svg",
      rotation: "3deg"
    }
  ],

  // ==================================================================
  // 9. LOVE METER ❤️
  // ==================================================================
  loveMeter: {
    heading: "How much do I love you?",
    subheading: "Click the button below to measure my love level!",
    buttonText: "Find Out ❤️",
    overflowMessage: "Error... Love level cannot be measured. 😭❤️"
  },

  // ==================================================================
  // 10. REASONS I LOVE YOU 💕
  // ==================================================================
  reasonsILoveYou: [
    "Because your smile instantly brightens up my darkest days.",
    "Because I can be 100% my true silly self around you.",
    "Because you turn ordinary moments into extraordinary memories.",
    "Because you're simply YOU. ❤️",
    "Because you have the kindest, gentlest, and most beautiful heart.",
    "Because you always know how to make me laugh when I need it most.",
    "Because your hugs feel like the safest place in the world.",
    "Because of the adorable way you laugh when you get excited.",
    "Because you believe in me even when I doubt myself.",
    "Because every single adventure is better when shared with you."
  ],

  // ==================================================================
  // 11. MINI RELATIONSHIP QUIZ 😂
  // ==================================================================
  quiz: {
    heading: "How well do you know us? 👀",
    questions: [
      {
        question: "Where did we first meet?",
        options: ["At a cozy coffee shop", "Through mutual friends", "In a romantic bookstore", "At a college event"],
        correctIndex: 0,
        cuteNote: "I'll never forget that moment! Spot on ❤️"
      },
      {
        question: "What was our first conversation about?",
        options: ["Favorite movies & music", "Food & favorite places", "Our dream travel spots", "Who has the cuter pet"],
        correctIndex: 1,
        cuteNote: "Food always wins our hearts! 🍕"
      },
      {
        question: "Who texted first?",
        options: ["You (obviously!)", "Me (couldn't resist!)", "We texted at the exact same second", "It was a group chat mixup"],
        correctIndex: 1,
        cuteNote: "Best decision I ever made! 📱"
      },
      {
        question: "What is my favorite memory with you?",
        options: ["Our late night long conversations", "That spontaneous road trip", "Every single moment spent together", "When we cooked dinner together"],
        correctIndex: 2,
        cuteNote: "Trick question—EVERY moment with you is my favorite! 🥰"
      },
      {
        question: "Who is more annoying? 😂",
        options: ["Definitely me!", "Definitely you!", "Both of us equally", "Neither, we are angels! 😇"],
        correctIndex: 2,
        cuteNote: "Haha! We're chaotic cuties together! 🤪"
      }
    ],
    finalCuteResult: "No matter what score you got, you win 100% of my heart forever and ever! 🏆❤️"
  },

  // ==================================================================
  // 12. FINAL GIFT BOX 🎁
  // ==================================================================
  finalGiftBox: {
    teaserText: "Okay... this is the final surprise.",
    buttonText: "Open Gift 🎁",
    birthdayTitle: "Happy Birthday, Sophia ❤️",
    finalMessageText: "Out of all the people in this world,\nI'm just really lucky that I got to meet you."
  }
};

// Export configuration for browser runtime
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
