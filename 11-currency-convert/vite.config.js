import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 🚨 CRITICAL PATH: Tells the compiler engine exactly which subfolder repo directory to serve
  base: "/fcc-fullstack-challenges/",
});
