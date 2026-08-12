/**
 * Dynamic Theme Engine
 * Applies theme presets or custom color choices to document root variables.
 */

const THEME_PRESETS = {
  romantic: {
    name: "🌹 Romantic",
    bgGradient: "linear-gradient(135deg, #0d0614 0%, #1a0b2e 40%, #2a0826 70%, #120318 100%)",
    accentPink: "#ff6584",
    accentRose: "#ff477e",
    accentGold: "#ffd166",
    accentPurple: "#9d4edd",
    accentSoftPink: "#f7aef8"
  },
  midnight: {
    name: "🌌 Midnight",
    bgGradient: "linear-gradient(135deg, #03071e 0%, #0f172a 40%, #1e1b4b 70%, #090d16 100%)",
    accentPink: "#38bdf8",
    accentRose: "#818cf8",
    accentGold: "#fde047",
    accentPurple: "#c084fc",
    accentSoftPink: "#bae6fd"
  },
  "soft-pink": {
    name: "🌸 Soft Pink",
    bgGradient: "linear-gradient(135deg, #2a081a 0%, #4a1228 40%, #360720 70%, #1c0310 100%)",
    accentPink: "#ff85a1",
    accentRose: "#fbb1bd",
    accentGold: "#ffe5ec",
    accentPurple: "#f72585",
    accentSoftPink: "#ffccd5"
  },
  elegant: {
    name: "✨ Elegant",
    bgGradient: "linear-gradient(135deg, #121212 0%, #1f1f1f 40%, #2d241e 70%, #0a0a0a 100%)",
    accentPink: "#e0a96d",
    accentRose: "#e2c044",
    accentGold: "#ffb703",
    accentPurple: "#b08968",
    accentSoftPink: "#f5ebe0"
  },
  dreamy: {
    name: "💜 Dreamy",
    bgGradient: "linear-gradient(135deg, #130024 0%, #240046 40%, #3c096c 70%, #0a0014 100%)",
    accentPink: "#c77dff",
    accentRose: "#e0aaff",
    accentGold: "#ff9e00",
    accentPurple: "#7b2cbf",
    accentSoftPink: "#f72585"
  }
};

class ThemeEngine {
  constructor() {
    this.presets = THEME_PRESETS;
  }

  applyTheme(themeConfig) {
    if (!themeConfig) return;
    const root = document.documentElement;

    let selectedPreset = THEME_PRESETS[themeConfig.preset];
    if (!selectedPreset && themeConfig.preset !== 'custom') {
      selectedPreset = THEME_PRESETS.romantic;
    }

    const bgGradient = themeConfig.preset === 'custom' && themeConfig.bgGradient ? themeConfig.bgGradient : (selectedPreset ? selectedPreset.bgGradient : THEME_PRESETS.romantic.bgGradient);
    const accentPink = themeConfig.preset === 'custom' && themeConfig.accentPink ? themeConfig.accentPink : (selectedPreset ? selectedPreset.accentPink : THEME_PRESETS.romantic.accentPink);
    const accentRose = themeConfig.preset === 'custom' && themeConfig.accentRose ? themeConfig.accentRose : (selectedPreset ? selectedPreset.accentRose : THEME_PRESETS.romantic.accentRose);
    const accentGold = themeConfig.preset === 'custom' && themeConfig.accentGold ? themeConfig.accentGold : (selectedPreset ? selectedPreset.accentGold : THEME_PRESETS.romantic.accentGold);

    root.style.setProperty('--bg-gradient', bgGradient);
    root.style.setProperty('--accent-pink', accentPink);
    root.style.setProperty('--accent-rose', accentRose);
    root.style.setProperty('--accent-gold', accentGold);
  }
}

window.THEME_PRESETS = THEME_PRESETS;
window.ThemeEngine = ThemeEngine;
