/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dae6ff",
          200: "#bdd2ff",
          300: "#90b4ff",
          400: "#5b8bff",
          500: "#3563e9",
          600: "#254bd1",
          700: "#1e3ba8",
          800: "#1d3485",
          900: "#1d2f6b",
        },
        ink: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d5d9e2",
          300: "#b0b8c9",
          400: "#8590aa",
          500: "#66728e",
          600: "#515b75",
          700: "#424a5f",
          800: "#3a4051",
          900: "#0e1116",
          950: "#070a0f",
        },
        accent: {
          400: "#ffd166",
          500: "#ffb703",
          600: "#f59e0b",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,24,40,.04), 0 8px 24px -12px rgba(16,24,40,.18)",
        lift: "0 18px 40px -18px rgba(16,24,40,.35)",
        glow: "0 0 0 1px rgba(53,99,233,.25), 0 12px 40px -12px rgba(53,99,233,.55)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pop: {
          "0%": { transform: "scale(.8)", opacity: 0 },
          "60%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        floaty: "floaty 5s ease-in-out infinite",
        "fade-up": "fade-up .5s ease-out both",
        marquee: "marquee-x 28s linear infinite",
        pop: "pop .28s ease-out both",
      },
    },
  },
  plugins: [],
};
