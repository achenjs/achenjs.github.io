---
title: 你真的理解 Webpack?
date: 2020-09-07 10:30:00
tags: webpack
---

#### webpack 实战

##### 1. 与 Webpack 类似的工具还有哪些

- webpack

> 适用于大型复杂的前端站点构建

- [https://rollupjs.org/]rollup

> rollup适用于基础库的打包，如vue、react

- [https://parceljs.org/]parcel

> parcel适用于简单的实验性项目，他可以满足低门槛的快速看到效果parcel

##### 2. 谈谈你为什么选择使用或放弃 webpack

##### 3. Loader 和 Plugin 的不同

###### 不同的作用

- Loader 直译为"加载器"。webpack 将一切文件视为模块, 但是 webpack 原生是只能解析 js 文件, 如果想将其他文件也打包的话, 就会用到 loader。
所以 loader 的作用是让 webpack 拥有加载和解析非 JavaScript 文件的能力。

- Plugin 直译为"插件"。 Plugin 可以扩展 webpack 的功能, 让 webpack 具有更多的灵活性。在 webpack 运行的生命周期中会广播出许多事件, Plugin 可以
监听这些事件, 在合适的时机

###### 不同的用法

- Loader 在 module.rules 中配置, 也就是说他作为模块的解析规则而存在。类型为数组, 每一项都是一个 Object, 里面描述了对于什么类型的文件(test), 使用什么
加载(loader)和使用的参数(options)。

- Plugin 在 Plugins 中单独配置。类型为数组, 每一项是一个 Plugin 的实例, 参数都通过构造函数传入。

##### 4. 有哪些常见的 Loader？他们能解决什么问题？

- file-loader: 把文件输出到一个文件夹中, 在代码中通过相对 URL 去引用输出的文件
- url-loader: 和 file-loader 类似, 但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader: 加载额外的 Source Map 文件, 以方便断点调试
- image-loader: 加载并且压缩图片文件
- babel-loader: 把 ES6 转换成 ES5
- css-loader: 加载 CSS, 支持模块化、压缩、文件导入等特性
- style-loader: 把 CSS 代码注入到 JavaScript 中, 通过 DOM 操作去加载 CSS
- eslint-loader: 通过 ESLint 检查 JavaScript 代码
 
##### 5. 有哪些常见的 Plugin？他们能解决什么问题？

- define-plugin: 定义环境变量
- uglifujs-webpack-plugin: 通过 UglifyES 压缩 ES6 代码
- commons-chunk-plugin: 提取公共代码

##### 6. 如何利用 Webpack 来优化前端性能

用 webpack 优化前端性能是指优化 webpack 的输出结果, 让打包的最终结果在浏览器运行快速高效。

- 压缩代码。
- 利用 CDN 加速。
- 删除多余代码(Tree Shaking)。
- 提取公共代码。

##### 7. 如何提高 Webpack 的构建速度?

- 多入口情况下, 使用 CommonsChunkPlugin 来提取公共代码。
- 通过 externals 配置来提取常用库
- 利用 DllPlugin 和 DllReferencePlugin 预编译资源模块 通过 Dll来对那些我们引用但是绝对不会修改的 npm 包来
进行预编译, 再通过 DllReferencePlugin 将预编译的模块加载进来。
- 使用 HappyPack 实现多线程加速编译。
- 使用 webpack-uglify-parallel 来提升 uglifyPlugin 的压缩速度。原理上 webpack-uglify-parallel 采用了多核并行
压缩来提升压缩速度。
- 使用 Tree-shaking 和 Scope Hoisting 来剔除多余代码。

##### 8. 如何对 bundle 体积进行监控和分析?

##### 9. 怎么配置单页应用？怎么配置多页应用？

##### 10. 如何在 Vue 和 React 项目中实现按需加载？

##### 11. monorepo 这种项目有什么好处，具体是如何打包的？

##### 12. Source Map 是什么？生产环境怎么用？

##### 13. 什么是长缓存？

##### 14. 在 Webpack 中如何做到长缓存优化？

##### 15. Webpack 中 hashchunkhashcontenthash 有什么区别？

#### Webpack 原理

##### 1. Webpack 的构建流程是什么？

##### 2. 是否写过 Loader ?描述一下编写 Loader 的思路？

##### 3. 是否写过 Plugin ?描述一下编写 Plugin 的思路？

##### 4. inlineprepostnormalloader 执行先后顺序是？

##### 5. Webpack 打包的原理是什么？聊一聊 babel 和抽象语法树

##### 6. dev-server 的原理是什么？描述一下它的具体流程

##### 7. 请说一下 DIlPlugin 和 DllReferencePlugin 的工作原理

##### 8. Webpack 的热更新是如何做到的？说明其原理？

##### 9. Tree shaking了解过么？它的实现原理说一下

#### Webpack 5

##### 1. Webpack 5 中有哪些新特性

##### 2. Webpack 5 中的 Module Federation 对微前端的意义
