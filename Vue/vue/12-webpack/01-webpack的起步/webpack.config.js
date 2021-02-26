// webpack 配置文件
const path = require('path');

// 配置打包路径
module.exports = {
  // 入口
  entry: './src/main.js',
  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: 'dist/'
  },
  module: {
    rules: [
      // css文件配置
      {
        test: /\.css$/i,
        // css-loader只负责将css文件进行加载
        // style-loader负责将样式添加到dom中
        // 使用多个loader是从右向左读
        use: ['style-loader', 'css-loader'],
      },
      // less文件配置
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader", ]
      },
      //  图片配置
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            // 当加载的图片，小于limit时，会将图片编译成base64字符串形式
            // 当加载的图片大于limit时，需要file-loader模块进行加载
            // limit 配置图片大小
            limit: 15000,
            name: 'img/[name].[hash:4].[ext]'
          },
        }]
      },
      // 语法转换
      {
        test: /\.js$/,
        // 排除node模块包里面的js
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

    ],
  },
  resolve: {
    // alias 别名
    alias: {
      'veu$': 'vue/dist/vue.js'
    }
  }
}