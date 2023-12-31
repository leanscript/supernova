import { fileURLToPath, URL } from 'node:url'
import * as path from "path";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: 'supernova',
    },
    rollupOptions: {
      external: ["vue", "vue-router", "pinia", "yup"],
      output: {
        globals: {
          vue: "vue",
          'vue-router': "vue-router",
          pinia: "pinia"
        }
      }
    }
  },
})
