/**
 * ============================================
 * SINGLE SOURCE OF TRUTH FOR ALL THEME COLORS
 * ============================================
 *
 * Change hex codes here ONLY - they will automatically update everywhere:
 * - Tailwind classes (via tailwind.config.ts import)
 * - CSS :root variables (via initThemeColors function)
 * - All components using theme colors
 */

export const THEME_COLORS = {
  light: {
    bg: "#FAF8F4",
    text: "#3c3d3b",
    textDark: "#2a2b29",
    textMuted: "#6B6B68",
    textSubtle: "#8A8984",
    border: "#E5E1DB",
  },
  dark: {
    bg: "#080A0A",
    bgElevated: "#0f1212",
    text: "#FAF8F4",
    textMuted: "#c5c5c0",
    textSubtle: "#9a9a98",
    border: "#4a4a48",
  },
  accent: {
    green: "#85A78D",
    yellow: "#f4b860",
  },
} as const;

/**
 * Initialize CSS custom properties from THEME_COLORS
 * This is called automatically on app load to sync CSS variables with THEME_COLORS
 */
export const initThemeColors = () => {
  const root = document.documentElement;

  // Set light mode CSS variables
  root.style.setProperty('--color-light-bg', THEME_COLORS.light.bg);
  root.style.setProperty('--color-light-text', THEME_COLORS.light.text);

  // Set dark mode CSS variables
  root.style.setProperty('--color-dark-bg', THEME_COLORS.dark.bg);
  root.style.setProperty('--color-dark-text', THEME_COLORS.dark.text);
};

/**
 * Tailwind CSS class mappings for theme colors
 * Use these instead of hardcoded color values
 */
export const THEME_CLASSES = {
  light: {
    bg: "bg-light-bg",
    text: "text-light-text",
    textDark: "text-light-text-dark",
    textMuted: "text-light-text-muted",
    textSubtle: "text-light-text-subtle",
    border: "border-light-border",
  },
  dark: {
    bg: "dark:bg-dark-bg",
    bgElevated: "dark:bg-dark-bg-elevated",
    text: "dark:text-dark-text",
    textMuted: "dark:text-dark-text-muted",
    textSubtle: "dark:text-dark-text-subtle",
    border: "dark:border-dark-border",
  },
  accent: {
    green: "bg-accent-green",
    greenText: "text-accent-green",
    yellow: "bg-accent-yellow",
    yellowText: "text-accent-yellow",
  },
} as const;

/**
 * Common theme-aware class combinations
 */
export const THEME_COMBINATIONS = {
  background: "bg-light-bg dark:bg-dark-bg",
  text: "text-light-text dark:text-dark-text",
  textDark: "text-light-text-dark dark:text-dark-text",
  textMuted: "text-light-text-muted dark:text-dark-text-muted",
  textSubtle: "text-light-text-subtle dark:text-dark-text-subtle",
  border: "border-light-border dark:border-dark-border",
} as const;
