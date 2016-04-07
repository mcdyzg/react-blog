var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var autoprefixer = require('autoprefixer');


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/app/app.jsx'

  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]

  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
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
