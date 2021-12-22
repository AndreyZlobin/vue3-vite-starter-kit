import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import WindiCSS from "vite-plugin-windicss";
import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";
import ViteComponents from "vite-plugin-components";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import viteSvgIcons from "vite-plugin-svg-icons";

const markdownWrapperClasses = "prose prose-sm m-auto text-left";
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/],
      script: {
        refSugar: true,
      },
    }),
    VitePWA(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue"],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    WindiCSS({
      safelist: markdownWrapperClasses,
      theme: {
        colors: {
          transparent: "transparent",
          current: "currentColor",
          green: `#333333`,
        },
      },
    }),

    // https://github.com/antfu/vite-plugin-icons
    ViteIcons(),
    viteSvgIcons({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
    // https://github.com/antfu/vite-plugin-components
    ViteComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],

      // allow auto import and register components used in markdown
      customLoaderMatcher: (id) => id.endsWith(".md"),

      customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
        ViteIconsResolver({
          componentPrefix: "",
          enabledCollections: ["carbon"],
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    open: true,
  },
  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core", "lodash"],
    exclude: ["vue-demi"],
  },
});
