import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";
import typography from "windicss/plugin/typography";
import plugin from "windicss/plugin";
import { windButton } from "./windi/components/button";
import { COLORS_SCHEMA } from "./windi/colors";

export default defineConfig({
  attributify: true,

  plugins: [
    typography(),
    plugin(({ addComponents }) => {
      addComponents({
        ...windButton,
      });
    }),
  ],
  theme: {
    extend: {
      colors: {
        ...COLORS_SCHEMA,
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "inherit",
            a: {
              color: "inherit",
              opacity: 0.75,
              fontWeight: "500",
              textDecoration: "underline",
              "&:hover": {
                opacity: 1,
                color: colors.teal[600],
              },
            },
            b: { color: "inherit" },
            strong: { color: "inherit" },
            em: { color: "inherit" },
            h1: { color: "inherit" },
            h2: { color: "inherit" },
            h3: { color: "inherit" },
            h4: { color: "inherit" },
            code: { color: "inherit" },
          },
        },
      },
    },
  },
});
