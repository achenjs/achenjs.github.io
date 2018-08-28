---
title: react-router解读（二）
date: 2018-08-27 20:58:02
tags:
---

### react-router 的路由实现

既然知道了这个原理，我们来看下 react-router 的实现，我们打开 [react-router 项目地址](https://github.com/ReactTraining/react-router),把项目克隆下来，或则直接在 github 上预览，在 React 开发的项目里，我们通过 router.push('home') 来实现页面的跳转，所以我们检索下，push 方法的实现

![push方法检索](/images/router/1.jpg)

我们检索到了 46个 js 文件，😂，一般到这个时候，我们会放弃源码阅读，那么我们今天的文章就到这结束，谢谢大家！

开个玩笑，源码阅读不能这么粗糙，react-router 4.x用法，我们只需要安装 react-router-dom。所以我们找到 package 下的 react-router-dom/modules 目录，点开 `index.js` 文件。

<pre>
  export BrowserRouter from "./BrowserRouter";
  export HashRouter from "./HashRouter";
  export Link from "./Link";
  export MemoryRouter from "./MemoryRouter";
  export NavLink from "./NavLink";
  export Prompt from "./Prompt";
  export Redirect from "./Redirect";
  export Route from "./Route";
  export Router from "./Router";
  export StaticRouter from "./StaticRouter";
  export Switch from "./Switch";
  export generatePath from "./generatePath";
  export matchPath from "./matchPath";
  export withRouter from "./withRouter";
</pre>

看到 history 对象的实例与配置的 mode 有关，react-router-dom 通过3种方式实现了路由切换。我们今天讲的内容相匹配的是 `createBrowserHistory` 的实现方案 (另外两个分别是：createHashHistory和createMemoryHistory)。 这里 react-router-dom 将 BrowserRouter、HashRouter、Link 拆分为单独组件实现，也是与 react-router 3 之间的区别之一。
[详细文档](https://github.com/ReactTraining/history#blocking-transitions)
我们来看 react-router-dom 中的 BrowserRouter 源码：

<pre>
    import warning from "warning";
    import React from "react";
    import PropTypes from "prop-types";
    import { createBrowserHistory as createHistory } from "history";
    import Router from "./Router";

    /**
    * The public API for a <Router> that uses HTML5 history.
    */
    class BrowserRouter extends React.Component {
      static propTypes = {
        basename: PropTypes.string,
        forceRefresh: PropTypes.bool,
        getUserConfirmation: PropTypes.func,
        keyLength: PropTypes.number,
        children: PropTypes.node
      };

      history = createHistory(this.props);

      componentWillMount() {
        warning(
          !this.props.history,
          "<BrowserRouter> ignores the history prop. To use a custom history, " +
            "use `import { Router }` instead of `import { BrowserRouter as Router }`."
        );
      }

      render() {
        return <Router history={this.history} children={this.props.children} />;
      }
    }

    export default BrowserRouter;
</pre>

由上可知我们在项目中使用的<BrowserRouter>组件，history方式是使用了一个叫[history](https://github.com/ReactTraining/history)库中的 createBrowserHistory 方法。

### 模拟单页面路由

通过上面的学习，我们知道了，单页面应用路由的实现原理，我们也尝试去实现一个。在做管理系统的时候，我们通常会在页面的左侧放置一个固定的导航 sidebar，页面的右侧放与之匹配的内容 main 。点击导航时，我们只希望内容进行更新，如果刷新了整个页面，到时导航和通用的头部底部也进行重绘重排的话，十分浪费资源，体验也会不好。这个时候，我们就能用到我们今天学习到的内容，通过使用 HTML5 的 pushState 方法和 replaceState 方法来实现，

思路：首先绑定 click 事件。当用户点击一个链接时，通过 preventDefault 函数防止默认的行为（页面跳转），同时读取链接的地址（如果有 jQuery，可以写成$(this).attr('href')），把这个地址通过pushState塞入浏览器历史记录中，再利用 AJAX 技术拉取（如果有 jQuery，可以使用$.get方法）这个地址中真正的内容，同时替换当前网页的内容。

为了处理用户前进、后退，我们监听 popstate 事件。当用户点击前进或后退按钮时，浏览器地址自动被转换成相应的地址，同时popstate事件发生。在事件处理函数中，我们根据当前的地址抓取相应的内容，然后利用 AJAX 拉取这个地址的真正内容，呈现，即可。

最后，整个过程是不会改变页面标题的，可以通过直接对 document.title 赋值来更改页面标题。

### 扩展

好了,我们今天通过多个方面来讲了 pushState 方法和 replaceState 的应用，你应该对这个两个方法能有一个比较深刻的印象，如果想要了解更多，你可以参考以下链接

[history对象](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)

