---
title: 常见的浏览器兼容问题
date: 2019-05-05
tags: js
---

# 常见的浏览器兼容问题

## html中的兼容问题

### 不同浏览器的标签默认的外补丁和内补丁不同

* 场景：随便写几个标签，不加样式控制的情况下，各自的margin和padding差异较大。
* 解决方法：上来先消除默认样式* {margin: 0, padding: 0}

### 块属性标签float后，又有横行的margin的情况下，在IE6显示margin比设置的大（即双倍边距bug）

* 场景：常见症状是IE6后面的一块被顶到下一行;
* 解决方法：在float的标签样式控制中加入display: inline-block; 将其转化为行内属性

### IE6 中z-index失效

* 场景：元素的父级元素设置的z-index为1，那么其子级元素再设置z-index时会失效，其层级会继承父级元素的设置，造成某些层级调整上的bug
* 原因：z-index起作用有个前提，就是元素的position属性要是relative、absolute或者fixed。
* 解决方案：1. position: relative 改为 position: absolute; 2. 去除浮动; 3. 浮动元素添加position属性（如relative，absolute等）。

### 在写a标签的样式，写的样式没有效果，其实只是写的样式被覆盖了

* 正确的a标签顺序：link/visited/hover/active

### 24位png图片，IE6中不兼容透明底儿

* 解决方式：1. 使用8位png图片; 2. 为ie6准备一套特殊的图片

## js在不同浏览器中的兼容问题

### 事件监听的兼容

* IE不支持addEventListener;
* 解决：给IE使用attachEvent

``` js
var addHandler = function(e, type, handler) {
  if (e.addEventListener) {
    e.addEventListener(type, handler, false);
  } else if (e.attachEvent) {
    e.attachEvent('on' + type, handler);
  } else {
    e['on' + type] = handler;
  }
}

var removeHandler = function(e, type, handler) {
  if (e.removeEventListener) {
    e.removeEventListener(type, handler, false);
  } else if (e.detachEvent) {
    e.detachEvent('on' + type, handler);
  } else {
    on['on' + type] = null
  }
}
```

### event.targey的兼容，引发事件的DOM元素。

* IE 6789不支持event.target
* 解决方法：event.srcElement;

``` js
target = event.target || event.srcElement;
```

### 阻止系统默认的兼容

* IE 6789不支持event.preventDefault;

``` js
event.preventDefault ? event.preventDefault() : event.returnValue = false
```

### 阻止事件冒泡的兼容

* IE 6789不支持event.stopPropagation;

``` js
event.stopPropagation ? event.stopPropagation() : event.cancelBubble = false
```