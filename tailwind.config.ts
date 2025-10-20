import type { Config } from "tailwindcss";
import { THEME_COLORS } from "./src/constants/theme";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light mode colors - imported from single source of truth
        light: {
          bg: THEME_COLORS.light.bg,
          text: THEME_COLORS.light.text,
          "text-dark": THEME_COLORS.light.textDark,
          "text-muted": THEME_COLORS.light.textMuted,
          "text-subtle": THEME_COLORS.light.textSubtle,
          border: THEME_COLORS.light.border,
        },
        // Dark mode colors - imported from single source of truth
        dark: {
          bg: THEME_COLORS.dark.bg,
          "bg-elevated": THEME_COLORS.dark.bgElevated,
          text: THEME_COLORS.dark.text,
          "text-muted": THEME_COLORS.dark.textMuted,
          "text-subtle": THEME_COLORS.dark.textSubtle,
          border: THEME_COLORS.dark.border,
        },
        // Accent colors - imported from single source of truth
        accent: {
          green: THEME_COLORS.accent.green,
          yellow: THEME_COLORS.accent.yellow,
        },
      },
    },
  },
  plugins: [],
};

export default config;
