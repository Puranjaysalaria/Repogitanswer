import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        code: ["var(--font-code)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "background-shine": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "blob": {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)"
          },
          "50%": { 
            boxShadow: "0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.4)"
          },
        },
        "neon-flicker": {
          "0%, 100%": { opacity: "1" },
          "41.99%": { opacity: "1" },
          "42%": { opacity: "0.8" },
          "43%": { opacity: "1" },
          "45.99%": { opacity: "1" },
          "46%": { opacity: "0.8" },
          "46.5%": { opacity: "1" },
        },
        "float-cube-1": {
          "0%, 100%": { 
            transform: "rotateX(45deg) rotateY(45deg) translateY(0) translateZ(0)"
          },
          "50%": { 
            transform: "rotateX(60deg) rotateY(60deg) translateY(-30px) translateZ(50px)"
          },
        },
        "float-cube-2": {
          "0%, 100%": { 
            transform: "rotateX(-30deg) rotateY(-30deg) translateY(0) translateZ(0)"
          },
          "50%": { 
            transform: "rotateX(-45deg) rotateY(-45deg) translateY(30px) translateZ(40px)"
          },
        },
        "float-cube-3": {
          "0%, 100%": { 
            transform: "rotateX(60deg) rotateY(-45deg) translateY(0) translateZ(0)"
          },
          "50%": { 
            transform: "rotateX(75deg) rotateY(-60deg) translateY(-25px) translateZ(35px)"
          },
        },
        "float-cube-4": {
          "0%, 100%": { 
            transform: "rotateX(-45deg) rotateY(60deg) translateY(0) translateZ(0)"
          },
          "50%": { 
            transform: "rotateX(-60deg) rotateY(75deg) translateY(35px) translateZ(45px)"
          },
        },
        "particle-float": {
          "0%, 100%": { 
            transform: "translateY(0) translateX(0)",
            opacity: "0.8"
          },
          "50%": { 
            transform: "translateY(-40px) translateX(20px)",
            opacity: "1"
          },
        },
        "particle-float-2": {
          "0%, 100%": { 
            transform: "translateY(0) translateX(0)",
            opacity: "0.7"
          },
          "50%": { 
            transform: "translateY(-50px) translateX(-15px)",
            opacity: "1"
          },
        },
        "particle-float-3": {
          "0%, 100%": { 
            transform: "translateY(0) translateX(0)",
            opacity: "0.75"
          },
          "50%": { 
            transform: "translateY(-35px) translateX(25px)",
            opacity: "1"
          },
        },
        "particle-float-4": {
          "0%, 100%": { 
            transform: "translateY(0) translateX(0)",
            opacity: "0.8"
          },
          "50%": { 
            transform: "translateY(-45px) translateX(-20px)",
            opacity: "1"
          },
        },
        "pulse-glow-delayed": {
          "0%, 100%": { 
            transform: "scale(1)",
            opacity: "0.3"
          },
          "50%": { 
            transform: "scale(1.1)",
            opacity: "0.5"
          },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "neon-flicker": "neon-flicker 5s linear infinite",
        "float-cube-1": "float-cube-1 8s ease-in-out infinite",
        "float-cube-2": "float-cube-2 10s ease-in-out infinite",
        "float-cube-3": "float-cube-3 7s ease-in-out infinite",
        "float-cube-4": "float-cube-4 9s ease-in-out infinite",
        "particle-float": "particle-float 6s ease-in-out infinite",
        "particle-float-2": "particle-float-2 7s ease-in-out infinite",
        "particle-float-3": "particle-float-3 5s ease-in-out infinite",
        "particle-float-4": "particle-float-4 8s ease-in-out infinite",
        "pulse-glow-delayed": "pulse-glow-delayed 10s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "spin-slow": "spin-slow 3s linear infinite",
        "spin-reverse": "spin-reverse 3s linear infinite",
        "background-shine": "background-shine 8s linear infinite",
        "blob": "blob 7s infinite",
      },
      backgroundSize: {
        "200%": "200%",
      },
      extend: {
        animation: {
          "blob": "blob 7s infinite",
        },
      },
      animationDelay: {
        "2000": "2000ms",
        "4000": "4000ms",
        "6000": "6000ms",
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      const newUtilities = {
        '.animation-delay-2000': {
          'animation-delay': '2s',
        },
        '.animation-delay-4000': {
          'animation-delay': '4s',
        },
        '.animation-delay-6000': {
          'animation-delay': '6s',
        },
      }
      addUtilities(newUtilities)
    },
  ],
};

export default config;

