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
    birthdayDate: "2026-08-15T00:00",
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
    audioFilePath: "assets/music/bgm.mp3",
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

  // =================================================================
  // LOCAL STORAGE METHODS (unchanged behaviour, synchronous)
  // =================================================================

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

    // Background cloud sync (fire-and-forget, never blocks the caller)
    this._syncProfileToCloud(updatedData);
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

    // Background cloud sync
    this._syncProfileToCloud(newProfile);

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

    // Background cloud delete
    this._deleteProfileFromCloud(id);

    return true;
  }
resetCurrentProfile() {
    const active = this.getActiveProfile();
    const resetData = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
    resetData.id = active.id;
    resetData.title = active.title;
    this.saveActiveProfile(resetData); // triggers _syncProfileToCloud internally
    return resetData;
  }

  // ---------------------------------------------------------------
  // SHORT SUPABASE SHARE URL & CLOUD PROFILE LOADER
  // ---------------------------------------------------------------

  /** Generates a unique 6-character URL-safe slug (e.g. A7k92x) */
  generateSlug(length = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Returns the public production base URL.
   * If running locally on localhost, automatically resolves to the production domain
   * so shared links are always valid and accessible from any external device.
   */
  getPublicBaseUrl() {
    if (typeof window === "undefined") return "https://wishmory.vercel.app";
    const origin = window.location.origin || "";
    const hostname = window.location.hostname || "";
    
    const isLocal = hostname === "localhost" || 
                    hostname === "127.0.0.1" || 
                    hostname === "::1" ||
                    hostname.startsWith("192.168.") ||
                    hostname.startsWith("10.") ||
                    origin.includes("localhost") ||
                    origin.includes("127.0.0.1");

    if (!isLocal && origin && !origin.startsWith("file:")) {
      return origin;
    }
    
    return "https://wishmory.vercel.app";
  }

  /**
   * Generates a short, Supabase-backed share URL.
   * Syncs the profile to Supabase first, then returns: https://domain/b/{slug}
   */
  async exportShareableUrl(profile = this.getActiveProfile()) {
    if (!profile) profile = this.getActiveProfile();
    try {
      if (!profile.slug) {
        profile.slug = this.generateSlug(6);
        this.saveActiveProfile(profile);
      }
      
      // Ensure cloud sync is complete before returning URL
      await this._syncProfileToCloud(profile);

      const host = this.getPublicBaseUrl();
      return `${host}/b/${profile.slug}`;
    } catch (e) {
      console.error("Export error", e);
      const host = this.getPublicBaseUrl();
      return `${host}/b/${profile ? (profile.slug || profile.id) : "shared"}`;
    }
  }

  /**
   * Fetches a full profile object from Supabase by its short slug.
   * Reconstructs main profile + all child tables.
   */
  async loadProfileFromCloud(slug) {
    const sb = this._getSupabase();
    if (!sb || !slug) return null;

    try {
      // 1. Fetch main surprise row
      const { data: surprise, error } = await sb
        .from("surprises")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error || !surprise) {
        console.warn("[Supabase] Profile not found for slug:", slug, error);
        return null;
      }

      const surpriseId = surprise.id;

      // 2. Fetch child tables concurrently
      const [memoriesRes, timelineRes, reasonsRes, envelopesRes, quizRes] = await Promise.all([
        sb.from("memories").select("*").eq("surprise_id", surpriseId).order("sort_order", { ascending: true }),
        sb.from("timeline").select("*").eq("surprise_id", surpriseId).order("sort_order", { ascending: true }),
        sb.from("reasons").select("*").eq("surprise_id", surpriseId).order("sort_order", { ascending: true }),
        sb.from("open_when_messages").select("*").eq("surprise_id", surpriseId).order("sort_order", { ascending: true }),
        sb.from("quiz_questions").select("*").eq("surprise_id", surpriseId).order("sort_order", { ascending: true })
      ]);

      // 3. Reconstruct local profile JS object
      const loadedProfile = {
        id: surprise.slug || surprise.id,
        slug: surprise.slug,
        title: (surprise.girlfriend_name || "Birthday") + "'s Birthday Surprise ❤️",
        createdAt: new Date(surprise.created_at || Date.now()).getTime(),
        updatedAt: new Date(surprise.updated_at || Date.now()).getTime(),

        herDetails: {
          name: surprise.girlfriend_name || "My Love",
          nickname: surprise.nickname || "",
          birthdayDate: surprise.birthday || "2026-08-15T00:00",
          profilePhoto: surprise.profile_photo_url || "assets/images/photo1.svg",
          favoriteColor: surprise.favorite_color || "#ff6584",
          shortDescription: surprise.short_description || ""
        },

        relationship: {
          yourName: surprise.your_name || "Alex",
          dateMet: surprise.date_met || "",
          placeMet: surprise.place_met || "",
          howMet: surprise.how_you_met || "",
          firstConversation: surprise.first_conversation || "",
          firstDate: surprise.first_date || "",
          anniversary: surprise.anniversary || "",
          favoriteMemory: surprise.favorite_memory || ""
        },

        loveLetter: {
          title: "Write Your Birthday Message",
          content: surprise.love_letter || ""
        },

        reasons: (reasonsRes.data && reasonsRes.data.length > 0)
          ? reasonsRes.data.map(r => r.content)
          : ["Because your smile instantly brightens up my day."],

        memories: (memoriesRes.data && memoriesRes.data.length > 0)
          ? memoriesRes.data.map((m, idx) => ({
              id: m.id || ("mem-" + idx),
              title: m.title || "",
              caption: m.caption || "",
              date: m.date || "",
              image: m.image_url || "assets/images/photo1.svg",
              rotation: m.rotation || (Math.random() * 6 - 3) + "deg"
            }))
          : [],

        timeline: (timelineRes.data && timelineRes.data.length > 0)
          ? timelineRes.data.map((t, idx) => ({
              id: t.id || ("tl-" + idx),
              date: t.date || "",
              title: t.title || "",
              description: t.description || "",
              photo: t.photo_url || ""
            }))
          : [],

        openWhenLetters: (envelopesRes.data && envelopesRes.data.length > 0)
          ? envelopesRes.data.map((e, idx) => ({
              id: e.id || ("env-" + idx),
              icon: e.icon || "💌",
              title: e.title || "",
              subtitle: e.subtitle || "",
              message: e.message || ""
            }))
          : [],

        quiz: {
          heading: "How well do you know us? 👀",
          questions: (quizRes.data && quizRes.data.length > 0)
            ? quizRes.data.map(q => ({
                question: q.question || "",
                options: q.options || [],
                correctIndex: (q.correct_index != null) ? q.correct_index : 0,
                cuteNote: q.cute_note || ""
              }))
            : [],
          finalCuteResult: "No matter what score you got, you win 100% of my heart forever and ever! 🏆❤️"
        },

        finalGiftBox: {
          teaserText: "Okay... this is the final surprise.",
          buttonText: "Open Gift 🎁",
          birthdayTitle: surprise.final_title || `Happy Birthday, ${surprise.girlfriend_name || "My Love"} ❤️`,
          finalMessageText: surprise.final_message || "",
          secretMessageText: surprise.secret_message || ""
        },

        theme: surprise.theme 
          ? (typeof surprise.theme === "string" ? JSON.parse(surprise.theme) : surprise.theme)
          : { preset: "romantic" },

        music: {
          enabled: true,
          audioFilePath: surprise.music_url || "assets/music/bgm.mp3",
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

      // Cache profile in localStorage & set as active
      this.saveActiveProfile(loadedProfile);
      return loadedProfile;
    } catch (err) {
      console.error("[Supabase] Error loading profile by slug:", slug, err);
      return null;
    }
  }

  /**
   * Checks the current URL for a short slug (/b/{slug}, ?b={slug}, #b={slug}) or legacy #data=.
   * Returns:
   *   - true: successfully loaded profile
   *   - false: slug was provided but profile was NOT found in Supabase (404)
   *   - null: standard homepage visit
   */
  async checkUrlImport() {
    let slug = null;

    // 1. Pathname route: /b/A7k92x
    const pathMatch = window.location.pathname.match(/\/b\/([A-Za-z0-9_-]+)/);
    if (pathMatch && pathMatch[1]) {
      slug = pathMatch[1];
    }

    // 2. Query param route: ?b=A7k92x or ?slug=A7k92x
    if (!slug && window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      slug = urlParams.get("b") || urlParams.get("slug");
    }

    // 3. Hash route: #b=A7k92x or #/b/A7k92x
    if (!slug && window.location.hash) {
      const hashMatch = window.location.hash.match(/#\/?b[=\/]([A-Za-z0-9_-]+)/);
      if (hashMatch && hashMatch[1]) {
        slug = hashMatch[1];
      }
    }

    // If a short slug was found in the URL, load it from Supabase
    if (slug) {
      const profile = await this.loadProfileFromCloud(slug);
      if (profile) {
        return true;
      } else {
        return false; // Slug not found (404)
      }
    }

    // 4. Legacy Base64 hash fallback: #data=...
    if (window.location.hash && window.location.hash.startsWith("#data=")) {
      try {
        const encoded = window.location.hash.replace("#data=", "");
        const jsonStr = decodeURIComponent(atob(encoded));
        const importedProfile = JSON.parse(jsonStr);
        if (importedProfile && importedProfile.herDetails && importedProfile.herDetails.name) {
          importedProfile.id = "shared-" + Date.now();
          importedProfile.slug = this.generateSlug(6);
          importedProfile.title = (importedProfile.herDetails.name || "Shared") + "'s Birthday Surprise";
          this.profiles.unshift(importedProfile);
          this.activeProfileId = importedProfile.id;
          localStorage.setItem(ACTIVE_PROFILE_KEY, importedProfile.id);
          this.saveProfiles();
          history.replaceState(null, null, ' ');
          this._syncProfileToCloud(importedProfile);
          return true;
        }
      } catch (e) {
        console.error("Failed to parse legacy hash data", e);
      }
    }

    return null;
  }

  // =================================================================
  // SUPABASE CLOUD SYNC (background, fire-and-forget)
  // =================================================================
  //
  // Strategy:
  //   - localStorage is ALWAYS written first (instant, synchronous).
  //   - After each write, an async Supabase call runs in the background.
  //   - If Supabase is unavailable or errors, localStorage still works.
  //   - Errors are logged to console, never thrown.
  //
  // Column mapping — profile.id is stored as `slug` in the surprises
  // table.  The Supabase-generated `id` (UUID) is used as `surprise_id`
  // in all child tables.
  //
  // Fields NOT synced (no matching column in surprises):
  //   - profile.title              (dashboard display name)
  //   - profile.loveLetter.title   (love letter heading)
  //   - profile.finalGiftBox.teaserText / .buttonText
  //   - profile.passwordProtection.*
  //   - profile.music.enabled / .title
  // These are preserved in localStorage only.
  // =================================================================

  /** Returns the Supabase client or null if not loaded. */
  _getSupabase() {
    return (typeof window !== "undefined" && window.supabaseClient) ? window.supabaseClient : null;
  }

  // ---------------------------------------------------------------
  // Row mappers: local profile → Supabase table rows
  // ---------------------------------------------------------------

  /** Maps a profile to a `surprises` table row. */
  _profileToRow(profile) {
    return {
      slug:              profile.id,
      your_name:         (profile.relationship && profile.relationship.yourName) || null,
      girlfriend_name:   (profile.herDetails && profile.herDetails.name) || null,
      nickname:          (profile.herDetails && profile.herDetails.nickname) || null,
      birthday:          (profile.herDetails && profile.herDetails.birthdayDate) || null,
      profile_photo_url: (profile.herDetails && profile.herDetails.profilePhoto) || null,
      favorite_color:    (profile.herDetails && profile.herDetails.favoriteColor) || null,
      short_description: (profile.herDetails && profile.herDetails.shortDescription) || null,
      date_met:          (profile.relationship && profile.relationship.dateMet) || null,
      place_met:         (profile.relationship && profile.relationship.placeMet) || null,
      how_you_met:       (profile.relationship && profile.relationship.howMet) || null,
      first_conversation:(profile.relationship && profile.relationship.firstConversation) || null,
      first_date:        (profile.relationship && profile.relationship.firstDate) || null,
      anniversary:       (profile.relationship && profile.relationship.anniversary) || null,
      favorite_memory:   (profile.relationship && profile.relationship.favoriteMemory) || null,
      love_letter:       (profile.loveLetter && profile.loveLetter.content) || null,
      final_title:       (profile.finalGiftBox && profile.finalGiftBox.birthdayTitle) || null,
      final_message:     (profile.finalGiftBox && profile.finalGiftBox.finalMessageText) || null,
      secret_message:    (profile.finalGiftBox && profile.finalGiftBox.secretMessageText) || null,
      theme:             profile.theme ? JSON.stringify(profile.theme) : null,
      music_url:         (profile.music && profile.music.audioFilePath) || null,
      updated_at:        new Date().toISOString()
    };
  }

  /** Maps profile.memories → `memories` table rows. */
  _memoriesToRows(surpriseId, memories) {
    return (memories || []).map((mem, idx) => ({
      surprise_id: surpriseId,
      title:       mem.title || null,
      caption:     mem.caption || null,
      date:        mem.date || null,
      image_url:   mem.image || null,
      rotation:    mem.rotation || null,
      sort_order:  idx
    }));
  }

  /** Maps profile.timeline → `timeline` table rows. */
  _timelineToRows(surpriseId, timeline) {
    return (timeline || []).map((tl, idx) => ({
      surprise_id: surpriseId,
      title:       tl.title || null,
      description: tl.description || null,
      date:        tl.date || null,
      photo_url:   tl.photo || null,
      sort_order:  idx
    }));
  }

  /** Maps profile.reasons (string[]) → `reasons` table rows. */
  _reasonsToRows(surpriseId, reasons) {
    return (reasons || []).map((text, idx) => ({
      surprise_id: surpriseId,
      content:     text,
      sort_order:  idx
    }));
  }

  /** Maps profile.openWhenLetters → `open_when_messages` table rows. */
  _envelopesToRows(surpriseId, letters) {
    return (letters || []).map((env, idx) => ({
      surprise_id: surpriseId,
      icon:        env.icon || null,
      title:       env.title || null,
      subtitle:    env.subtitle || null,
      message:     env.message || null,
      sort_order:  idx
    }));
  }

  /** Maps profile.quiz.questions → `quiz_questions` table rows. */
  _quizToRows(surpriseId, quiz) {
    const questions = (quiz && quiz.questions) || [];
    return questions.map((q, idx) => ({
      surprise_id:   surpriseId,
      question:      q.question || null,
      options:       q.options || [],
      correct_index: (q.correctIndex != null) ? q.correctIndex : 0,
      cute_note:     q.cuteNote || null,
      sort_order:    idx
    }));
  }

  // ---------------------------------------------------------------
  // Sync operations (all async, all wrapped in try/catch)
  // ---------------------------------------------------------------

  /**
   * Upserts the full profile (surprises row + all child tables) to
   * Supabase.  Called as fire-and-forget after every localStorage write.
   */
  async _syncProfileToCloud(profile) {
    const sb = this._getSupabase();
    if (!sb) return;

    try {
      // 1. Upsert main surprise row, get back the DB id
      const row = this._profileToRow(profile);
      const { data, error } = await sb
        .from("surprises")
        .upsert(row, { onConflict: "slug" })
        .select("id")
        .single();

      if (error) {
        console.error("[Supabase] Failed to upsert surprise:", error.message);
        return;
      }

      const surpriseId = data.id;

      // 2. Sync each child table (delete existing rows, then reinsert)
      await this._syncChildTable(sb, "memories",          surpriseId, this._memoriesToRows(surpriseId, profile.memories));
      await this._syncChildTable(sb, "timeline",           surpriseId, this._timelineToRows(surpriseId, profile.timeline));
      await this._syncChildTable(sb, "reasons",            surpriseId, this._reasonsToRows(surpriseId, profile.reasons));
      await this._syncChildTable(sb, "open_when_messages", surpriseId, this._envelopesToRows(surpriseId, profile.openWhenLetters));
      await this._syncChildTable(sb, "quiz_questions",     surpriseId, this._quizToRows(surpriseId, profile.quiz));

      console.log("[Supabase] Profile synced:", profile.id);
    } catch (err) {
      console.error("[Supabase] Sync error:", err);
    }
  }

  /**
   * Replaces all rows for a given surprise_id in a child table.
   * Uses delete-then-insert so the DB always matches localStorage.
   */
  async _syncChildTable(sb, tableName, surpriseId, rows) {
    try {
      // Delete existing child rows
      const { error: delErr } = await sb
        .from(tableName)
        .delete()
        .eq("surprise_id", surpriseId);

      if (delErr) {
        console.error(`[Supabase] Failed to clear ${tableName}:`, delErr.message);
        return;
      }

      // Insert new rows (skip if empty)
      if (rows.length > 0) {
        const { error: insErr } = await sb
          .from(tableName)
          .insert(rows);

        if (insErr) {
          console.error(`[Supabase] Failed to insert into ${tableName}:`, insErr.message);
        }
      }
    } catch (err) {
      console.error(`[Supabase] Error syncing ${tableName}:`, err);
    }
  }

  /**
   * Deletes a profile and all its child rows from Supabase.
   * Looks up by slug (= profile.id) because the Supabase `id` is a
   * server-generated UUID that the client may not know.
   */
  async _deleteProfileFromCloud(slug) {
    const sb = this._getSupabase();
    if (!sb) return;

    try {
      // Look up the DB id from the slug
      const { data, error: lookupErr } = await sb
        .from("surprises")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (lookupErr) {
        console.error("[Supabase] Slug lookup failed:", lookupErr.message);
        return;
      }
      if (!data) {
        // Not in cloud yet — nothing to delete
        return;
      }

      const surpriseId = data.id;

      // Delete child rows first (safe even if cascade is configured)
      const childTables = ["memories", "timeline", "reasons", "open_when_messages", "quiz_questions"];
      for (const table of childTables) {
        const { error: childErr } = await sb.from(table).delete().eq("surprise_id", surpriseId);
        if (childErr) {
          console.error(`[Supabase] Failed to delete from ${table}:`, childErr.message);
        }
      }

      // Delete the main surprise row
      const { error: delErr } = await sb
        .from("surprises")
        .delete()
        .eq("id", surpriseId);

      if (delErr) {
        console.error("[Supabase] Failed to delete surprise:", delErr.message);
        return;
      }

      console.log("[Supabase] Profile deleted:", slug);
    } catch (err) {
      console.error("[Supabase] Delete error:", err);
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
