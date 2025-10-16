import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          bg: "#FAF8F4",
          text: "#3c3d3b",
          "text-dark": "#2a2b29",
          "text-muted": "#6B6B68",
          "text-subtle": "#8A8984",
          border: "#E5E1DB",
        },
        // Dark mode colors
        dark: {
          bg: "#262624",
          "bg-elevated": "#1a1a18",
          text: "#FAF8F4",
          "text-muted": "#c5c5c0",
          "text-subtle": "#9a9a98",
          border: "#4a4a48",
        },
        // Accent colors
        accent: {
          green: "#85A78D",
          yellow: "#f4b860",
        },
      },
    },
  },
  plugins: [],
};

export default config;
