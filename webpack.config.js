let env = process.env.NODE_ENV
if (!env) {
  env = process.env.NODE_ENV = 'production'
}

console.log(process.env.NODE_ENV) // eslint-disable-line

var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

try {
  var config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
} catch (e) {}

var DEVELOPMENT = process.env.NODE_ENV === 'development'
var OUTPUT_DIR = path.join(__dirname, 'dist/')
var DEV_TOOLS = process.env.DEV_TOOLS

var JS_LOADER = {
  test: /\.(js|jsx)$/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  },
  include: path.join(__dirname, 'src'),
  exclude: /node_modules/
}

var webpackConfig = {
  devtool: DEVELOPMENT ? 'eval': 'cheap-source-map',

  entry: {
    'main': DEVELOPMENT
      ? [
        'babel-polyfill',
        'react-hot-loader/patch',
        './src/index'
      ]
      : [
        'babel-polyfill',
        './src/index'
      ]
  },

  output: {
    path: DEVELOPMENT ? __dirname : OUTPUT_DIR,
    filename: DEVELOPMENT ? '[name].js' : 'public/[name]-[hash].js',
    chunkFilename: '[id]-[chunkhash].js',
    sourceMapFilename: '[file]-[hash].map',
    publicPath: '/'
  },

  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.json'],
    alias: {}
  },

  module: {
    rules: [
      JS_LOADER,
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              path.join(__dirname, 'node_modules')
            ]
          }
        }],
        include: path.join(__dirname, 'src')
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': DEVELOPMENT,
      __DEV_TOOLS__: DEV_TOOLS,
      '__POLL_CHAT__': parseInt(process.env.POLL_CHAT, 10) || 0,
      'process.env.NODE_ENV': DEVELOPMENT ? '"development"' : '"production"'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],

  devServer: {
    contentBase: __dirname,
    hot: true,
    historyApiFallback: true,
    port: 4000,
    inline: true
  }
}

if (!DEVELOPMENT) {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      mangle: true,
      sourceMap: false
    })
  ])
} else {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ])
}

module.exports = webpackConfig
