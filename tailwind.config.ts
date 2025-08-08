import type { Config } from "tailwindcss";

import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
  // --- THIS IS THE FIX ---
  // Add this section to your config file.
  // corePlugins: {
  //   preflight: true, // Keep preflight enabled
  // },
  future: {
    // Disable modern color format features
    modernEquivalents: false,
    respectDefaultRingColorOpacity: false,
    disableColorOpacityUtilitiesByDefault: false,
  },
} satisfies Config;

export default config;
