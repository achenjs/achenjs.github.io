---
title: call、apply有什么区别？call、apply和bind的内部实现
date: 2019-05-01
tags: js
---

# call、apply有什么区别？call、apply和bind的内部实现

call、apply的功能相同，区别在于传参的方式不一样：

* fn.call(obj, arg1, arg2, ...)，调用一个函数，具有一个指定的this值和分别提供的参数（参数的列表）。
* fn.apply(obj, [argsArray])，调用一个函数，具有一个指定的this值，以及作为一个数组（或类数组对象）提供参数。

## call核心

* 将函数设为传入参数的属性
* 指定this到函数并传入给定参数执行函数
* 如果不传入参数或者参数为null，默认指向为 window/global
* 删除参数上的函数

``` js
Function.prototype.call = function(context) {
  /*
   * 如果第一个参数传入的是 null 或者 undefined，那么this指向 window/global
   * 如果第一个参数传入的不是 null 或者 undefined，那么必须是一个对象
  */
  if (!context) {
    //  context为null或者是undefined
    //  判断是浏览器环境还是node环境
    context = typeof window === 'undefined' ? global : window;
  }
  context.fn = this;  //  this指向是当前的函数（Function的实例）
  let rest = [...arguments].slice(1); //  获取除了this指向对象以外的参数，空数组slice后返回的仍然是空数组
  let result = context.fn(...rest); //  隐式绑定，当前函数的this指向了context
  delete context.fn;
  return result;
}

// test code
var foo = {
  name: 'Selina'
};
var name = 'Chirs';
function bar(job, age) {
  console.log(this.name);
  console.log(job, age);
}
bar.call(foo, 'programmer', 20);
//  Selina programmer, 20
bar.call(null, 'teacher', 25);
//  brower环境： Chirs teacher, 25； node环境： undefined teacher, 25
```

## apply核心

apply的实现和call很类似，但是需要注意他们的参数不一样，apply的第二个参数是数组或类数组。

``` js
Function.prototype.apply = function(context, rest) {
  /*
   * 如果第一个参数传入的是 null 或者 undefined，那么this指向 window/global
   * 如果第一个参数传入的不是 null 或者 undefined，那么必须是一个对象
  */
  if (!context) {
    //  context为null或者是undefined
    //  判断是浏览器环境还是node环境
    context = typeof window === 'undefined' ? global : window;
  }
  context.fn = this;
  let result;
  if (rest == null) {
    //  undefined 或者 null 不是 Iterator 对象，不能被...
    result = context.fn(rest);
  } else if (typeof rest === 'object') {
    result = context.fn(...rest);
  }

  delete result.fn;
  return result;
}

// test code
var foo = {
  name: 'Selina'
};
var name = 'Chirs';
function bar(job, age) {
  console.log(this.name);
  console.log(job, age);
}
bar.apply(foo, ['programmer', 20]);
//  Selina programmer, 20
bar.apply(null, ['teacher', 25]);
// brower环境： Chirs teacher, 25； node环境： undefined teacher, 25
```

## bind核心

bind 和 call/apply 有一个很重要的区别，一个函数被 call/apply 的时候，会直接调用，但是 bind会创建一个新函数。当这个新函数被调用时，bind()的第一个参数将
作为它运行时的this，之后的一系列参数将会在传递的实参前传入作为它的参数。

``` js
Function.prototype.bind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function');
  }
  let self = this;
  let args = [...arguments].slice(1);
  function Fn() {};
  Fn.prototype = this.prototype;
  let bound = function() {
    let res = [...args, ...arguments];  //  bind传递的参数和函数调用时传递的参数拼接
    context = this instanceof Fn ? this : context || this;
    return self.apply(context, res);
  }

  //  原型链
  bound.prototype = new Fn();
  return bound;
}

var name = 'Jack';
function person(age, job, gender){
    console.log(this.name , age, job, gender);
}
var Yve = {name : 'Yvette'};
let result = person.bind(Yve, 22, 'enginner')('female');
```