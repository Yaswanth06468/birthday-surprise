/**
 * Data Storage & Multi-Profile Manager
 * Handles localStorage persistence, image base64 conversions, and URL payloads.
 */

const STORAGE_KEY = "birthday_surprises_data";
const ACTIVE_PROFILE_KEY = "active_birthday_profile_id";

// Default Profile Template (Sophia's Romantic Surprise)
const DEFAULT_PROFILE = {
  id: "default-sophia",
  title: "Sophia's Birthday Surprise ❤️",
  createdAt: Date.now(),
  updatedAt: Date.now(),

  herDetails: {
    name: "Sophia",
    nickname: "Soph",
    birthdayDate: "2026-08-15T00:00:00",
    profilePhoto: "assets/images/photo1.svg",
    favoriteColor: "#ff6584",
    shortDescription: "The most radiant, beautiful, and kind-hearted soul in the universe."
  },

  relationship: {
    yourName: "Alex",
    dateMet: "October 12, 2023",
    placeMet: "Cozy Corner Coffee Shop",
    howMet: "We both reached for the last cinnamon pastry at the exact same moment!",
    firstConversation: "Laughed about pastries and ended up talking for 3 straight hours.",
    firstDate: "Sunset walk by the lake with warm hot chocolate.",
    anniversary: "November 01",
    favoriteMemory: "Our spontaneous late-night road trip looking at the stars."
  },

  loveLetter: {
    title: "Write Your Birthday Message",
    content: "Happy Birthday, my love! ❤️\n\nWords can never fully express how grateful I am to have you in my life. Every single day with you is filled with warmth, laughter, and pure happiness. You are my best friend, my confidante, and my absolute favorite person in the entire universe.\n\nHere's to celebrating YOU today and making a million more unforgettable memories together!"
  },

  reasons: [
    "Because your smile instantly brightens up my darkest days.",
    "Because I can be 100% my true silly self around you.",
    "Because you turn ordinary moments into extraordinary memories.",
    "Because you're simply YOU. ❤️",
    "Because you have the kindest, gentlest, and most beautiful heart.",
    "Because you always know how to make me laugh when I need it most.",
    "Because your hugs feel like the safest place in the world."
  ],

  memories: [
    {
      id: "mem-1",
      title: "The Beginning",
      date: "Oct 12, 2023",
      caption: "The day my life changed forever ✨",
      image: "assets/images/photo1.svg",
      rotation: "-3deg"
    },
    {
      id: "mem-2",
      title: "Sunset Magic",
      date: "Dec 24, 2023",
      caption: "Golden hour with my golden girl 🌅",
      image: "assets/images/photo2.svg",
      rotation: "2deg"
    },
    {
      id: "mem-3",
      title: "Cozy Coffee Date",
      date: "Feb 14, 2024",
      caption: "Warm cups & endless sweet smiles ☕❤️",
      image: "assets/images/photo3.svg",
      rotation: "-2deg"
    },
    {
      id: "mem-4",
      title: "Weekend Getaway",
      date: "May 20, 2024",
      caption: "Exploring new roads together 🚗💨",
      image: "assets/images/photo4.svg",
      rotation: "4deg"
    }
  ],

  timeline: [
    {
      id: "tl-1",
      date: "Oct 12, 2023",
      title: "The First Spark ✨",
      description: "We met at the cozy coffee shop and couldn't stop talking.",
      photo: "assets/images/photo1.svg"
    },
    {
      id: "tl-2",
      date: "Nov 01, 2023",
      title: "Official Beginning 💖",
      description: "The day we officially decided to be each other's person forever.",
      photo: ""
    },
    {
      id: "tl-3",
      date: "Today",
      title: "Your Special Birthday 🎂",
      description: "Celebrating the most incredible human being on the planet!",
      photo: ""
    }
  ],

  openWhenLetters: [
    {
      id: "happy",
      icon: "😊",
      title: "Open when you're happy",
      subtitle: "To celebrate your radiant joy!",
      message: "Whenever you're happy, my whole world lights up double! Keep shining your bright light on everyone around you. Never forget how radiant your joy makes everything."
    },
    {
      id: "sad",
      icon: "🤗",
      title: "Open when you're sad",
      subtitle: "A tight warm hug from me to you",
      message: "I wish I could wrap my arms around you right now and hold you close. Remember that bad days pass, but my love for you is constant, strong, and unwavering."
    },
    {
      id: "miss-me",
      icon: "💭",
      title: "Open when you miss me",
      subtitle: "Close your eyes...",
      message: "If you're missing me right now, close your eyes for 5 seconds and feel your heartbeat—I'm right there inside your heart."
    },
    {
      id: "angry",
      icon: "🥺",
      title: "Open when you're angry with me",
      subtitle: "I'm so sorry! 🌹",
      message: "First of all: I am deeply sorry! 🥺 Even when we disagree or I do something silly, you are still my absolute favorite human being."
    },
    {
      id: "hug",
      icon: "💖",
      title: "Open when you need a hug",
      subtitle: "Virtual warmth inside",
      message: "Sending you the biggest, warmest, longest squeeze possible! Hold onto this letter, picture my arms around you, and know that you are safe."
    },
    {
      id: "smile",
      icon: "✨",
      title: "Open when you want to smile",
      subtitle: "A quick reminder",
      message: "Fun fact: You have the most breathtaking smile in the entire universe! Remember when we laughed so hard our cheeks hurt?"
    }
  ],

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
        options: ["Favorite movies & music", "Food & favorite pastries", "Our dream travel spots", "Who has the cuter pet"],
        correctIndex: 1,
        cuteNote: "Food & pastries always win our hearts! 🍕"
      },
      {
        question: "Who texted first?",
        options: ["You (obviously!)", "Me (couldn't resist!)", "We texted at the exact same second", "It was a group chat mixup"],
        correctIndex: 1,
        cuteNote: "Best decision I ever made! 📱"
      }
    ],
    finalCuteResult: "No matter what score you got, you win 100% of my heart forever and ever! 🏆❤️"
  },

  finalGiftBox: {
    teaserText: "Okay... this is the final surprise.",
    buttonText: "Open Gift 🎁",
    birthdayTitle: "Happy Birthday, Sophia ❤️",
    finalMessageText: "Out of all the people in this world,\nI'm just really lucky that I got to meet you.",
    secretMessageText: "You found my hidden secret heart! 🙈 You win 10,000 extra kisses and a blank check for your favorite dessert date anytime! I love you so much! 😘"
  },

  theme: {
    preset: "romantic",
    bgGradient: "linear-gradient(135deg, #0d0614 0%, #1a0b2e 40%, #2a0826 70%, #120318 100%)",
    accentPink: "#ff6584",
    accentRose: "#ff477e",
    accentGold: "#ffd166"
  },

  music: {
    enabled: true,
    audioFilePath: "assets/music/romantic-bgm.mp3",
    title: "Toggle Music"
  },

  passwordProtection: {
    enabled: true,
    secretPassword: "love",
    titleText: "Before you enter... prove it's you 😉",
    placeholderText: "Enter the secret word ❤️",
    unlockButtonText: "Unlock My Heart 🔑",
    errorMessage: "Wrong 😜 Try again, birthday girl!",
    unlockSuccessMessage: "Welcome, my love! ❤️"
  }
};

