// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FontminPlugin = require('fontmin-webpack');

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
    clean: true
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
      ),
      [
          new FontminPlugin({
            autodetect: true,
            glyphs: ['\uf0c8'],
            allowedFilesRegex: null,
            skippedFilesRegex: null,
            textRegex: /\.(js|css|html)$/,
            webpackCompilationHook: 'thisCompilation',
          }),
          new MiniCssExtractPlugin({
            filename: 'styles/[name][hash].css',
          })
      ].filter(Boolean)
  ),
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
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/font/[name].[ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico|avif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/img/[name][hash][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
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
