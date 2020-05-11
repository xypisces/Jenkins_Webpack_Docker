const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

/** 配置字体和图片,以及添加css3前缀 */
module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist')
  },
  module: {
    rules:[
    {
      test: /\.css$/,
      use: ExtractTextWebpackPlugin.extract({ // 文件拆分
        use: [
          { 
            loader: 'css-loader' 
          }
        ],
        publicPath: '../'
      })
    },
    {
      test: /\.scss$/,
      use: ExtractTextWebpackPlugin.extract({
        use: [
          { 
            loader: 'css-loader' 
          },
          {
            loader: 'postcss-loader', // css3前缀配置
            options: {
              plugins: function() {
                require('autoprefixer')
              }
            }
          },
          { 
            loader: 'sass-loader' 
          },
        ],
        publicPath: '../'
      })
    },
    {
      test: /\.(jpe?g|png|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          outputPath: 'images/'
        }
      }]
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'] // 配置选项里的presets
          // 包含ES6还有之后的版本和那些仅仅是草案的内容
        },
      },
      include: /src/, // 只转化src目录下的js
      exclude: /node_modules/,
    }
  ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
    }),
    new ExtractTextWebpackPlugin('css/style.css')
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vender',
          priority: 10,
        }
      }
    }
  },
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 3333,
    hot: true,
  },
  mode: 'development'
}

// /** 配置css文件 */
// module.exports = {
//   entry: {
//     index: './src/index.js',
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve('dist')
//   },
//   module: {
//     rules:[{
//       test: /\.css$/,
//       use: ExtractTextWebpackPlugin.extract({
//         use: 'css-loader',
//         publicPath: '../'
//       })
//     }]
//   },
//   plugins: [
//     new CleanWebpackPlugin('dist'),
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//       hash: true,
//     }),
//     new ExtractTextWebpackPlugin('css/style.css')
//   ],
//   devServer: {},
//   mode: 'development'
// }

/** 多入口文件配置和html文件配置 */
// module.exports = {
//   entry: {
//     index: './src/index.js',
//     login: './src/login.js'
//   },
//   output: {
//     filename: '[name].js',
//     path: path.resolve('dist')
//   },
//   module: {},
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//       hash: true,
//     })
//   ],
//   devServer: {},
//   mode: 'development'
// }

/** 最基础的配置 */
// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve('dist')
//   },
//   module: {},
//   plugins: [],
//   devServer: {},
//   mode: 'development'
// }
