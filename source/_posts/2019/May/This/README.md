---
title: This
date: 2019-05-17
tags: js
---

## this

1. 默认绑定
2. 隐式绑定
3. 硬绑定
4. new绑定

### 默认绑定

默认绑定，在不能应用其他绑定规则时使用的默认规则，通常是独立函数调用。

``` js
function sayHi() {
  console.log('Hello', this.name);
}
var name = 'achen';
sayHi();
```

在调用sayHi()时，应用了默认绑定，this指向全局对象（非严格模式下），严格模式下，this指向undefined，undefined上没有this对象，会抛出错误。
上面的代码，如果在浏览器环境中运行，那么结果是 Hello, achen
但是如果在node环境中运行，结果就是Hello, undefined，这是因为node中name并不是挂在全局对象上的。

### 隐式绑定

函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的形式为 XXX.fun()。

``` js
function sayHi() {
  console.log('Hello', this.name);
}
var person = {
  name: 'achen',
  sayHi: sayHi
};
var name = 'achenjs';
persin.sayHi();
```

### 硬绑定（显示绑定）

通过call，apply，bind的方式，显示的指定this所指向的对象。
call，apply，bind的第一个参数，就是对应函数的this所指向的对象。call和apply的作用一样，只是传参方式不同。call和apply都会执行对应的函数，而bind方法不会。

``` js
function sayHi() {
  console.log('Hello', this.name);
}
var person = {
    name: 'YvetteLau',
    sayHi: sayHi
}
var name = 'Wiliam';
var Hi = person.sayHi;
Hi.call(person);  // Hi.apply(person)
```

### new绑定

> 使用new来调用函数，会自动执行下面的操作：

1. 创建一个新对象
2. 将构造函数的作用域赋值给新对象，即this指向这个新对象
3. 执行构造函数中的代码
4. 返回新对象

``` js
function SayHi(name) {
  this.name = name;
}
var Hi = new SayHi('achen');
console.log(Hi.name);   //  achen
```

输出结果为achen，原因是因为在var Hi = new SayHi('achen'); 这一步，会将SayHi中的this绑定到Hi对象上。

#### 绑定优先级

new绑定 > 显示绑定 > 隐式绑定 > 默认绑定

#### 绑定另外

如果我们将null或者undefined作为this的绑定对象传入call、apply或者是bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。

``` js
var foo = {
  name: 'Selina',
}
var name = 'Chirs';
function bar() {
  console.log(this.name);
}
bar.call(null);   //  Chirs
```

##### 箭头函数

箭头函数是ES6中新增的，它和普通函数有一些区别，箭头函数没有自己的this，它的this继承于外层代码库中的this。箭头函数在使用中，需要注意以下几点：

1. 函数体内的this对象，继承的是外层代码块的this。
2. 不可以当做构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用rest参数代替。
4. 不可以使用yield命令，因此箭头函数不能用作Generator函数。
5. 箭头函数没有自己的this，所以不能用call、apply、bind这些方法改变this的指向。

``` js
var obj = {
  hi: function() {
    console.log(this);
    return () => {
      console.log(this);
    }
  },
  sayHi: function() {
    return function() {
      console.log(this);
      return () => {
        console.log(this);
      }
    }
  },
  say: () => {
    console.log(this);
  }
};
let hi = obj.hi();          //  obj
hi();                       //  obj
let sayHi = obj.sayHi();
let fun1 = sayHi();         //  window
fun1();                     //  window
obj.say();                  //  window
```
