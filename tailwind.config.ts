import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        espresso: "#3B2419",
        leather: "#8B5E3C",
        sand: "#E8D8C3",
        cream: "#F8F4ED",
        ink: "#171717",
        paper: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 7vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      spacing: { section: "clamp(4rem, 9vw, 8rem)" },
      borderRadius: { card: "2px", control: "999px" },
      boxShadow: { lift: "0 18px 40px -22px rgba(59, 36, 25, 0.45)" },
      transitionTimingFunction: { leather: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
    },
  },
  plugins: [],
};

export default config;
