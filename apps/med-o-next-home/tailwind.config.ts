import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"], // Enabling dark mode with a class toggle
  content: [
    "./pages/**/*.{ts,tsx}", // Including all pages with tsx/ts extension
    "./components/**/*.{ts,tsx}", // Including all components with tsx/ts extension
    "./app/**/*.{ts,tsx}", // Including all app-related tsx/ts files
    "./src/**/*.{ts,tsx}", // Including src folder with tsx/ts files
  ],
  prefix: "", // Optional prefix for custom classes (leave as "" if not needed)
  theme: {
    container: {
      center: true, // Ensures the container is centered
      padding: "2rem", // Adding padding to the container
      screens: {
        "2xl": "1400px", // Defining custom breakpoint for 2xl screen size
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border, #e0e0e0))", // Providing a fallback value for border color
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
        lg: "var(--radius)", // Using CSS custom property for large radius
        md: "calc(var(--radius) - 2px)", // Custom medium radius
        sm: "calc(var(--radius) - 4px)", // Custom small radius
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out", // Animation for accordion down
        "accordion-up": "accordion-up 0.2s ease-out", // Animation for accordion up
      },
    },
  },
  plugins: [], // Adding the animation plugin
} satisfies Config;

export default config;
