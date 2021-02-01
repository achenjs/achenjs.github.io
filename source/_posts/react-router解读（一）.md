---
title: react-router解读（一）
date: 2018-08-27 20:10:45
tags: react
---

### 前言

前端路由是通过改变URL，在不重新请求页面的情况下，更新页面视图。
目前在浏览器环境中这一功能的实现主要有2种:

* 利用URL中的hash
* 利用H5中history

### pushState 和 replaceState 了解一下

>history 提供了两个方法，能够无刷新的修改用户的浏览记录，pushSate，和 replaceState，区别的 pushState 在用户访问页面后面添加一个访问记录， replaceState 则是直接替换了当前访问记录

history 对象的详细信息已经有很多很好很详细的介绍文献，这里不再做总结[history对象](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)

#### history.pushState

history.pushState方法接受三个参数，依次为：

>state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
假定当前网址是example.com/1.html，我们使用pushState方法在浏览记录（history对象）中添加一个新记录。

<pre>
    var stateObj = { foo: 'bar' };
    history.pushState(stateObj, 'page 2', '2.html');
</pre>

添加上面这个新记录后，浏览器地址栏立刻显示 example.com/2.html，但并不会跳转到 2.html，甚至也不会检查2.html 是否存在，它只是成为浏览历史中的最新记录。这时，你在地址栏输入一个新的地址(比如访问 google.com )，然后点击了倒退按钮，页面的 URL 将显示 2.html；你再点击一次倒退按钮，URL 将显示 1.html。

总之，pushState 方法不会触发页面刷新，只是导致 history 对象发生变化，地址栏会有反应。

如果 pushState 的 url参数，设置了一个新的锚点值（即hash），并不会触发 hashchange 事件。如果设置了一个跨域网址，则会报错。

<pre>
    // 报错
    history.pushState(null, null, 'https://twitter.com/hello');

    上面代码中，pushState想要插入一个跨域的网址，导致报错。这样设计的目的是，防止恶意代码让用户以为他们是在另一个网站上。
</pre>

#### history.replaceState

history.replaceState 方法的参数与 pushState 方法一模一样，区别是它修改浏览历史中当前纪录,假定当前网页是 example.com/example.html。

<pre>
    history.pushState({page: 1}, 'title 1', '?page=1');
    history.pushState({page: 2}, 'title 2', '?page=2');
    history.replaceState({page: 3}, 'title 3', '?page=3');

    history.back()
    // url显示为http://example.com/example.html?page=1

    history.back()
    // url显示为http://example.com/example.html

    history.go(2)
    // url显示为http://example.com/example.html?page=3
</pre>
