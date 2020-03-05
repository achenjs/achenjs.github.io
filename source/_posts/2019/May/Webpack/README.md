---
title: 从零配置webpack（基于webpack 4 和 babel 7版本）
date: 2019-05-25
tags: js
---

# 从零配置webpack（基于webpack 4 和 babel 7版本）

## webpack 核心概念

* Entry: 入口
* Module: 模块，webpack中一切皆是模块
* Chunk: 代码库，一个chunk由十多个模块组合而成，用于代码合并与分割
* Loader: 模块转换器，用于把模块原内容按照需求转换成新内容
* Plugin: 扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情
* Output: 输出结果

## webpack 流程

webpack启动后会从Entry里配置的Module开始递归解析Entry依赖的所有Module。每找到一个Module，就会根据配置的Loader去找出对应的转换规则，对
Module进行转换后，再解析出当前的Module依赖的Module。这些模块会以Entry为单位进行分组，一个Entry和其所有依赖的Module被分到一个组也就是一个
Chunk。最好Webpack会把所有Chunk转换成文件输出。在整个流程中Webpack会在恰当的时机执行Plugin里定义的逻辑。

## 最简webpack配置

首先初始化npm和安装webpack的依赖：

``` js
npm init -y
yarn add webpack webpack-cli --dev
```

配置webpack.config.js文件：

``` js
const path = require('path');

module.export = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',    //  此处不设置，默认为 main.js
    publicPath: '/'
  }
}
```

说明: publicPath上线时配置的是cdn的地址。

使用命令进行打包：

``` js
webpack --mode production
```

也可以将其配置到package.json中的 scripts 字段。
入口文件为src/index.js，打包输出到dist/bundle.js。

## 使用模板html

html-webpack-plugin 可以指定 template 模板文件，将会在 output 目录下，生成 html 文件，并引入打包后的js。
安装依赖：

``` js
yarn add html-webpack-plugin --dev
```

在 webpack.config.js 增加 plugins 配置：

``` js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ... other code
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    })
  ]
}
```

HtmlWebpackPlugin 还有一些其他的参数，如title（html的title），minify（是否要压缩），filename（dist中生成的html文件名）等。

## 配置 webpack-dev-server

webpack-dev-server 提供了一个简单的Web服务器和实时热更新的能力。
安装依赖：

``` js
yarn add webpack-dev-server --dev
```

在 webpck.config.js 增加 devServer 配置：

``` js
const WebpackDevServer = require('webpack-dev-server');

module.exports = {
  //  ... other code
  devServer: {
    contentBase: './dist',
    port: '8080',
    host: 'localhost'
  }
}
```

在 package.json 的 scripts 字段中增加：

``` js
dev: 'webpack-dev-server --mode development'
```

之后，我们就可以通过 npm run dev，来启动服务。
更多关于 [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)

## 支持加载 css 文件

通过使用不同的 style-loader 和 css-loader，可以将 css 文件转换成js文件类型。
安装依赖：

``` js
yarn add style-loader css-loader --dev
```

在 webpack.config.js 中增加 loader 的配置。

``` js
module.exports = {
  //  ...other code
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_module/,
        include: path.resolve(__dirname, 'src')
      }
    ]
  }
}
```

loader 可以配置以下参数：

* test: 匹配处理文件的扩展名的正则表达式
* use: loader的名称
* include/exclude: 手动指定必须处理的文件夹或屏蔽不需要处理的文件夹
* query: 为loader提供额外的设置选项

如果需要给loader传参，那么可以使用use + loading的方式，如：

``` js
module.exports = {
  //  other code
  module: {
    rules: [
      {
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          'css-loader'
        ],
        // ...
      }
    ]
  }
}
```

## 支持加载图片

* file-loader: 解决css等文件中的引入图片路径问题
* url-loader: 当图片小于limit的时候会把图片base64编码，大于limit参数的时候还是使用file-loader进行拷贝

**如果希望图片存放在单独的目录下，那么需要制定outputPath**

安装依赖：

``` js
yarn add url-loader file-loader --dev
```

在 webpack.config.js 中增加loader的配置（增加在 module.rules的数组中）。

``` js
module.exports = {
  //  ...other code
  module: {
    rules: [
      {
        test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  }
}
```

## 支持编译less和sass

现在大家都习惯使用less或者sass编写css，那么也需要在webpack中进行配置。
安装对应的依赖：

``` js
yarn add less less-loader --dev
yarn add sass sass-loader --dev
```

在 webpack.config.js 中增加 loader 的配置（module.rules数组中）。

``` js
module.exports = {
  //  ..  other code
  module: {
    rules: [
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /nodu_modules/,
        include: path.resolve(__dirname, 'src')
      }
    ]
  }
}
```

## 支持转义 ES6/ES7/JSX

ES6/ES7/JSX 转义需要 Babel 的依赖，支持装饰器

``` js
yarn add @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/plugin-proposal-decorators @babel/plugin-proposal-object-rest-spread --dev
```

在 webpack.config.js 中增加 loader 的配置（module.rules 数组中）。

``` js
module.exports = {
  // ...other code
  module: {
    rules: [
      test: /\.jsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', {'legacy': true}]
            ]
          }
        }
      ],
      exclude: /nodu_modules/,
      include: path.resolve(__dirname, 'src')
    ]
  }
}
```

## 压缩js文件

安装依赖：

``` js
yarn add uglifyjs-webpack-plugin --dev
```

在 webpack.config.js 中增加 optimization 的配置

``` js
const UglifyWebpackplugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // ... other code
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({
        parallel: 4
      })
    ]
  }
}
```

**以上最新版webpack已经默认开启uglifyjs，不需要单独安装plugins**
但是它是单线程压缩的，我们还可以利用webpack-parallel-uglify-plugin，解决多个js打包并行压缩的需要，优化打包效率

``` js
yarn add webpack-parallel-uglify-plugin --dev
```

在 webpack.config.js 中增加：

``` js
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
  //  other code
  plugins: [
    new WebpackParallelUglifyPlugin({
      ugfilyJS: {
        output: {
          beautify: false,  //  是否保留空格和制表符
          comments: false,  //  是否保留注释
        },
        compress: {
          warnings: false,  //  删除没有用到的代码时的警告信息,
          drop_console: true,   //  是否删除代码中的console语句
        }
      }
    })
  ]
}
```

## 分离css（如果css文件较大的话）

因为CSS的下载和JS可以并行，当一个html文件很大的时候，可以把css单独提取出来加载

``` js
yarn add mini-css-extract-plugin --dev
```

在 webpack.config.js 中增加 plugins 的配置，并且将 'style-loader' 修改为 {
  loader: MiniCssExtractPlugin.loader
}。
css打包在单独的目录，那么配置filename。

``` js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, 'css-loader'
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.less/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, 'css-loader', 'less-loader'
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.sass/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          }, 'css-loader', 'sass-loader'
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
}
```

## 压缩css文件

安装依赖：

``` js
yarn add optimiza-css-assets-webpack-plugin --dev
```

在 webpack.config.js 中的 optimization 中增加配置

``` js
const OptimizaCssAssetsWebpackPlugin = require('optimiza-css-assets-webpack-plugin');

module.exports = {
  //  ... other code
  optimization: {
    minimizer: [
      new OptimizaCssAssetsWebpackPlugin()
    ]
  }
}
```

## 打包前先清空输出目录

``` js
yarn add clean-webpack-plugin --dev
```

在 webpack.config.js 中增加 plugins 的配置

``` js
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // ...other code
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```
