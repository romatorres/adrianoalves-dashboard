import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-poller-one)"],
        secondary: ["var(--font-ubuntu)"],
        tertiary: ["var(--font-nunito)"],
        quaternary: ["var(--font-bebas-neue)"],
      },
      backgroundImage: {
        hero: "url('/img/bg-hero.jpeg')",
        service: "url('/img/bg-service.jpg')",
        quemsomos: "url('/img/bg-quemsomos.jpg')",
      },
      colors: {
        primary: "#E2C244",
        primary_hover: "#B09423",
        secondary: "#F5EBC3",
        background: "#0E0D05",
        black_secondary: "#171407",
        price: "#b45309",
        gray: {
          "01": "#26272B",
          "02": "#4E525B",
          "03": "#838896",
          "04": "#F9F9F9",
        },
        white: "#FAF3DC",
      },
    },
  },
  plugins: [],
} satisfies Config;
