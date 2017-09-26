'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const IS_DEBUG = ENV === 'development';

module.exports = {
  entry: {
    db: path.join(__dirname, 'db'),
    server: path.join(__dirname, 'server')
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  externals: {
    jquery: 'jQuery',
    foundation: 'Foundation'
  },

  target: 'node',

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  cache: IS_DEBUG,

  plugins: [
    new webpack.DefinePlugin({
      LANG: JSON.stringify(null),
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new webpack.LoaderOptionsPlugin({
      debug: IS_DEBUG
    }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new ExtractTextPlugin('.modules.css')
  ],

  devtool: IS_DEBUG ? 'source-map' : '',

  resolve: {
    modules: [__dirname, 'node_modules', 'core'],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                outputStyle: 'expanded'
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: 'null-loader'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'null-loader'
      }
    ]
  }
};
