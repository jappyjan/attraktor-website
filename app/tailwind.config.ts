import { type Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "attraktor-blue": "#67b8dc",
        "attraktor-grey": "#4B4B4D",
        "attraktor-grey-light": "#9B9C9E",
        "background-light": "hsl(0, 0%, 95%)",
        "background-dark": "hsl(0, 0%, 10%)",
        "background-dark-80": "hsl(0, 0%, 22%)",
      },
      fontFamily: {
        sans: ["var(--font-droid-sans)"],
        agencyFbBold: ["var(--font-agency-fb)"],
      },
      fontSize: {
        sm: "1rem",
        base: "1.25rem",
        xl: "1.563rem",
        "2xl": "1.953rem",
        "3xl": "2.441rem",
        "4xl": "3.052rem",
        "5xl": "3.953rem",
      },
      scale: {
        200: "2",
      },
      backgroundImage: {
        // https://pattern.monster/tiles-1/
        "pattern-light": `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='45' height='51.96' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='transparent'/><path d='M52.48 44.47a15 15 0 01-14.96 0 15 15 0 00-7.48 12.96M7.48 44.42a15 15 0 01-14.96 0M15 57.44c0-5.35-2.9-10.35-7.52-13.02a15 15 0 017.48-12.97M7.48 18.5a14.97 14.97 0 01-14.98-.03m15.02-.03A15 15 0 0115 5.47a15 15 0 00-4.4-10.62m23.8.05A15 15 0 0030 5.53a15 15 0 017.48 12.96 14.9 14.9 0 0015.02-.03m-22.5 13a15.13 15.13 0 017.52 13.01m-7.56-39a15 15 0 01-14.96 0M7.48 18.5a15 15 0 017.48 12.96 15 15 0 0015.04 0 15 15 0 017.48-12.96'  stroke-width='0.5' stroke='hsla(0, 0%, 85%, 0.75)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`,
        "pattern-dark": `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='45' height='51.96' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='transparent'/><path d='M52.48 44.47a15 15 0 01-14.96 0 15 15 0 00-7.48 12.96M7.48 44.42a15 15 0 01-14.96 0M15 57.44c0-5.35-2.9-10.35-7.52-13.02a15 15 0 017.48-12.97M7.48 18.5a14.97 14.97 0 01-14.98-.03m15.02-.03A15 15 0 0115 5.47a15 15 0 00-4.4-10.62m23.8.05A15 15 0 0030 5.53a15 15 0 017.48 12.96 14.9 14.9 0 0015.02-.03m-22.5 13a15.13 15.13 0 017.52 13.01m-7.56-39a15 15 0 01-14.96 0M7.48 18.5a15 15 0 017.48 12.96 15 15 0 0015.04 0 15 15 0 017.48-12.96'  stroke-width='0.5' stroke='hsla(0, 0%, 100%, 0.15)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`,
      },
      boxShadow: {
        'lg-hard': '0px 0px 50px 0px #000000',
      }
    },
  },
  darkMode: "class",
  variants: {
    extend: {
      backgroundImage: ["dark"],
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            foreground: "#4B4B4D",
          }
        },
        dark: {
          colors: {
            foreground: "#4B4B4D",
          }
        }
      }
    }),
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "20px" },
      });
    }),
    plugin(function ({ addBase, theme }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function extractColorVars(colorObj: any, colorGroup = ""): any {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === "string"
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(
                  value as unknown as Record<string, string>,
                  `-${colorKey}`,
                );

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    }),
  ],
} satisfies Config;
