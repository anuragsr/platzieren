const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: './src/app.js',
  devServer: {
    disableHostCheck: true,
    port: 8080,
    contentBase: path.join(__dirname, "dist"),
    publicPath: '/'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
        // No postcss for dev
      }
      ,
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: '[path][name].[ext]?hash=[hash:20]',
              limit: 8192
            }
          }
        ]
      }
      ,
      {
        // Load all icons
        test: /\.(eot|woff|woff2|svg|ttf|otf)([\?]?.*)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      }
      ,
      {
        // HTML LOADER
        // Reference: https://github.com/webpack/raw-loader
        // Allow loading html through js
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // Inject the js bundle at the end of the body of the given template
      inject: 'body',
    }),
    new ExtractTextPlugin("styles.css"),
    new CopyWebpackPlugin({
      patterns: [
        // { from: './src/assets', to: 'assets' },
        {from: __dirname + '/public'}
      ]
    })
  ]
};
