import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import autoPreprocess from "svelte-preprocess";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";

export default {
    input: "src/index.ts",
    output: {
        format: "cjs",
        file: "dist/main.js",
        sourcemap: "inline",
        exports: "default",
    },
    external: ["obsidian"],
    plugins: [
        svelte({
            preprocess: autoPreprocess(),
            emitCss: false,
        }),
        typescript({ sourceMap: true }),
        resolve({
            browser: true,
            dedupe: ["svelte"],
        }),
        commonjs(),
        postcss(),
        copy({
            targets: [
                {
                    src: "manifest.json",
                    dest: "dist/",
                },
                {
                    src: "styles.css",
                    dest: "dist/",
                },
            ],
        }),
    ],
};
