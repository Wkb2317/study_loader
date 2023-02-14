const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash:10].js",
    clean: true,
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "./loader/demo/sync.js",
      },
      {
        test: /\.js$/,
        loader: "./loader/demo/async.js",
      },
      {
        test: /\.js$/,
        loader: "./loader/demo/raw.js",
      },
      {
        test: /\.js$/,
        loader: "./loader/demo/pitch.js",
      },
      {
        test: /\.js$/,
        loader: "./loader/demo/pitch2.js",
      },
      {
        test: /\.js$/,
        loader: "./loader/demo/pitch3.js",
      },
      {
        test: /\.js$/,
        loader: "./loader/clean-console.js",
      },
      {
        test: /\.js$/,
        loader: "./loader/banner-loader/banner.js",
        options: {
          author: "wkb",
        },
      },
      {
        test: /\.js$/,
        loader: "./loader/babel-loader/index.js",
        options: {
          presets: [
            [
              "@babel/preset-env",
              // {
              //   useBuiltIns: "usage",
              //   corejs: "3.28",
              // },
            ],
          ],
          plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "./loader/file-loader/index.js",
        type: "javascript/auto", // 阻止webpack处理资源
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
};
