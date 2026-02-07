import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import reactScan from "@react-scan/vite-plugin-react-scan"

const isProduction = process.env.NODE_ENV === "production"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), !isProduction && reactScan()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["three"],
  },
})
