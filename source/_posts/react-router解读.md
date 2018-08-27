---
title: react-router解读
date: 2018-08-27 15:18:54
tags:
---

### 前端路由
前端路由是通过改变URL，在不重新请求页面的情况下，更新页面视图。
目前在浏览器环境中这一功能的实现主要有2种:
* 利用URL中的hash
* 利用H5中history

### react-router v3 与 v4的使用和差别
1. [react-router v3 基本用法](https://github.com/achenjs/react-router-compared/tree/master/router3)
2. [react-router v4 基本用法](https://github.com/achenjs/react-router-compared/tree/master/router4)
3. 源码对比

### 差异总结
1. v4去掉了路由钩子onEnter、onLeave等
2. v4去掉了IndexRouter等组件
3. v4不在提供hashHistory和browserHistory等方法，而是将他们封装成了react组件
4. v4更加组件化，将一切react-router问题变成了react组件问题

### 参考资料
* [react-router官网](https://reacttraining.com/react-router/)