class DataStore {
  constructor() {
    this.profiles = this.loadProfiles();
    this.activeProfileId = localStorage.getItem(ACTIVE_PROFILE_KEY) || (this.profiles[0] ? this.profiles[0].id : DEFAULT_PROFILE.id);
    
    // Check if URL hash has imported payload
    this.checkUrlImport();
  }

  loadProfiles() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to parse localStorage profiles, resetting to default.", e);
    }
    const initial = [JSON.parse(JSON.stringify(DEFAULT_PROFILE))];
    this.saveProfiles(initial);
    return initial;
  }

  saveProfiles(profilesList = this.profiles) {
    this.profiles = profilesList;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profiles));
    } catch (e) {
      console.error("Storage full or unavailable", e);
    }
  }

  getAllProfiles() {
    return this.profiles;
  }

  getActiveProfile() {
    let active = this.profiles.find(p => p.id === this.activeProfileId);
    if (!active) {
      active = this.profiles[0] || JSON.parse(JSON.stringify(DEFAULT_PROFILE));
      this.activeProfileId = active.id;
      localStorage.setItem(ACTIVE_PROFILE_KEY, active.id);
    }
    return active;
  }

  setActiveProfileId(id) {
    const found = this.profiles.find(p => p.id === id);
    if (found) {
      this.activeProfileId = id;
      localStorage.setItem(ACTIVE_PROFILE_KEY, id);
      return true;
    }
    return false;
  }

  saveActiveProfile(updatedData) {
    const index = this.profiles.findIndex(p => p.id === this.activeProfileId);
    updatedData.updatedAt = Date.now();

    if (index !== -1) {
      this.profiles[index] = updatedData;
    } else {
      this.profiles.push(updatedData);
      this.activeProfileId = updatedData.id;
      localStorage.setItem(ACTIVE_PROFILE_KEY, updatedData.id);
    }
    this.saveProfiles();
  }

  createNewProfile(name = "My New Birthday Surprise") {
    const newId = "profile-" + Date.now();
    const newProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
    newProfile.id = newId;
    newProfile.title = name;
    newProfile.createdAt = Date.now();
    newProfile.updatedAt = Date.now();
    newProfile.herDetails.name = "My Love";

    this.profiles.push(newProfile);
    this.activeProfileId = newId;
    localStorage.setItem(ACTIVE_PROFILE_KEY, newId);
    this.saveProfiles();
    return newProfile;
  }

  deleteProfile(id) {
    if (this.profiles.length <= 1) {
      alert("You must keep at least one profile!");
      return false;
    }
    this.profiles = this.profiles.filter(p => p.id !== id);
    if (this.activeProfileId === id) {
      this.activeProfileId = this.profiles[0].id;
      localStorage.setItem(ACTIVE_PROFILE_KEY, this.activeProfileId);
    }
    this.saveProfiles();
    return true;
  }

  resetCurrentProfile() {
    const active = this.getActiveProfile();
    const resetData = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
    resetData.id = active.id;
    resetData.title = active.title;
    this.saveActiveProfile(resetData);
    return resetData;
  }

  // URL Hash Import / Export Helper
  exportShareableUrl(profile = this.getActiveProfile()) {
    try {
      const jsonStr = JSON.stringify(profile);
      const encoded = btoa(encodeURIComponent(jsonStr));
      const url = window.location.origin + window.location.pathname + "#data=" + encoded;
      return url;
    } catch (e) {
      console.error("Export error", e);
      return window.location.href;
    }
  }

  checkUrlImport() {
    if (window.location.hash && window.location.hash.startsWith("#data=")) {
      try {
        const encoded = window.location.hash.replace("#data=", "");
        const jsonStr = decodeURIComponent(atob(encoded));
        const importedProfile = JSON.parse(jsonStr);
        if (importedProfile && importedProfile.herDetails && importedProfile.herDetails.name) {
          importedProfile.id = "shared-" + Date.now();
          importedProfile.title = (importedProfile.herDetails.name || "Shared") + "'s Birthday Surprise";
          this.profiles.unshift(importedProfile);
          this.activeProfileId = importedProfile.id;
          localStorage.setItem(ACTIVE_PROFILE_KEY, importedProfile.id);
          this.saveProfiles();
          // Clear hash to prevent duplicate import on refresh
          history.replaceState(null, null, ' ');
        }
      } catch (e) {
        console.warn("Invalid shared URL payload", e);
      }
    }
  }
}

// Helper utility for compressing & reading local files as Base64 Data URLs
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

window.DataStore = DataStore;
window.readFileAsBase64 = readFileAsBase64;
