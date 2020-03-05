---
title: NextTick 原理分析
date: 2019-06-13
tags: js
---

# NextTick 原理分析

nextTick可以让我们在下次DOM更新循环结束之后执行延迟回调，用于获得更新后的DOM。

在Vue2.4之前都是使用的microtasks，但是microtasks的优先级过高，在某些情况下可能会出现比事件冒泡更快的情况，但如果都是macrotasks又可能会出现渲染的性能问题。所以在新版本中，会默认使用microtasks，但在特殊情况下会使用macrotasks，比如v-on。

对于实现macrotasks，会先判断是否能使用setImmediate，不能的话降级为MessageChannel，以上都不行的话就使用setTimeout。

``` js
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (
  typeof MessageChannel !== 'undefined' &&
  (isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]')
) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

以上代码用来判断能不能使用相应的API。

## 注解

* macrotasks（宏任务）： setTimeout, setInterval, setImmediate, I/O, UI rendering
* microtasks（微任务）： process.nextTick, Promise, MutationObserver
