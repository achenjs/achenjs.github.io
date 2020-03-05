---
title: iframe的优缺点
date: 2019-10-09 11:14:34
tags: js
---

# iframe的优缺点

## iframe的优点：

1. iframe能够原封不动的把嵌入的网页展现出来。

2. 如果有多个网页引用iframe，那么你只需要修改iframe的内容，就可以实现调用的每一个页面内容的更改，方便快捷。

3. 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，可以增加代码的可重用。

4. 如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由iframe来解决。

## iframe的缺点：

1. 会产生很多页面，不容易管理。

2. iframe框架结构有时会让人感到迷惑，如果框架个数多的话，可能会出现上下、左右滚动条，会分散访问者的注意力，用户体验度差。

3. 代码复杂，无法被一些搜索引擎索引到，这一点很关键，现在的搜索引擎爬虫还不能很好的处理iframe中的内容，所以使用iframe会不利于搜索引擎优化。

4. 很多的移动设备（PDA 手机）无法完全显示框架，设备兼容性差。

5. iframe框架页面会增加服务器的http请求，对于大型网站不是可取的。

### iframe迁移问题以及解决方案

1. import React, { propTypes } from 'react';

error: PropTypes is undefined;

出现原因: React在新版本中废弃了集成类似propTypes这种第三方库方案。

解决方案: 新仓库使用的react版本较高，以上方式已被废弃，应使用

``` js
import PropTypes from 'prop-types';
```

2. import './style.less';

error: 样式失效问题。

出现原因: 新项目中开启了css-module，需要通过配置:global来声明一个全局class，使其在全局起作用。

解决方案1:

``` less
### style.less

.content {
    :global {
        .items {}
    }
}
```

``` js
import styles from './style.less';

<div className={styles.content}>
    <div className="items"></div>
</div>
```

解决方案2:

``` less
# style.less

:global {
    .content {
        .items {}
    }
}
```

``` js
import './style.less';
<div className="content">
    <div className="items"></div>
</div>
```

推荐使用方案1，可以利用css-module的命名规则减少项目中样式的冲突问题。方案2改动小但是太暴力，非常可能产生样式冲突问题。

3. comm和components中组件出现不可用情况。

error: 功能不可用情况。

解决方案: 建议直接使用antd替换，需要花上一点时间对应antd api做一定代码重构。(!这块需要仔细效验功能是否正常)

4. ec_fe中使用了Component.contextTypes。

例如：

``` js
Manage.contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
```

Warning: Failed context type: The context `history` is marked as required in `Connect(ContractReview)`, but its value is `undefined`.

解决方案：拆分出去的仓库，react-router版本使用的是4.x，已经不需要像老版本一样一层层传递history或者绑定在Context上共享的方式。

5. ec_fe中使用了this.props.router等路由api

``` js
this.props.router.replace({
    pathname: `/admin/web/packageconfig/function.html`,
    query: {
        id: moduleList[0].f_id,
    },
});
```

错误：index.jsx:59 Uncaught TypeError: Cannot read property 'replace' of undefined

解决方案：拆分出去的仓库，react-router版本使用的是4.x，请使用react-router-dom提供的api修改。

``` js
this.props.history.replace({
    pathname: `/packageconfig/funModule`,
    search: `id=${moduleList[0].f_id}`,
});
```

#### 参考资料

* [浅谈iframe](https://www.jianshu.com/p/8fbee843437c)
* [react-router-dom](https://reacttraining.com/react-router/web/api/history/history-is-mutable)
