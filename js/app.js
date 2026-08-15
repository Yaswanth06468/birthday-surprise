/**
 * Dynamic App Renderer for Final Birthday Surprise Web Page
 */

class AppRenderer {
  constructor(store, themeEngine) {
    this.store = store;
    this.themeEngine = themeEngine;
    this.fireworks = null;
    this.confetti = null;
    this.synthAudioContext = null;
    this.isSynthPlaying = false;
    this.easterEggClickCount = 0;
  }

  render() {
    const profile = this.store.getActiveProfile();
    if (!profile) return;

    // Apply theme
    this.themeEngine.applyTheme(profile.theme);

    // Initialize Canvas Engines if needed
    if (!this.fireworks && typeof window.FireworksEngine !== "undefined") {
      this.fireworks = new window.FireworksEngine("fireworks-canvas");
    }
    if (!this.confetti && typeof window.ConfettiEngine !== "undefined") {
      this.confetti = new window.ConfettiEngine("confetti-canvas");
    }

    // Populate Her Name & General Details
    this.renderHerDetails(profile);

    // Password Gate
    this.renderPasswordGate(profile);

    // Countdown Timer
    this.renderCountdown(profile);

    // Relationship Story & Timeline (Auto-hide if empty!)
    this.renderRelationshipStory(profile);
    this.renderTimeline(profile);

    // Open When Letters
    this.renderOpenWhenLetters(profile);

    // Polaroid Gallery
    this.renderPolaroids(profile);

    // Love Meter
    this.renderLoveMeter(profile);

    // Reasons Generator
    this.renderReasons(profile);

    // Quiz
    this.renderQuiz(profile);

    // 3D Final Gift Box
    this.renderGiftBox(profile);

    // Hidden Hearts & Easter Egg
    this.renderHiddenHearts(profile);

    // Music Player
    this.renderMusicPlayer(profile);
  }

  /* ===================================================================
   * 1. HER DETAILS & PERSONALIZATION
   * =================================================================== */
  renderHerDetails(profile) {
    const name = (profile.herDetails && profile.herDetails.name) || "Sophia";
    document.querySelectorAll(".her-name").forEach(el => {
      el.textContent = name;
    });

    const descEl = document.getElementById("her-description-text");
    if (descEl && profile.herDetails && profile.herDetails.shortDescription) {
      descEl.textContent = profile.herDetails.shortDescription;
      descEl.style.display = "block";
    } else if (descEl) {
      descEl.style.display = "none";
    }
  }

  /* ===================================================================
   * 2. PASSWORD SURPRISE 🔐
   * =================================================================== */
  renderPasswordGate(profile) {
    const gate = document.getElementById("password-gate");
    const input = document.getElementById("password-input");
    const btn = document.getElementById("password-submit-btn");
    const errorMsg = document.getElementById("password-error-msg");
    const passConfig = profile.passwordProtection || { enabled: false };

    if (!gate) return;

    if (!passConfig.enabled) {
      gate.style.display = "none";
      document.body.classList.remove("locked");
      return;
    }

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    document.body.classList.add("locked");
    gate.style.display = "flex";
    gate.classList.remove("unlock-fade");

    const checkPassword = () => {
      const val = (input.value || "").trim().toLowerCase();
      const target = (passConfig.secretPassword || "love").trim().toLowerCase();

      if (val === target) {
        if (input) input.blur();
        if (document.activeElement) document.activeElement.blur();
        errorMsg.textContent = passConfig.unlockSuccessMessage || "Welcome, my love! ❤️";
        errorMsg.className = "password-error-msg success";
        if (this.confetti) this.confetti.burst(50);
        gate.classList.add("unlock-fade");
        setTimeout(() => {
          gate.style.display = "none";
          document.body.classList.remove("locked");

          // Ensure browser repaints layout after removing overflow:hidden before scrolling
          requestAnimationFrame(() => {
            setTimeout(() => {
              window.scrollTo(0, 0);
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
            }, 50);
          });
        }, 800);
      } else {
        errorMsg.textContent = passConfig.errorMessage || "Wrong 😜 Try again!";
        errorMsg.className = "password-error-msg error";
        const card = document.querySelector(".password-card");
        if (card) {
          card.classList.remove("shake");
          void card.offsetWidth;
          card.classList.add("shake");
        }
        input.value = "";
      }
    };

    if (btn) btn.onclick = checkPassword;
    if (input) {
      input.onkeyup = (e) => {
        if (e.key === "Enter") checkPassword();
      };
    }
  }

