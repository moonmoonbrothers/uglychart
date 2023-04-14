import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "index",
      fileName: "index",
    },
    outDir: "package",
    rollupOptions: {
      external: ["@moonmoonbrothers/flutterjs"],
    },
  },
});
