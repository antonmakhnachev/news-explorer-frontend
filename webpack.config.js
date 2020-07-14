const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // добавили плагин
module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use:  [MiniCssExtractPlugin.loader, 'style-loader!css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './styles/index.[contenthash].css',
    }),    
    new HtmlWebpackPlugin({
      inject: false,      
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,      
      template: './src/account.html',
      filename: 'account.html'
    }),
    new WebpackMd5Hash()
  ],
  resolve: {
    extensions: ['.js', '.css']
  }
};