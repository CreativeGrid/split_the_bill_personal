import babelPresetEnv from "@babel/preset-env";
import babelPresetTypescript from "@babel/preset-typescript";

export default {
  presets: [
    [
      babelPresetEnv,
      {
        targets: {
          node: "current",
        },
      },
    ],
    [babelPresetTypescript],
  ],
  plugins: ["@babel/plugin-transform-runtime"],
};
