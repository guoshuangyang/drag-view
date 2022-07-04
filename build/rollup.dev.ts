import { defineConfig } from "rollup";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { resolve } from "path";
export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      file: "lib/bundle.umd.js",
      format: "umd",
      sourcemap: true,
      name: "DragView",
    },
    watch: {
      include: "src/**/*",
    },
    plugins: [
      typescript({
        tsconfig: resolve(__dirname, "../tsconfig.json"),
        compilerOptions: {
          sourceMap: true,
        },
      }),
      json(),
      livereload({
        watch: "lib",
      }),
      serve({
        open: true,
        port: 8082,
        contentBase: resolve(__dirname, "../"),
      }),
    ],
  },
]);
