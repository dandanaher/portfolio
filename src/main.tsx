import { createRoot } from "react-dom/client";

import App from "@/App";
import "@/index.css";
import { initThemeColors } from "@/constants/theme";

// Initialize CSS variables from theme.ts (single source of truth)
initThemeColors();

createRoot(document.getElementById("root")!).render(<App />);
