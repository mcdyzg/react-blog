var path = require('path');
var webpack = require('webpack');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/app/app.jsx'
  ],
  output: {
    path: path.join(__dirname, 'be/static'),
    filename: 'bundle.js',
    publicPath: '/'  

  },
  resolve: {
    extensions: ["", ".js", ".jsx"]

  },
  plugins: [
    new webpack.NoErrorsPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss-loader!sass',
        include: [path.resolve(__dirname, "src")],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.json$/,
        loaders: [ 'json' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  eslint: {
    configFile: '.eslintrc'
  }
};
