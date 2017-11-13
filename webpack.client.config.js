'use strict';

let path = require('path');
let webpack = require('webpack');
let cssnext = require('postcss-cssnext');
let optimize = webpack.optimize;
let AssetsPlugin = require('assets-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const LANGS = ['en', 'ru'];
const IS_DEBUG = ENV === 'development';
const PLUGINS = [
  new webpack.ProvidePlugin({ React: 'react' }),
  new optimize.AggressiveMergingPlugin(),
  new AssetsPlugin({
    path: path.join(__dirname, 'build'),
    filename: 'assets.json'
  }),
  new ExtractTextPlugin({
    filename: 'bundle_[hash].css'
  }),
  new webpack.IgnorePlugin(/vertx/)
];

module.exports = LANGS.map(lang => ({
  entry: { [lang]: path.join(__dirname, 'client') },

  output: {
    path: path.join(__dirname, 'build', 'public', 'assets'),
    filename: 'bundle_[hash].' + lang + '.js'
  },

  externals: {
    mongoose: 'mongoose'
  },

  cache: IS_DEBUG,

  plugins: PLUGINS.concat([
    new webpack.IgnorePlugin(new RegExp(`^\.\/(?!${lang}$)`), /i18n$/),
    new webpack.IgnorePlugin(/^config(\/server)?(\/)?$/),
    new webpack.DefinePlugin({
      LANG: JSON.stringify(lang),
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new webpack.LoaderOptionsPlugin({
      debug: IS_DEBUG,
      options: {
        postcss: [
          cssnext({
            browsers: '> 0.1%',
            url: false
          })
        ],
        context: __dirname
      }
    })
  ]).concat(IS_DEBUG ? [] : [
    new optimize.UglifyJsPlugin({ comments: false })
  ]),

  devtool: IS_DEBUG ? 'source-map' : '',

  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    alias: {
      foundation_sites: 'foundation-sites/js'
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'config'),
          path.join(__dirname, 'lib'),
          path.join(__dirname, 'node_modules/foundation-sites/js')
        ],
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'client')
        ],
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
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: true,
                minimize: !IS_DEBUG
              }
            },
            {
              loader: 'postcss-loader',
              options: { plugins: cssnext }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          'url-loader?limit=32768',
          'image-webpack-loader?limit=32768'
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          'url-loader?limit=32768'
        ]
      }
    ]
  }
}));
