import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e8461a",
          50: "#fef3ee",
          100: "#fde3d5",
          200: "#fbc4aa",
          300: "#f89a74",
          400: "#f4653c",
          500: "#e8461a",
          600: "#d43510",
          700: "#b02910",
          800: "#8c2314",
          900: "#712013",
          950: "#3d0d07",
        },
        secondary: {
          DEFAULT: "#1a3d5c",
          50: "#f0f6ff",
          100: "#deeaff",
          200: "#c4d7ff",
          300: "#9bbeff",
          400: "#6b9bff",
          500: "#4474ff",
          600: "#2a4ff7",
          700: "#1f3ce3",
          800: "#1f32b6",
          900: "#1a3d5c",
        },
        accent: {
          DEFAULT: "#c8a876",
          light: "#f5f0e8",
        },
        brand: {
          orange: "#e8461a",
          darkBlue: "#1a3d5c",
          cream: "#fdf8f3",
          lightGray: "#f5f5f5",
          midGray: "#666666",
          darkGray: "#333333",
          border: "#e5e5e5",
          footer: "#1a2332",
          footerText: "#9ca3af",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      screens: {
        xs: "480px",
        "2xl": "1440px",
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        card: "0 2px 20px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.15)",
        header: "0 2px 20px rgba(0,0,0,0.1)",
        mega: "0 8px 40px rgba(0,0,0,0.12)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.65) 100%)",
        "card-gradient":
          "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
        "collection-gradient":
          "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
