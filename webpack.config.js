const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PUBLIC_URL = "/";

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: PUBLIC_URL,
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: [/\.svg$/],
        exclude: /node_modules/,
        use: ["svg-react-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: process.env.NODE_PORT || 3000,
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico",
    }),
    // This makes it possible for us to safely use env vars on our code
    new webpack.DefinePlugin({
      "process.env.PUBLIC_URL": JSON.stringify(PUBLIC_URL),
    }),
  ],
};
