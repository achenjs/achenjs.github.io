---
title: 如何写一个jQuery插件
date: 2019-05-13
tags: js
---

## 如何写一个jQuery插件

### jQuery 插件开发模式

jQuery的插件开发模式主要有三种：

* 通过$.extend()来扩展jQuery
* 通过$.fn向jQuery添加新的方法
* 通过$.widget()应用jQuery UI的部件工厂方式创建

#### $.extend()

``` js
$.fn.extend({
 check: function() {
    return this.each(function() {
      this.checked = true;
    }),
 }
 uncheck: function() {
    return this.each(function() {
      this.checked = false;
    })
  }
})

$("input[type='checkbox']").check();
```

#### $.fn

``` js
function myPlugin($ele, options) {};

myPlugin.prototype = {
  method1: function() {},
  method2: function() {},
};

$.fn.myplugin = function(options) {
  new myPlugin(this, options);
}
```