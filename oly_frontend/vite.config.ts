import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import { resolve } from 'path';
import svgicon from "vite-plugin-svgicon";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    APP_LAST_UPDATE_DATE: JSON.stringify(new Date().getTime().toString()),
  },
  plugins: [
    vue(),
    vueJsx(),
    svgicon({
      include: ["**/svg-icon/**/*.svg"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});