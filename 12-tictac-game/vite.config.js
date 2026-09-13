import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  // 🚨 CRITICAL PATH: Instructs the asset bundler to serve files under your project's sub-directory routing
  base: "/fcc-fullstack-challenges/12-tictac-game/",
});
