import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
// 压缩代码
import { terser } from "rollup-plugin-terser";
import { resolve } from "path";

const arr = [
  {
    format: "umd",
    source: true,
  },
  {
    format: "cjs",
    source: true,
  },
  {
    format: "esm",
    source: true,
  },
  {
    format: "umd",
    source: false,
    terser: true,
  },
  {
    format: "cjs",
    source: false,
    terser: true,
  },
];

export default arr.map((item) => {
  return {
    input: "src/index.ts",
    output: {
      file: `package/drag-view.${item.format}${item.terser ? ".min" : ""}.js`,
      format: item.format,
      sourcemap: !item.terser,
      name: "DragView",
      exports: "default",
    },
    plugins: [
      typescript({
        compilerOptions: {
          sourceMap: !item.terser,
        },
        tsconfig: resolve(__dirname, "../tsconfig.json"),
      }),
      json(),
      item.terser ? terser() : null,
    ],
  };
});
