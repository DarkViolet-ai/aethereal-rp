import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dv: {
          100: "#ebeff7",
          125: "rgba(235, 239, 247, 0.25)",
          140: "rgba(235, 239, 247, 0.4)",
          150: "rgba(235, 239, 247, 0.5)",
          175: "rgba(235, 239, 247, 0.75)",
          200: "#b3c3f5",
          225: "rgba(179, 195, 245, 0.25)",
          250: "rgba(179, 195, 245, 0.5)",
          275: "rgba(179, 195, 245, 0.75)",
          300: "#7795f2",
          325: "rgba(119, 149, 242, 0.25)",
          350: "rgba(119, 149, 242, 0.5)",
          375: "rgba(119, 149, 242, 0.75)",
          400: "#00ffff",
          415: "rgba(0,255,255, 0.15)",
          425: "rgba(0,255,255, 0.25)",
          450: "rgba(0,255,255, 0.5)",
          475: "rgba(0,255,255, 0.75)",
          490: "rgba(26, 86, 110, 0.9)",
          500: "rgba(129, 108, 212, 1)",
          525: "rgba(129, 108, 212, 0.25)",
          550: "rgba(129, 108, 212, 0.5)",
          575: "rgba(129, 108, 212, 0.75)",
          600: "#9400D3",
          615: "rgba(148, 0, 211, 0.15)",
          625: "rgba(148, 0, 211, 0.25)",
          640: "rgba(148, 0, 211, 0.4)",
          650: "rgba(148, 0, 211, 0.5)",
          675: "rgba(148, 0, 211, 0.75)",
          685: "rgba(148, 0, 211, 0.85)",
          700: "#3D3859",
          725: "rgba(61, 56, 89, 0.25)",
          750: "rgba(61, 56, 89, 0.5)",
          775: "rgba(61, 56, 89, 0.75)",
          785: "rgba(61, 56, 89, 0.85)",
          800: "#27293D",
          825: "rgba(39, 41, 61, 0.25)",
          850: "rgba(39, 41, 61, 0.5)",
          875: "rgba(39, 41, 61, 0.75)",
          890: "rgba(39, 41, 61, 0.9)",
          900: "#1d1e2b",
          925: "rgba(29, 30, 43, 0.25)",
          950: "rgba(29, 30, 43, 0.5)",
          975: "rgba(29, 30, 43, 0.75)",
          982: "rgba(29, 30, 43, 0.82)",
          986: "rgba(29, 30, 43, 0.86)",
          990: "rgba(29, 30, 43, 0.9)",
        },
        lilac: "#D67AFF",
        pinkest: "#FF5AFF",
        // brightPink: "#FF00FF",
        brightPink: "#FF43A9",
        purple: "#5027b0",
        mauve: "rgba(115, 0, 107, 1  )",
      },
      fontFamily: {
        sans: ["Barlow", "sans-serif"],
        cursive: ["Annie Use Your Telescope", "cursive"],
      },
      fontSize: {
        xs: ["0.9rem", { lineHeight: "1rem" }], // 12px font-size, 16px line-height
        sm: ["1rem", { lineHeight: "1.2rem" }], // 14px font-size, 20px line-height
        md: ["1.1rem", { lineHeight: "1.3rem" }], // 16px font-size, 24px line-height
        lg: ["1.3rem", { lineHeight: "1.5rem" }], // 18px font-size, 28px line-height
        xl: ["1.5rem", { lineHeight: "1.7rem" }], // 20px font-size, 28px line-height
        "2xl": ["1.5rem", { lineHeight: "1.6rem" }], // 24px font-size, 32px line-height
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px font-size, 36px line-height
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px font-size, 40px line-height
        "5xl": ["3rem", { lineHeight: "1" }], // 48px font-size, normal line-height
        "6xl": ["3.75rem", { lineHeight: "1" }], // 60px font-size, normal line-height
        "7xl": ["4.5rem", { lineHeight: "1" }], // 72px font-size, normal line-height
        "8xl": ["6rem", { lineHeight: "1" }], // 96px font-size, normal line-height
        "9xl": ["8rem", { lineHeight: "1" }], // 128px font-size, normal line-height
      },
      screens: {
        mobile: "320px",
        sm: "640px",
        md: "768px",
        mdpl: "900px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
        xxxl: "1850px",
      },
      boxShadow: {
        dvShadow: "2px 2px 8px rgba(0, 0, 0, 0.9)",
        subtleShadow:
          "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
        standoutShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",

        shadow3D:
          "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
        boxGlow:
          "#00FFFF 0px 0px 5px, #00FFFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, 8px 2px 6px rgba(0,0,0,0);",
      },
      textShadow: {
        lightTextShadow: "1px 1px 3px rgba(255, 255, 255, 0.9)",
        dvTextShadow: "2px 2px 2px rgba(0, 0, 0, 0.9)",
        subtleTextShadow: "1px 1px 2px rgba(0, 0, 0, 0.9)",
        standoutTextShadow: "3px 3px 4px rgba(0, 0, 0, 0.9)",
        textGlow:
          "#00FFFF 0px 0px 5px, #00FFFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, 8px 2px 6px rgba(0,0,0,0);",
      },

      backgroundImage: {
        darkVioletBack:
          "linear-gradient(to top, rgba(148, 0, 211, 0.15), rgba(148, 0, 211, 0.25), rgba(148, 0, 211, 0.4), rgba(148, 0, 211, 0.5)), linear-gradient(to top, rgba(29, 30, 43, 0.9), #1d1e2b)",
        darkVioletGrad:
          "linear-gradient(to top, rgba(148, 0, 211, 0.15), rgba(148, 0, 211, 0.25), rgba(148, 0, 211, 0.4), rgba(148, 0, 211, 0.5))",
        cyanGrad:
          "linear-gradient(to bottom, rgba(0,255,255, 0.5), rgba(119, 149, 242, 0.75), rgba(0,255,255, 0.5))",
        transCyanGrad:
          "linear-gradient(to bottom, rgba(0,255,255, 0.35), rgba(119, 149, 242, 0.45), rgba(0,255,255, 0.25))",
        cyanBack:
          "linear-gradient(to bottom, rgba(0,255,255, 0.5), rgba(119, 149, 242, 0.75), rgba(0,255,255, 0.5)), linear-gradient(to top, rgba(29, 30, 43, 0.7), #1d1e2b)",
        lightLilacBack:
          "linear-gradient(to bottom, rgba(129, 108, 212, 0.25), rgba(148, 0, 211, 0.5)), linear-gradient(to bottom, rgba(29, 30, 43, 0.95), #ebeff7)",
        calmGrayBack:
          "linear-gradient(to top left, rgba(61, 56, 89, 0.85), rgba(39, 41, 61, 0.9)), linear-gradient(to top, rgba(119, 149, 242, 0.75), #7795f2)",
        darkGrayBack:
          "linear-gradient(to bottom, rgba(29, 30, 43, 0.86), rgba(61, 56, 89, 0.75)), linear-gradient(to right, rgba(61, 56, 89, 0.5), #3D3859)",
        violetCyanGrad:
          "linear-gradient(45deg, rgba(148, 0, 211, 0.5), rgba(0, 255, 255, 0.5)), linear-gradient(to bottom, rgba(119, 149, 242, 0.5), rgba(148, 0, 211, 0.5))",
      },
    },
  },
  variants: {},
  plugins: [
    plugin((helpers: any) => {
      const { addUtilities, theme } = helpers;
      const textShadows = theme("textShadow") as Record<string, string>;
      const newUtilities: Record<string, any> = {};
      Object.keys(textShadows).forEach((key) => {
        newUtilities[`.text-shadow-${key}`] = { textShadow: textShadows[key] };
      });
      addUtilities(newUtilities);
    }),
  ],
} satisfies Config;
