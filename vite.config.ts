import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        background: resolve(__dirname, "windows/background/index.html"),
        main: resolve(__dirname, "windows/main/index.html"),
        ingame: resolve(__dirname, "windows/ingame/index.html")
      }
    }
  },
  base: "/"
})
