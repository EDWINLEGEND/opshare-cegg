import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ['zustand', 'zustand/middleware', 'uuid']
  }
});
