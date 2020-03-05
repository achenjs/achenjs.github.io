---
title: 构造方法constructor
date: 2019-05-03
tags: js
---

# 构造方法

constructor是一种用于创建和初始化class创建的对象的特殊方法。
**描述**

1. 在一个类中只能有一个名叫"constructor"的特殊方法。一个类中出现多次将会抛出SyntaxError错误。
2. 在一个构造方法中可以使用super关键字来调用一个父类的构造方法
3. 如果没有显示指定构造方法，则会添加默认的construtor方法。
4. 如果不指定一个构造函数（constructor）方法，则使用一个默认的构造函数（constructor）

> 如果不指定构造方法，则使用默认构造函数。对于基类，默认构造函数是：

``` js
constructor() {}
```

> 对于派生类，默认构造函数是：

``` js
constructor(...args) {
  super(...args);
}
```

## extends

extends关键字用于类声明或者类表达式中，以创建一个类，该类是另一个类的子类。
**描述**

extends关键字用来创建一个普通类或者内建对象的子类
继承的.prototype必须是一个Object或者null。

## static

类（class）通过static关键字定义静态方法。不能在类的实例上调用静态方法，而应该通过类本身调用。这些通常是实用程序方法，例如创建或克隆对象的功能

``` js
class ClassWithStaticMethod {
  static staticMethod() {
    return 'static method has been called.';
  }
}
ClassWithStaticMethod.staticMethod();
```

## 调用静态方法

* 从另一个静态方法，静态方法调用同一个类中的其他静态方法，可使用this关键字

``` js
class StaticMethodCall {
    static staticMethod() {
        return 'Static method has been called';
    }
    static anotherStaticMethod() {
        return this.staticMethod() + ' from another static method';
    }
}
```

* 从类的构造函数和其他方法，非静态方法中，不能直接使用this关键字来访问静态方法。而是要用类名来调用；
CLASSNAME.STATIC_METHOD_NAME()，或者用构造函数的属性来调用该方法；this.constructor.STATIC_METHOD_NAME()。

``` js
class StaticMethodCall {
    constructor() {
        console.log(StaticMethodCall.staticMethod());
        // 'static method has been called.'
        console.log(this.constructor.staticMethod());
        // 'static method has been called.'
    }
    static staticMethod() {
        return 'static method has been called.';
    }
}
```

### 补充

1. 目前ECMAScript，class中还没有定义Private（私有属性）的能力，所以我们通过约定，用下划线来标记它们。

``` js
class Car {
  _milesDriven = 0;
  drive(distance) {
    this._milesDriven += distance;
  }
  getMilesDriven() {
    return this._milesDriven;
  }
}
```

在上面的事例中，我们依靠Car的实例调用getMilesDriven方法来获取到它的私有属性_milesDriven。但是，因为没有什么能使_milesDriven成为私有的，
所以任何实例都可以访问它。

``` js
const tesla = new Cal();
tesla.drive(10);
console.log(tesla._milesDriven);
```

目前Class Fields有个提案，我们可以通过#创建私有字段。

``` js
class Car {
  #milesDriven = 0;
  drive(distance) {
    this.#milesDriven += distance;
  }
  getMilesDriven() {
    return this.#milesDriven;
  }
}

const tesla = new Car()
tesla.drive(10)
tesla.getMilesDriven() // 10
tesla.#milesDriven // Invalid
```
