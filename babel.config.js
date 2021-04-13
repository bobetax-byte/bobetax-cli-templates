module.exports = {
  presets: [
    [
      "@vue/cli-plugin-babel/preset",
      {
        useBuiltIns: "usage",
        corejs: { version: "3", proposals: true },
      },
    ],
  ],
  plugins: ["@babel/plugin-proposal-optional-chaining"], // 链式操作
};
