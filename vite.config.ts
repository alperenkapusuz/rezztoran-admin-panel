import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@api": "/src/api",
      "@components": "/src/components",
      "@interface": "/src/interfaces",
      "@pages": "/src/pages",
      "@assets": "/src/assets",
      "@constants": "/src/constants",
    },
  },
});
