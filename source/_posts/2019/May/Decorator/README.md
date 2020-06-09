---
title: 修饰器的使用
date: 2019-05-09
tags: js
---

由于使用了decorator, node不用正常识别，需要使用babel转换

```
$ babel-node test.js
```

### 1. 类修饰器（只有一个参数）

target: 指向类，如果是类型是function，则指向MyFunction.prototype

``` js
function testable(target) {
  target.isTestable = false;
}

@testabel
class MyTestableClass {}
```

以上代码，@testable就是一个装饰器，它为MyTestableClass这个类添加了一个静态属性isTestable

``` js
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
    target.prototype.name = 'achen';
  }
}

@testabel(false)
class MyTestabelClass {}

```
以上代码，告诉我们@testable何如传递参数，并且如何为类添加原型属性或者方法。

### 2. 方法修饰器（有三个参数）

target: 方法所在的类
name: 方法名称
descriptor: 描述对象

``` js
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments);

    return oldValue.apply(this, arguments);
  }

  return descriptor;
}

const math = new Math();

math.add(2, 4);
```

#### 为什么修饰器不能用于函数？

修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升

``` js
var conuter = 0;

var add = function() {
  counter++;
};

@add
function foo() {
}
```
