import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [".csb.app", ".vercel.app"],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
