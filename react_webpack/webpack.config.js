const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
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
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
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
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "./dist"),
    host: "0.0.0.0", // 可以使用手机访问
    port: 8080,
    historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
    proxy: {
      // 代理到后端的服务地址，会拦截所有以api开头的请求地址
      "/api": "http://localhost:3000"
    }
  },
  devtool:"cheap-module-eval-source-map",// 开发环境配置
}