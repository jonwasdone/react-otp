import dts from "bun-plugin-dts";

await Bun.build({
  entrypoints: ["./src/index.tsx"],
  outdir: "./dist",
  external: ["react"],
  target: "browser",
  plugins: [dts()],
});
