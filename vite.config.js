import { fileURLToPath, URL } from 'node:url'
import * as path from "path";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: 'supernova',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ["vue", "pinia", "@tailwindcss", "yup", "autoprefixer", "postcss", "tailwindcss"],
      output: {
        globals: {
          vue: "Vue",
          pinia: "pinia"
        }
      }
    }
  },
})
