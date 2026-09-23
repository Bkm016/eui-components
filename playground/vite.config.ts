import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@eui-components/ore-ui/styles.css": fileURLToPath(new URL("../src/styles/index.css", import.meta.url)),
      "@eui-components/ore-ui": fileURLToPath(new URL("../src/index.ts", import.meta.url)),
    },
  },
});