  /* ===================================================================
   * 3. BIRTHDAY COUNTDOWN ⏳
   * =================================================================== */
  renderCountdown(profile) {
    const targetDateStr = (profile.herDetails && profile.herDetails.birthdayDate) || "2026-08-15T00:00:00";
    const targetDate = new Date(targetDateStr).getTime();

    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minsEl = document.getElementById("cd-mins");
    const secsEl = document.getElementById("cd-secs");
    const bannerEl = document.getElementById("cd-birthday-banner");

    let hasCelebrated = false;

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        if (daysEl) daysEl.textContent = "00";
        if (hoursEl) hoursEl.textContent = "00";
        if (minsEl) minsEl.textContent = "00";
        if (secsEl) secsEl.textContent = "00";

        if (bannerEl) {
          const herName = (profile.herDetails && profile.herDetails.name) || "My Love";
          bannerEl.innerHTML = `
            <h2>IT'S YOUR DAY, ${herName.toUpperCase()}! 🎂❤️</h2>
            <p>Happy Birthday to the most amazing girl in the world! ✨</p>
          `;
          bannerEl.classList.add("active");
        }

        if (!hasCelebrated) {
          hasCelebrated = true;
          if (this.confetti) this.confetti.shower(5000);
          if (this.fireworks) {
            this.fireworks.start();
            this.fireworks.burstBatch(5);
            setTimeout(() => this.fireworks.stop(), 8000);
          }
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, "0");
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, "0");
    };

    updateTimer();
    if (window.cdInterval) clearInterval(window.cdInterval);
    window.cdInterval = setInterval(updateTimer, 1000);
  }

  /* ===================================================================
   * 4. RELATIONSHIP STORY (AUTO-HIDE IF EMPTY)
   * =================================================================== */
  renderRelationshipStory(profile) {
    const section = document.getElementById("relationship-story-section");
    const container = document.getElementById("relationship-story-grid");
    const rel = profile.relationship || {};

    if (!section || !container) return;

    const fields = [
      { label: "Date We Met", value: rel.dateMet, icon: "🗓️" },
      { label: "Place We Met", value: rel.placeMet, icon: "📍" },
      { label: "How We Met", value: rel.howMet, icon: "✨" },
      { label: "First Conversation", value: rel.firstConversation, icon: "💬" },
      { label: "Our First Date", value: rel.firstDate, icon: "🌅" },
      { label: "Relationship Anniversary", value: rel.anniversary, icon: "💍" },
      { label: "Favorite Memory Together", value: rel.favoriteMemory, icon: "💖" }
    ].filter(item => item.value && item.value.trim() !== "");

    if (fields.length === 0) {
      section.style.display = "none";
      return;
    }

    section.style.display = "block";
    container.innerHTML = "";

    fields.forEach(f => {
      const card = document.createElement("div");
      card.className = "glass-card";
      card.innerHTML = `
        <div style="font-size:2rem; margin-bottom:0.5rem;">${f.icon}</div>
        <h4 style="font-family:var(--font-ui); color:var(--accent-pink); font-size:0.9rem; text-transform:uppercase; margin-bottom:0.4rem;">${f.label}</h4>
        <p style="font-size:1.05rem; line-height:1.5;">${f.value}</p>
      `;
      container.appendChild(card);
    });
  }

  /* ===================================================================
   * 5. TIMELINE (AUTO-HIDE IF EMPTY)
   * =================================================================== */
  renderTimeline(profile) {
    const section = document.getElementById("timeline-section");
    const container = document.getElementById("timeline-grid");
    const timeline = profile.timeline || [];

    if (!section || !container) return;

    if (timeline.length === 0) {
      section.style.display = "none";
      return;
    }

    section.style.display = "block";
    container.innerHTML = "";

    timeline.forEach(item => {
      const card = document.createElement("div");
      card.className = "glass-card";
      card.style.marginBottom = "1.5rem";
      card.innerHTML = `
        <span class="polaroid-date" style="color:var(--accent-gold);">${item.date || ''}</span>
        <h3 style="font-family:var(--font-heading); font-size:1.5rem; margin:0.4rem 0;">${item.title}</h3>
        <p style="color:var(--text-muted); font-size:1rem;">${item.description}</p>
      `;
      container.appendChild(card);
    });
  }

  /* ===================================================================
   * 6. OPEN WHEN LETTERS
   * =================================================================== */
  renderOpenWhenLetters(profile) {
    const grid = document.getElementById("open-when-grid");
    const letters = profile.openWhenLetters || [];
    if (!grid) return;

    grid.innerHTML = "";
    letters.forEach(item => {
      const card = document.createElement("div");
      card.className = "envelope-card";
      card.innerHTML = `
        <div class="envelope-wrapper">
          <div class="envelope-icon">${item.icon || "💌"}</div>
        </div>
        <h3 class="envelope-title">${item.title}</h3>
        <p class="envelope-subtitle">${item.subtitle || ''}</p>
      `;

      card.addEventListener("click", () => {
        card.classList.add("opened");
        if (this.confetti) this.confetti.burst(30);
        this.openLetterModal(item.title, item.message, item.icon);
      });

      grid.appendChild(card);
    });
  }

  openLetterModal(title, message, icon) {
    const modal = document.getElementById("letter-modal");
    const modalTitle = document.getElementById("letter-modal-title");
    const modalBody = document.getElementById("letter-modal-body");
    const modalIcon = document.getElementById("letter-modal-icon");

    if (!modal) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.textContent = message;
    if (modalIcon) modalIcon.textContent = icon || "💌";

    modal.classList.add("open");
  }

  /* ===================================================================
   * 7. POLAROID GALLERY
   * =================================================================== */
  renderPolaroids(profile) {
    const grid = document.getElementById("polaroid-grid");
    const memories = profile.memories || [];
    if (!grid) return;

    grid.innerHTML = "";
    memories.forEach(mem => {
      const polaroid = document.createElement("div");
      polaroid.className = "polaroid-card";
      polaroid.style.transform = `rotate(${mem.rotation || "0deg"})`;

      polaroid.innerHTML = `
        <div class="polaroid-pin"></div>
        <div class="polaroid-img-wrapper">
          <img src="${mem.image}" alt="${mem.title}" loading="lazy" />
        </div>
        <div class="polaroid-caption">
          <h3>${mem.title}</h3>
          <p>${mem.caption}</p>
          <span class="polaroid-date">${mem.date || ""}</span>
        </div>
      `;

      polaroid.addEventListener("click", () => {
        const modal = document.getElementById("polaroid-modal");
        if (modal) {
          document.getElementById("polaroid-modal-img").src = mem.image;
          document.getElementById("polaroid-modal-title").textContent = mem.title;
          document.getElementById("polaroid-modal-caption").textContent = mem.caption;
          document.getElementById("polaroid-modal-date").textContent = mem.date || "";
          modal.classList.add("open");
        }
      });

      grid.appendChild(polaroid);
    });
  }

  /* ===================================================================
   * 8. LOVE METER
   * =================================================================== */
  renderLoveMeter(profile) {
    const btn = document.getElementById("love-meter-btn");
    const fill = document.getElementById("love-meter-fill");
    const textVal = document.getElementById("love-meter-val");
    const resultMsg = document.getElementById("love-meter-result");

    if (!btn || !fill) return;

    let isRunning = false;

    btn.onclick = () => {
      if (isRunning) return;
      isRunning = true;
      btn.disabled = true;

      resultMsg.classList.remove("show");
      fill.style.width = "0%";
      textVal.textContent = "0%";

      let currentPercent = 0;
      const targetPercent = 9999;
      if (this.confetti) this.confetti.burst(30);

      const interval = setInterval(() => {
        currentPercent += Math.floor(Math.random() * 80) + 40;
        
        if (currentPercent < 100) {
          fill.style.width = currentPercent + "%";
          textVal.textContent = currentPercent + "%";
        } else {
          fill.style.width = "100%";
          fill.classList.add("overflow");
          textVal.textContent = currentPercent + "% OVERFLOW!";
        }

        if (currentPercent >= targetPercent) {
          clearInterval(interval);
          textVal.textContent = "∞ %";
          resultMsg.textContent = "Error... Love level cannot be measured. 😭❤️";
          resultMsg.classList.add("show");

          if (this.fireworks) {
            this.fireworks.start();
            this.fireworks.burstBatch(4);
            setTimeout(() => this.fireworks.stop(), 4000);
          }
          if (this.confetti) this.confetti.shower(3000);

          btn.disabled = false;
          isRunning = false;
        }
      }, 30);
    };
  }

  /* ===================================================================
   * 9. REASONS I LOVE YOU
   * =================================================================== */
  renderReasons(profile) {
    const btn = document.getElementById("reason-btn");
    const textEl = document.getElementById("reason-text");
    const countEl = document.getElementById("reason-count");
    const reasons = profile.reasons || [];

    if (!btn || !textEl || reasons.length === 0) return;

    let currentIndex = 0;
    textEl.textContent = reasons[0];
    if (countEl) countEl.textContent = `Reason #1 of ${reasons.length}`;

    btn.onclick = () => {
      const card = document.getElementById("reason-card");
      if (card) {
        card.classList.add("flip");
        setTimeout(() => card.classList.remove("flip"), 400);
      }

      currentIndex = (currentIndex + 1) % reasons.length;
      textEl.textContent = reasons[currentIndex];

      if (countEl) {
        countEl.textContent = `Reason #${currentIndex + 1} of ${reasons.length}`;
      }

      if (this.confetti) this.confetti.burst(15);
    };
  }

  /* ===================================================================
   * 10. MINI RELATIONSHIP QUIZ
   * =================================================================== */
  renderQuiz(profile) {
    const container = document.getElementById("quiz-container");
    const quizData = profile.quiz || {};
    const questions = quizData.questions || [];

    if (!container || questions.length === 0) return;

    let currentQ = 0;
    let score = 0;

    const renderQuestion = () => {
      if (currentQ >= questions.length) {
        renderResult();
        return;
      }

      const q = questions[currentQ];
      container.innerHTML = `
        <div class="quiz-progress">Question ${currentQ + 1} of ${questions.length}</div>
        <h3 class="quiz-question">${q.question}</h3>
        <div class="quiz-options">
          ${q.options.map((opt, idx) => `
            <button class="quiz-opt-btn" data-index="${idx}">${opt}</button>
          `).join("")}
        </div>
        <div id="quiz-note" class="quiz-note"></div>
      `;

      container.querySelectorAll(".quiz-opt-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const selected = parseInt(e.target.getAttribute("data-index"), 10);
          const isCorrect = selected === q.correctIndex;
          if (isCorrect) score++;

          container.querySelectorAll(".quiz-opt-btn").forEach((b, i) => {
            b.disabled = true;
            if (i === q.correctIndex) b.classList.add("correct");
            else if (i === selected) b.classList.add("wrong");
          });

          const noteEl = document.getElementById("quiz-note");
          if (noteEl && q.cuteNote) {
            noteEl.textContent = q.cuteNote;
            noteEl.classList.add("show");
          }

          if (this.confetti) this.confetti.burst(20);

          setTimeout(() => {
            currentQ++;
            renderQuestion();
          }, 2000);
        });
      });
    };

    const renderResult = () => {
      container.innerHTML = `
        <div class="quiz-result-card">
          <div class="quiz-score-badge">Score: ${score} / ${questions.length} 🏆</div>
          <h3>${quizData.finalCuteResult || "You win 100% of my heart forever!"}</h3>
          <button id="quiz-restart-btn" class="theme-btn">Play Again 🔄</button>
        </div>
      `;

      if (this.confetti) this.confetti.shower(3000);
      document.getElementById("quiz-restart-btn").addEventListener("click", () => {
        currentQ = 0;
        score = 0;
        renderQuestion();
      });
    };

    renderQuestion();
  }

  /* ===================================================================
   * 11. FINAL GIFT BOX
   * =================================================================== */
  renderGiftBox(profile) {
    const box = document.getElementById("gift-box-3d");
    const teaserEl = document.getElementById("gift-teaser");
    const btn = document.getElementById("gift-open-btn");
    const modal = document.getElementById("gift-modal");
    const titleEl = document.getElementById("gift-modal-title");
    const msgEl = document.getElementById("gift-modal-msg");
    const giftConfig = profile.finalGiftBox || {};

    if (teaserEl && giftConfig.teaserText) teaserEl.textContent = giftConfig.teaserText;
    if (btn && giftConfig.buttonText) btn.textContent = giftConfig.buttonText;

    const openGift = () => {
      if (box) box.classList.add("open-anim");

      const flash = document.createElement("div");
      flash.className = "screen-flash";
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 1000);

      if (this.confetti) this.confetti.shower(6000);
      if (this.fireworks) {
        this.fireworks.start();
        this.fireworks.burstBatch(8);
      }

      setTimeout(() => {
        if (modal) {
          if (titleEl && giftConfig.birthdayTitle) titleEl.textContent = giftConfig.birthdayTitle;
          if (msgEl && giftConfig.finalMessageText) msgEl.innerText = giftConfig.finalMessageText;
          modal.classList.add("open");
        }
      }, 1200);
    };

    if (box) box.onclick = openGift;
    if (btn) btn.onclick = openGift;
  }

  /* ===================================================================
   * 12. HIDDEN HEARTS & SECRET EASTER EGG 👀
   * =================================================================== */
  renderHiddenHearts(profile) {
    const container = document.getElementById("hidden-hearts-layer");
    if (!container) return;

    container.innerHTML = "";
    const messages = (profile.reasons && profile.reasons.length > 0) ? profile.reasons : ["You're my favorite person ❤️"];

    for (let i = 0; i < 7; i++) {
      const heart = document.createElement("div");
      heart.className = "hidden-heart-trigger";
      heart.innerHTML = "❤️";
      heart.style.top = (15 + Math.random() * 70) + "%";
      heart.style.left = (5 + Math.random() * 88) + "%";
      heart.style.animationDelay = (Math.random() * 3) + "s";

      if (i === 0) {
        heart.id = "easter-egg-heart";
        heart.title = "Click me multiple times...";
        heart.addEventListener("click", (e) => {
          e.stopPropagation();
          this.easterEggClickCount++;
          if (this.confetti) this.confetti.burst(15);

          if (this.easterEggClickCount >= 5) {
            this.easterEggClickCount = 0;
            this.openLetterModal(
              "YOU FOUND MY SECRET MESSAGE ❤️",
              (profile.finalGiftBox && profile.finalGiftBox.secretMessageText) || "You found the secret heart!",
              "👀"
            );
            if (this.fireworks) {
              this.fireworks.start();
              this.fireworks.burstBatch(3);
              setTimeout(() => this.fireworks.stop(), 3000);
            }
          } else {
            this.showToast(`Heart clicked ${this.easterEggClickCount}/5 times... 👀`);
          }
        });
      } else {
        const msg = messages[i % messages.length];
        heart.addEventListener("click", (e) => {
          e.stopPropagation();
          if (this.confetti) this.confetti.burst(20);
          this.showToast(msg);
        });
      }

      container.appendChild(heart);
    }
  }

  showToast(message) {
    let toast = document.getElementById("heart-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "heart-toast";
      toast.className = "heart-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3500);
  }

  /* ===================================================================
   * 13. MUSIC PLAYER 🎵
   * =================================================================== */
  renderMusicPlayer(profile) {
    const musicBtn = document.getElementById("music-toggle-btn");
    const audioEl = document.getElementById("bg-audio");
    const musicConfig = profile.music || {};

    if (!musicBtn) return;

    const defaultTrack = "assets/music/bgm.mp3";
    const onlineCdnTrack = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3";
    
    let selectedTrack = musicConfig.audioFilePath || defaultTrack;
    if (selectedTrack === "assets/music/romantic-bgm.mp3") {
      selectedTrack = defaultTrack;
    }

    if (audioEl) {
      audioEl.src = selectedTrack;

      // Handle loading error (e.g. 404 on local asset) by automatically switching to the online CDN track
      audioEl.onerror = () => {
        if (audioEl.src !== onlineCdnTrack) {
          console.log("[MusicPlayer] Local track not found, switching to online background track...");
          audioEl.src = onlineCdnTrack;
        }
      };
    }

    let isPlaying = false;

    musicBtn.onclick = () => {
      if (!isPlaying) {
        if (audioEl && audioEl.src) {
          audioEl.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add("playing");
          }).catch(err => {
            console.warn("[MusicPlayer] Error playing primary audio, retrying online track:", err);
            audioEl.src = onlineCdnTrack;
            audioEl.play().then(() => {
              isPlaying = true;
              musicBtn.classList.add("playing");
            }).catch(() => {
              this.startSynthSound();
              isPlaying = true;
              musicBtn.classList.add("playing");
            });
          });
        } else {
          this.startSynthSound();
          isPlaying = true;
          musicBtn.classList.add("playing");
        }
      } else {
        if (audioEl) audioEl.pause();
        this.stopSynthSound();
        isPlaying = false;
        musicBtn.classList.remove("playing");
      }
    };
  }

  startSynthSound() {
    if (this.isSynthPlaying) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.synthAudioContext = new AudioCtx();
      const freqs = [261.63, 329.63, 392.00, 523.25];
      freqs.forEach(freq => {
        const osc = this.synthAudioContext.createOscillator();
        const gain = this.synthAudioContext.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.04, this.synthAudioContext.currentTime);
        osc.connect(gain);
        gain.connect(this.synthAudioContext.destination);
        osc.start();
      });
      this.isSynthPlaying = true;
    } catch(e) {}
  }

  stopSynthSound() {
    if (this.synthAudioContext) {
      this.synthAudioContext.close();
      this.synthAudioContext = null;
    }
    this.isSynthPlaying = false;
  }
}

window.AppRenderer = AppRenderer;
