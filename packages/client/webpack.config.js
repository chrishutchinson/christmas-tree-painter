const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { NODE_ENV } = process.env;

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
    open: true,
    port: 8000,
  },
  mode: NODE_ENV === "prod" ? "production" : "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "./index.html" }]),
  ],
};
