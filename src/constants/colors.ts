// src/constants/colors.ts

const COLORS = {
  background: {
    primary: "#0a0a0a", // main card background
    secondary: "#161b22", // profile card background
    tertiary: "#0f141a", // small panels / image background
  },
  border: {
    default: "#363636", // main border
    card: "#2a2f36", // profile card border
    input: "#30363d", // input/file borders
  },
  text: {
    primary: "#FFFFFF", // main text
    secondary: "#D1D5DB", // secondary/light gray text
    muted: "#9CA3AF", // placeholder / subtle text
    error: "#EF4444", // error text
  },
  accent: {
    blue: "#2563EB", // buttons / focus / hover
    blueHover: "#1D4ED8",
    red: "#EF4444", // logout button
    redHover: "#B91C1C",
  },
  status: {
    online: "#22C55E",
    offline: "#6B7280",
    busy: "#EF4444",
  },
};

export default COLORS;
