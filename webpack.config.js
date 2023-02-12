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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
};
