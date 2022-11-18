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
  build: {
    sourcemap: true,
    emptyOutDir: true,
    target: "es2015",
    cssTarget: "chrome80",

    // minify: 'terser',
    /**
     * 当 minify=“minify:'terser'” 解开注释
     * Uncomment when minify="minify:'terser'"
     */
    // terserOptions: {
    //   compress: {
    //     keep_infinity: true,
    //     drop_console: VITE_DROP_CONSOLE,
    //   },
    // },
    // Turning off brotliSize display can slightly reduce packaging time
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
