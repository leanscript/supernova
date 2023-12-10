import { fileURLToPath, URL } from 'node:url'
import * as path from "path";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), dts(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: 'supernova'
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
