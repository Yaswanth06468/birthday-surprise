/**
 * Romantic Setup Wizard & Dashboard Controller
 */

class WizardController {
  constructor(store, themeEngine, appRenderer) {
    this.store = store;
    this.themeEngine = themeEngine;
    this.appRenderer = appRenderer;
    this.currentStep = 1;
    this.totalSteps = 6;
    this.activeProfile = this.store.getActiveProfile();

    this.initElements();
    this.bindEvents();
    this.renderDashboardProfiles();
  }

  initElements() {
    this.wizardApp = document.getElementById("wizard-app");
    this.dashboardApp = document.getElementById("dashboard-app");
    this.surpriseApp = document.getElementById("surprise-app");
  }

  bindEvents() {
    // Top floating buttons
    const btnOpenDashboard = document.getElementById("btn-open-dashboard");
    const btnOpenWizard = document.getElementById("btn-open-wizard");
    const btnCreateNewProfile = document.getElementById("btn-create-profile");

    if (btnOpenDashboard) {
      btnOpenDashboard.addEventListener("click", () => this.showView("dashboard"));
    }
    if (btnOpenWizard) {
      btnOpenWizard.addEventListener("click", () => this.openWizard(this.store.getActiveProfile()));
    }
    if (btnCreateNewProfile) {
      btnCreateNewProfile.addEventListener("click", () => {
        const name = prompt("Enter profile title (e.g. Sarah's Birthday ❤️):", "New Birthday Surprise");
        if (name) {
          const newProf = this.store.createNewProfile(name);
          this.openWizard(newProf);
        }
      });
    }

    // Stepper navigation buttons
    const btnPrev = document.getElementById("wiz-btn-prev");
    const btnNext = document.getElementById("wiz-btn-next");
    const btnSave = document.getElementById("wiz-btn-save");
    const btnPreview = document.getElementById("wiz-btn-preview");
    const btnReset = document.getElementById("wiz-btn-reset");
    const btnShare = document.getElementById("wiz-btn-share");

    if (btnPrev) btnPrev.addEventListener("click", () => this.changeStep(-1));
    if (btnNext) btnNext.addEventListener("click", () => this.changeStep(1));
    if (btnSave) btnSave.addEventListener("click", () => this.saveAndOpenSurprise());
    if (btnPreview) btnPreview.addEventListener("click", () => this.openLivePreview());
    if (btnReset) btnReset.addEventListener("click", () => this.confirmReset());
    if (btnShare) btnShare.addEventListener("click", () => this.shareProfileLink());

    // Step item indicator clicks
    document.querySelectorAll(".step-item").forEach(item => {
      item.addEventListener("click", () => {
        const step = parseInt(item.getAttribute("data-step"), 10);
        if (step) this.goToStep(step);
      });
    });

    // Theme Preset buttons
    document.querySelectorAll(".theme-preset-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const preset = btn.getAttribute("data-preset");
        this.selectThemePreset(preset);
      });
    });
  }

  showView(viewName) {
    if (this.wizardApp) this.wizardApp.classList.add("view-hidden");
    if (this.dashboardApp) this.dashboardApp.classList.add("view-hidden");
    if (this.surpriseApp) this.surpriseApp.classList.add("view-hidden");

    if (viewName === "wizard" && this.wizardApp) {
      this.wizardApp.classList.remove("view-hidden");
    } else if (viewName === "dashboard" && this.dashboardApp) {
      this.renderDashboardProfiles();
      this.dashboardApp.classList.remove("view-hidden");
    } else if (viewName === "surprise" && this.surpriseApp) {
      this.surpriseApp.classList.remove("view-hidden");
      if (this.appRenderer) this.appRenderer.render();
    }
  }

  renderDashboardProfiles() {
    const container = document.getElementById("dashboard-profiles-grid");
    if (!container) return;

    const profiles = this.store.getAllProfiles();
    const activeId = this.store.getActiveProfile().id;

    container.innerHTML = "";
    profiles.forEach(prof => {
      const card = document.createElement("div");
      card.className = `profile-card ${prof.id === activeId ? "active" : ""}`;
      const photo = (prof.herDetails && prof.herDetails.profilePhoto) || "assets/images/photo1.svg";
      const name = (prof.herDetails && prof.herDetails.name) || "Surprise";

      card.innerHTML = `
        <img class="profile-avatar" src="${photo}" alt="${name}" />
        <h3 class="profile-card-title">${prof.title || name + "'s Surprise"}</h3>
        <div class="profile-card-date">Created: ${new Date(prof.createdAt).toLocaleDateString()}</div>
        <div class="profile-actions">
          <button class="theme-btn btn-sm btn-open-prof" data-id="${prof.id}">Open ❤️</button>
          <button class="theme-btn btn-sm btn-outline btn-edit-prof" data-id="${prof.id}">Edit ✏️</button>
          ${profiles.length > 1 ? `<button class="btn-remove-item btn-del-prof" data-id="${prof.id}" title="Delete">✕</button>` : ''}
        </div>
      `;

      card.querySelector(".btn-open-prof").addEventListener("click", () => {
        this.store.setActiveProfileId(prof.id);
        this.showView("surprise");
      });
      card.querySelector(".btn-edit-prof").addEventListener("click", () => {
        this.store.setActiveProfileId(prof.id);
        this.openWizard(prof);
      });
      const delBtn = card.querySelector(".btn-del-prof");
      if (delBtn) {
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (confirm(`Are you sure you want to delete "${prof.title}"?`)) {
            this.store.deleteProfile(prof.id);
            this.renderDashboardProfiles();
          }
        });
      }

      container.appendChild(card);
    });
  }

  openWizard(profile) {
    this.activeProfile = profile || this.store.getActiveProfile();
    this.loadFormFromProfile();
    this.goToStep(1);
    this.showView("wizard");
  }

  goToStep(step) {
    if (step < 1 || step > this.totalSteps) return;
    this.currentStep = step;

    // Update Form Steps Visibility
    document.querySelectorAll(".form-step-card").forEach((card, idx) => {
      if (idx + 1 === step) card.classList.add("active");
      else card.classList.remove("active");
    });

    // Update Stepper Bar Indicator
    document.querySelectorAll(".step-item").forEach((item, idx) => {
      const itemStep = idx + 1;
      item.classList.remove("active", "completed");
      if (itemStep === step) item.classList.add("active");
      else if (itemStep < step) item.classList.add("completed");
    });

    // Update Buttons
    const btnPrev = document.getElementById("wiz-btn-prev");
    const btnNext = document.getElementById("wiz-btn-next");
    const btnSave = document.getElementById("wiz-btn-save");

    if (btnPrev) btnPrev.style.display = step === 1 ? "none" : "inline-flex";
    if (btnNext) btnNext.style.display = step === this.totalSteps ? "none" : "inline-flex";
    if (btnSave) btnSave.style.display = step === this.totalSteps ? "inline-flex" : "none";
  }

  changeStep(delta) {
    this.readFormValues();
    this.goToStep(this.currentStep + delta);
  }

  /* ===================================================================
   * READ & WRITE FORM VALUES
   * =================================================================== */
  loadFormFromProfile() {
    const p = this.activeProfile;

    // Step 1 — Her Details
    this.setVal("wiz-her-name", p.herDetails.name);
    this.setVal("wiz-her-nickname", p.herDetails.nickname);
    this.setVal("wiz-her-birthday", p.herDetails.birthdayDate);
    this.setVal("wiz-her-color", p.herDetails.favoriteColor || "#ff6584");
    this.setVal("wiz-her-desc", p.herDetails.shortDescription);
    const photoPreview = document.getElementById("wiz-her-photo-preview");
    if (photoPreview && p.herDetails.profilePhoto) photoPreview.src = p.herDetails.profilePhoto;

    // Step 2 — Relationship
    this.setVal("wiz-your-name", p.relationship.yourName);
    this.setVal("wiz-date-met", p.relationship.dateMet);
    this.setVal("wiz-place-met", p.relationship.placeMet);
    this.setVal("wiz-how-met", p.relationship.howMet);
    this.setVal("wiz-first-conv", p.relationship.firstConversation);
    this.setVal("wiz-first-date", p.relationship.firstDate);
    this.setVal("wiz-anniversary", p.relationship.anniversary);
    this.setVal("wiz-fav-memory", p.relationship.favoriteMemory);

    // Step 3 — Love Letter
    this.setVal("wiz-letter-title", p.loveLetter.title);
    this.setVal("wiz-letter-content", p.loveLetter.content);
    this.updateLetterLivePreview();

    // Render Dynamic Lists
    this.renderReasonsList();
    this.renderMemoriesList();
    this.renderTimelineList();
    this.renderEnvelopesList();
    this.renderQuizList();

    // Step 5 — Final Surprise & Password
    this.setVal("wiz-gift-title", p.finalGiftBox.birthdayTitle);
    this.setVal("wiz-gift-teaser", p.finalGiftBox.teaserText);
    this.setVal("wiz-gift-msg", p.finalGiftBox.finalMessageText);
    this.setVal("wiz-secret-msg", p.finalGiftBox.secretMessageText);

    const passEnabled = document.getElementById("wiz-pass-enabled");
    if (passEnabled) passEnabled.checked = p.passwordProtection ? p.passwordProtection.enabled : true;
    this.setVal("wiz-pass-secret", p.passwordProtection ? p.passwordProtection.secretPassword : "love");

    // Step 6 — Theme
    this.selectThemePreset(p.theme ? p.theme.preset : "romantic");

    // Bind Image Upload Readers
    this.bindImageUploaders();
  }

  readFormValues() {
    const p = this.activeProfile;

    p.herDetails.name = this.getVal("wiz-her-name") || "Sophia";
    p.herDetails.nickname = this.getVal("wiz-her-nickname");
    p.herDetails.birthdayDate = this.getVal("wiz-her-birthday") || "2026-08-15T00:00:00";
    p.herDetails.favoriteColor = this.getVal("wiz-her-color");
    p.herDetails.shortDescription = this.getVal("wiz-her-desc");

    p.relationship.yourName = this.getVal("wiz-your-name") || "Alex";
    p.relationship.dateMet = this.getVal("wiz-date-met");
    p.relationship.placeMet = this.getVal("wiz-place-met");
    p.relationship.howMet = this.getVal("wiz-how-met");
    p.relationship.firstConversation = this.getVal("wiz-first-conv");
    p.relationship.firstDate = this.getVal("wiz-first-date");
    p.relationship.anniversary = this.getVal("wiz-anniversary");
    p.relationship.favoriteMemory = this.getVal("wiz-fav-memory");

    p.loveLetter.title = this.getVal("wiz-letter-title") || "Write Your Birthday Message";
    p.loveLetter.content = this.getVal("wiz-letter-content") || "";

    p.finalGiftBox.birthdayTitle = this.getVal("wiz-gift-title") || `Happy Birthday, ${p.herDetails.name} ❤️`;
    p.finalGiftBox.teaserText = this.getVal("wiz-gift-teaser") || "Okay... this is the final surprise.";
    p.finalGiftBox.finalMessageText = this.getVal("wiz-gift-msg") || "";
    p.finalGiftBox.secretMessageText = this.getVal("wiz-secret-msg") || "";

    if (!p.passwordProtection) p.passwordProtection = {};
    const passEnabled = document.getElementById("wiz-pass-enabled");
    p.passwordProtection.enabled = passEnabled ? passEnabled.checked : true;
    p.passwordProtection.secretPassword = this.getVal("wiz-pass-secret") || "love";

    this.store.saveActiveProfile(p);
  }

  bindImageUploaders() {
    // Her Profile Photo
    const photoInput = document.getElementById("wiz-her-photo-input");
    if (photoInput) {
      photoInput.addEventListener("change", async (e) => {
        if (e.target.files[0]) {
          const b64 = await window.readFileAsBase64(e.target.files[0]);
          this.activeProfile.herDetails.profilePhoto = b64;
          document.getElementById("wiz-her-photo-preview").src = b64;
          this.store.saveActiveProfile(this.activeProfile);
        }
      });
    }

    // Audio File Upload
    const audioInput = document.getElementById("wiz-audio-input");
    if (audioInput) {
      audioInput.addEventListener("change", async (e) => {
        if (e.target.files[0]) {
          const b64 = await window.readFileAsBase64(e.target.files[0]);
          this.activeProfile.music.audioFilePath = b64;
          document.getElementById("wiz-audio-filename").textContent = `Selected: ${e.target.files[0].name}`;
          this.store.saveActiveProfile(this.activeProfile);
        }
      });
    }
  }

  /* ===================================================================
   * DYNAMIC LIST RENDERERS (REASONS, MEMORIES, TIMELINE, ENVELOPES, QUIZ)
   * =================================================================== */
  renderReasonsList() {
    const container = document.getElementById("wiz-reasons-container");
    if (!container) return;
    container.innerHTML = "";

    const reasons = this.activeProfile.reasons || [];
    reasons.forEach((r, idx) => {
      const item = document.createElement("div");
      item.className = "dynamic-item-card";
      item.innerHTML = `
        <div class="dynamic-item-header">
          <span class="dynamic-item-title">Reason #${idx + 1}</span>
          <button class="btn-remove-item" data-idx="${idx}">✕</button>
        </div>
        <input type="text" class="form-control reason-input" value="${r}" placeholder="Write a reason..." />
      `;
      item.querySelector(".reason-input").addEventListener("input", (e) => {
        this.activeProfile.reasons[idx] = e.target.value;
      });
      item.querySelector(".btn-remove-item").addEventListener("click", () => {
        this.activeProfile.reasons.splice(idx, 1);
        this.renderReasonsList();
      });
      container.appendChild(item);
    });

    const addBtn = document.getElementById("wiz-add-reason-btn");
    if (addBtn) {
      addBtn.onclick = () => {
        this.activeProfile.reasons.push("Because you make every moment special.");
        this.renderReasonsList();
      };
    }
  }

  renderMemoriesList() {
    const container = document.getElementById("wiz-memories-container");
    if (!container) return;
    container.innerHTML = "";

    const memories = this.activeProfile.memories || [];
    memories.forEach((mem, idx) => {
      const item = document.createElement("div");
      item.className = "dynamic-item-card";
      item.innerHTML = `
        <div class="dynamic-item-header">
          <span class="dynamic-item-title">Memory #${idx + 1}: ${mem.title || "Photo"}</span>
          <button class="btn-remove-item">✕</button>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Title</label>
            <input type="text" class="form-control mem-title" value="${mem.title || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label">Date</label>
            <input type="text" class="form-control mem-date" value="${mem.date || ''}" />
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Caption</label>
            <input type="text" class="form-control mem-caption" value="${mem.caption || ''}" />
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Photo Upload</label>
            <input type="file" class="form-control mem-file" accept="image/*" />
            ${mem.image ? `<img src="${mem.image}" style="height:60px; border-radius:4px; margin-top:0.5rem;" />` : ''}
          </div>
        </div>
      `;

      item.querySelector(".mem-title").addEventListener("input", e => mem.title = e.target.value);
      item.querySelector(".mem-date").addEventListener("input", e => mem.date = e.target.value);
      item.querySelector(".mem-caption").addEventListener("input", e => mem.caption = e.target.value);
      item.querySelector(".mem-file").addEventListener("change", async e => {
        if (e.target.files[0]) {
          mem.image = await window.readFileAsBase64(e.target.files[0]);
          this.renderMemoriesList();
        }
      });
      item.querySelector(".btn-remove-item").addEventListener("click", () => {
        this.activeProfile.memories.splice(idx, 1);
        this.renderMemoriesList();
      });

      container.appendChild(item);
    });

    const addBtn = document.getElementById("wiz-add-memory-btn");
    if (addBtn) {
      addBtn.onclick = () => {
        this.activeProfile.memories.push({
          id: "mem-" + Date.now(),
          title: "New Memory",
          caption: "A special moment together ❤️",
          date: new Date().toLocaleDateString(),
          image: "assets/images/photo1.svg",
          rotation: (Math.random() * 6 - 3) + "deg"
        });
        this.renderMemoriesList();
      };
    }
  }

  renderTimelineList() {
    const container = document.getElementById("wiz-timeline-container");
    if (!container) return;
    container.innerHTML = "";

    const timeline = this.activeProfile.timeline || [];
    timeline.forEach((tl, idx) => {
      const item = document.createElement("div");
      item.className = "dynamic-item-card";
      item.innerHTML = `
        <div class="dynamic-item-header">
          <span class="dynamic-item-title">Event #${idx + 1}: ${tl.title || "Event"}</span>
          <button class="btn-remove-item">✕</button>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Date</label>
            <input type="text" class="form-control tl-date" value="${tl.date || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label">Title</label>
            <input type="text" class="form-control tl-title" value="${tl.title || ''}" />
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Description</label>
            <textarea class="form-control tl-desc">${tl.description || ''}</textarea>
          </div>
        </div>
      `;

      item.querySelector(".tl-date").addEventListener("input", e => tl.date = e.target.value);
      item.querySelector(".tl-title").addEventListener("input", e => tl.title = e.target.value);
      item.querySelector(".tl-desc").addEventListener("input", e => tl.description = e.target.value);
      item.querySelector(".btn-remove-item").addEventListener("click", () => {
        this.activeProfile.timeline.splice(idx, 1);
        this.renderTimelineList();
      });

      container.appendChild(item);
    });

    const addBtn = document.getElementById("wiz-add-timeline-btn");
    if (addBtn) {
      addBtn.onclick = () => {
        this.activeProfile.timeline.push({
          id: "tl-" + Date.now(),
          date: new Date().toLocaleDateString(),
          title: "New Timeline Moment",
          description: "Write something special about this day..."
        });
        this.renderTimelineList();
      };
    }
  }

  renderEnvelopesList() {
    const container = document.getElementById("wiz-envelopes-container");
    if (!container) return;
    container.innerHTML = "";

    const letters = this.activeProfile.openWhenLetters || [];
    letters.forEach((env, idx) => {
      const item = document.createElement("div");
      item.className = "dynamic-item-card";
      item.innerHTML = `
        <div class="dynamic-item-header">
          <span class="dynamic-item-title">${env.icon || '💌'} Envelope #${idx + 1}: ${env.title}</span>
          <button class="btn-remove-item">✕</button>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Icon / Emoji</label>
            <input type="text" class="form-control env-icon" value="${env.icon || '💌'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Title</label>
            <input type="text" class="form-control env-title" value="${env.title || ''}" />
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Subtitle</label>
            <input type="text" class="form-control env-sub" value="${env.subtitle || ''}" />
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Letter Message</label>
            <textarea class="form-control env-msg">${env.message || ''}</textarea>
          </div>
        </div>
      `;

      item.querySelector(".env-icon").addEventListener("input", e => env.icon = e.target.value);
      item.querySelector(".env-title").addEventListener("input", e => env.title = e.target.value);
      item.querySelector(".env-sub").addEventListener("input", e => env.subtitle = e.target.value);
      item.querySelector(".env-msg").addEventListener("input", e => env.message = e.target.value);
      item.querySelector(".btn-remove-item").addEventListener("click", () => {
        this.activeProfile.openWhenLetters.splice(idx, 1);
        this.renderEnvelopesList();
      });

      container.appendChild(item);
    });

    const addBtn = document.getElementById("wiz-add-envelope-btn");
    if (addBtn) {
      addBtn.onclick = () => {
        this.activeProfile.openWhenLetters.push({
          id: "env-" + Date.now(),
          icon: "💌",
          title: "Open when you need love",
          subtitle: "Just for you",
          message: "Whenever you read this, know that I am always here loving you!"
        });
        this.renderEnvelopesList();
      };
    }
  }

  renderQuizList() {
    const container = document.getElementById("wiz-quiz-container");
    if (!container) return;
    container.innerHTML = "";

    const questions = (this.activeProfile.quiz && this.activeProfile.quiz.questions) || [];
    questions.forEach((q, qIdx) => {
      const item = document.createElement("div");
      item.className = "dynamic-item-card";
      item.innerHTML = `
        <div class="dynamic-item-header">
          <span class="dynamic-item-title">Question #${qIdx + 1}</span>
          <button class="btn-remove-item">✕</button>
        </div>
        <div class="form-group">
          <label class="form-label">Question Text</label>
          <input type="text" class="form-control q-text" value="${q.question || ''}" />
        </div>
        <div class="form-grid">
          ${q.options.map((opt, oIdx) => `
            <div class="form-group">
              <label class="form-label">Option ${String.fromCharCode(65 + oIdx)} ${q.correctIndex === oIdx ? '(Correct)' : ''}</label>
              <input type="text" class="form-control q-opt" data-oidx="${oIdx}" value="${opt}" />
            </div>
          `).join("")}
        </div>
        <div class="form-group">
          <label class="form-label">Correct Option Index (0 = A, 1 = B, 2 = C, 3 = D)</label>
          <input type="number" min="0" max="3" class="form-control q-correct" value="${q.correctIndex || 0}" />
        </div>
        <div class="form-group">
          <label class="form-label">Cute Note on Selection</label>
          <input type="text" class="form-control q-note" value="${q.cuteNote || ''}" />
        </div>
      `;

      item.querySelector(".q-text").addEventListener("input", e => q.question = e.target.value);
      item.querySelectorAll(".q-opt").forEach(input => {
        input.addEventListener("input", e => {
          const oidx = parseInt(input.getAttribute("data-oidx"), 10);
          q.options[oidx] = e.target.value;
        });
      });
      item.querySelector(".q-correct").addEventListener("input", e => q.correctIndex = parseInt(e.target.value, 10) || 0);
      item.querySelector(".q-note").addEventListener("input", e => q.cuteNote = e.target.value);

      item.querySelector(".btn-remove-item").addEventListener("click", () => {
        this.activeProfile.quiz.questions.splice(qIdx, 1);
        this.renderQuizList();
      });

      container.appendChild(item);
    });

    const addBtn = document.getElementById("wiz-add-question-btn");
    if (addBtn) {
      addBtn.onclick = () => {
        if (!this.activeProfile.quiz) this.activeProfile.quiz = { questions: [] };
        this.activeProfile.quiz.questions.push({
          question: "Where did we go on our first date?",
          options: ["Park walk", "Movie theater", "Cozy cafe", "Beach sunset"],
          correctIndex: 2,
          cuteNote: "That cafe holds our sweetest memories! ❤️"
        });
        this.renderQuizList();
      };
    }
  }

  updateLetterLivePreview() {
    const content = this.getVal("wiz-letter-content") || "";
    const previewEl = document.getElementById("wiz-letter-preview");
    if (previewEl) {
      previewEl.innerText = content;
    }
  }

  selectThemePreset(presetKey) {
    if (!this.activeProfile.theme) this.activeProfile.theme = {};
    this.activeProfile.theme.preset = presetKey;

    document.querySelectorAll(".theme-preset-btn").forEach(btn => {
      if (btn.getAttribute("data-preset") === presetKey) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    this.themeEngine.applyTheme(this.activeProfile.theme);
  }

  saveAndOpenSurprise() {
    this.readFormValues();
    alert("Surprise Saved Successfully! ❤️");
    this.showView("surprise");
  }

  openLivePreview() {
    this.readFormValues();
    this.showView("surprise");
  }

  confirmReset() {
    if (confirm("Are you sure you want to reset all fields to default?")) {
      this.activeProfile = this.store.resetCurrentProfile();
      this.loadFormFromProfile();
      alert("Reset to default romantic template!");
    }
  }

  shareProfileLink() {
    this.readFormValues();
    const shareUrl = this.store.exportShareableUrl(this.activeProfile);
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Shareable link copied to clipboard! Anyone with this link can view your customized surprise ❤️:\n\n" + shareUrl);
    }).catch(() => {
      prompt("Copy your shareable link below:", shareUrl);
    });
  }

  getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value : "";
  }

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined && val !== null) el.value = val;
  }
}

window.WizardController = WizardController;
