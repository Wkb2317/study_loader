const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TestPlugin = require("./plugins/test-plugins");
const BannerWebpackPlugin = require("./plugins/banner-webpack-plugin/banner-webpack-plugin.js");
const CleanWebpackPlugin = require("./plugins/clean-webpack-plugin/clean-webpack-plugin.js");
const AnalysisWebpackPlugin = require("./plugins/analysis-webpack-plugin/analysis-webpack-plugin");
const InlineWebpackPlugin = require("./plugins/inline-webpack-plugin/inline-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: false,
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash:10].js",
    // clean: true,
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
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
      // {
      //   test: /\.js$/,
      //   loader: "./loader/banner-loader/banner.js",
      //   options: {
      //     author: "wkb",
      //   },
      // },
      // {
      //   test: /\.js$/,
      //   loader: "./loader/babel-loader/index.js",
      //   options: {
      //     presets: [["@babel/preset-env"]],
      //     plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
      //   },
      // },
      {
        test: /\.css$/,
        use: ["./loader/style-loader", "css-loader"],
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
    // new TestPlugin(),
    new BannerWebpackPlugin({
      author: "wkb",
    }),
    new CleanWebpackPlugin(),
    new AnalysisWebpackPlugin(),
    new InlineWebpackPlugin([/runtime/g]),
  ],
};
