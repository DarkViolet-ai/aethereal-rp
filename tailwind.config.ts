import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const scrollbarPlugin = plugin(
  ({
    addUtilities,
  }: {
    addUtilities: (utilities: any, variants?: string[]) => void;
  }) => {
    const newUtilities = {
      "::-webkit-scrollbar": {
        width: "4px",
        height: "4px",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "rgba(39, 41, 61, 0.5)",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#9400D3",
        borderRadius: "2px",
        "&:hover": {
          backgroundColor: "rgba(39, 41, 61, 0.5)",
        },
      },
    };
    addUtilities(newUtilities, ["responsive", "hover"]);
  }
);

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
          400: "rgba(0,255,255, 1)",
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
        brightPink: "#FF43A9",
        purple: "#5027b0",
        mauve: "rgba(115, 0, 107, 1  )",
      },
      width: {
        "2%": "2%",
        "4%": "4%",
        "6%": "6%",
        "8%": "8%",
        "10%": "10%",
        "12%": "12%",
        "14%": "14%",
        "16%": "16%",
        "18%": "18%",
        "20%": "20%",
        "22%": "22%",
        "24%": "24%",
        "26%": "26%",
        "28%": "28%",
        "30%": "30%",
        "32%": "32%",
        "34%": "34%",
        "36%": "36%",
        "38%": "38%",
        "40%": "40%",
        "42%": "42%",
        "44%": "44%",
        "46%": "46%",
        "48%": "48%",
        "50%": "50%",
        "52%": "52%",
        "54%": "54%",
        "56%": "56%",
        "58%": "58%",
        "60%": "60%",
        "62%": "62%",
        "64%": "64%",
        "66%": "66%",
        "68%": "68%",
        "70%": "70%",
        "72%": "72%",
        "74%": "74%",
        "76%": "76%",
        "78%": "78%",
        "80%": "80%",
        "82%": "82%",
        "84%": "84%",
        "86%": "86%",
        "88%": "88%",
        "90%": "90%",
        "92%": "92%",
        "94%": "94%",
        "96%": "96%",
        "98%": "98%",
      },
      height: {
        "2%": "2%",
        "4%": "4%",
        "6%": "6%",
        "8%": "8%",
        "10%": "10%",
        "12%": "12%",
        "14%": "14%",
        "16%": "16%",
        "18%": "18%",
        "20%": "20%",
        "22%": "22%",
        "24%": "24%",
        "26%": "26%",
        "28%": "28%",
        "30%": "30%",
        "32%": "32%",
        "34%": "34%",
        "36%": "36%",
        "38%": "38%",
        "40%": "40%",
        "42%": "42%",
        "44%": "44%",
        "46%": "46%",
        "48%": "48%",
        "50%": "50%",
        "52%": "52%",
        "54%": "54%",
        "56%": "56%",
        "58%": "58%",
        "60%": "60%",
        "62%": "62%",
        "64%": "64%",
        "66%": "66%",
        "68%": "68%",
        "70%": "70%",
        "72%": "72%",
        "74%": "74%",
        "76%": "76%",
        "78%": "78%",
        "80%": "80%",
        "82%": "82%",
        "84%": "84%",
        "86%": "86%",
        "88%": "88%",
        "90%": "90%",
        "92%": "92%",
        "94%": "94%",
        "96%": "96%",
        "98%": "98%",
      },
      transition: ["hover", "focus"],
      duration: ["hover", "focus"],
      scale: {
        "101": "1.01",
        "102": "1.02",
        "103": "1.03",
        "104": "1.04",
        "105": "1.05",
        "106": "1.06",
        "107": "1.07",
        "108": "1.08",
        "109": "1.09",
        "110": "1.1",
        "111": "1.11",
        "112": "1.12",
        "113": "1.13",
        "114": "1.14",
        "115": "1.15",
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
        xxl: "1600px",
        fullHD: "1920px",
        quadHD: "2560px",
        ultraHD: "3840px",
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
        parchmentShadow:
          "inset 0 0 8px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.15);",
      },

      textShadow: {
        lightTextShadow: "1px 1px 3px rgba(255, 255, 255, 0.9)",
        dvTextShadow: "2px 2px 2px rgba(0, 0, 0, 0.9)",
        subtleTextShadow: "1px 1px 2px rgba(0, 0, 0, 0.9)",
        standoutTextShadow: "3px 3px 4px rgba(0, 0, 0, 0.9)",
        textFog:
          "0 0 5px #000, 0 0 10px #000, 0 0 15px #000, 0 0 20px #000, 0 0 30px #000, 0 0 40px #575757, 0 0 55px #5E5E5E, 0 0 75px #000, 2px 2px 2px rgba(0,0,0,0);",
        textGlow:
          "#00FFFF 0px 0px 5px, #00FFFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, 8px 2px 6px rgba(0,0,0,0);",
        boldTextGlow:
          "#000 1px 1px 1px, #00FFFF 0px 0px 5px, #00FFFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, 8px 2px 6px rgba(0,0,0,0);",
      },

      backgroundImage: {
        darkVioletBack:
          "linear-gradient(to top, rgba(148, 0, 211, 0.15), rgba(148, 0, 211, 0.25), rgba(148, 0, 211, 0.4), rgba(148, 0, 211, 0.5)), linear-gradient(to top, rgba(29, 30, 43, 0.9), #1d1e2b)",
        darkVioletGrad:
          "linear-gradient(to top, rgba(148, 0, 211, 0.15), rgba(148, 0, 211, 0.25), rgba(148, 0, 211, 0.4), rgba(148, 0, 211, 0.5))",
        darkenGrad:
          "linear-gradient(to top, rgba(39, 41, 61, 0.1), rgba(39, 41, 61, 0.2), rgba(39, 41, 61, 0.3), rgba(39, 41, 61, 0.2), rgba(39, 41, 61, 0.1))",
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
        calmVioletCyanGrad:
          "linear-gradient(45deg, rgba(148, 0, 211, 0.25), rgba(0, 255, 255, 0.25)), linear-gradient(to bottom, rgba(119, 149, 242, 0.25), rgba(148, 0, 211, 0.25))",
        testGrad:
          "linear-gradient(45deg, rgba(70, 1, 100, 0.5), rgba(0, 99, 99, 0.5)),linear-gradient(to bottom,rgba(119, 149, 242, 0.5),rgba(148, 0, 211, 0.5));",
        parchment:
          "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,242,211,1) 55%, rgba(255,236,191,1) 70%, rgba(255,236,189,1) 82%, rgba(255,232,176,1) 93%, rgba(255,232,176,1) 100%)",
        parchmentSpacerTop:
          "linear-gradient(to bottom, rgba(255,232,176,1) 0%, rgba(255,232,176,0.7) 33%,  rgba(255,232,176,0.4) 66%,  rgba(255,232,176,0.1) 100%)",
        parchmentSpacerBottom:
          "linear-gradient(to top, rgba(255,232,176,1) 0%, rgba(255,232,176,0.7) 33%,  rgba(255,232,176,0.4) 66%,  rgba(255,232,176,0.1) 100%)",
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
    scrollbarPlugin,
  ],
} satisfies Config;
