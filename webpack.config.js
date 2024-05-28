// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const pageFiles = ['index', 'main'];

const config = {
  context: path.resolve(__dirname, './src'),
  entry: pageFiles.reduce((result, file) => {
    result[file] = `./${file}.js`;
    return result;
  }, {}),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
  },
  devServer: {
    open: true,
    host: "localhost",
    hot: false,
  },
  plugins: [].concat(
      pageFiles.map(file =>
        new HtmlWebpackPlugin({
          inject: 'head',
          template: `./${file}.html`,
          filename: `./${file}.html`,
          chunks: [file],
          minify: false
        })
      )
  ).filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(html)$/i,
        loader: "html-loader",
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
