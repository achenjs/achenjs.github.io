---
title: react-router解读（三）
date: 2018-08-28 20:37:33
---

### history methods createBrowserHistory
通过之前我们已经知道了react-router-dom的<BrowserRouter> history模式使用的是history库中的createBrowserHistory方法。下面我们来一起看看其中的奥秘。
<pre>
  var createBrowserHistory = function createBrowserHistory() {
    //  arguments[0], 由上一节可知它是一个非必传的object
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Browser history needs a DOM');
    //  之前将history赋值给变量globalHistory
    var globalHistory = window.history;
    //  _DOMUtils.js 中处理一些浏览器兼容性 和 浏览器内核、机型判断的方法
    //  判断是否非主流机型以及浏览器
    var canUseHistory = (0, _DOMUtils.supportsHistory)();
    //  是否为IE浏览器
    var needsHashChangeListener = !(0, _DOMUtils.supportsPopStateOnHashChange)();
    //  forceRefresh为true，代表将在页面导航时使用完整页面刷新。其他参数请自行参考官网文档
    var _props$forceRefresh = props.forceRefresh,
        forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
        _props$getUserConfirm = props.getUserConfirmation,
        getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
        _props$keyLength = props.keyLength,
        keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

    var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';

    var getDOMLocation = function getDOMLocation(historyState) {
      var _ref = historyState || {},
          key = _ref.key,
          state = _ref.state;

      var _window$location = window.location,
          pathname = _window$location.pathname,
          search = _window$location.search,
          hash = _window$location.hash;

      var path = pathname + search + hash;

      (0, _warning2.default)(!basename || (0, _PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

      if (basename) path = (0, _PathUtils.stripBasename)(path, basename);

      return (0, _LocationUtils.createLocation)(path, state, key);
    };

    var createKey = function createKey() {
      return Math.random().toString(36).substr(2, keyLength);
    };

    var transitionManager = (0, _createTransitionManager2.default)();

    var setState = function setState(nextState) {
      _extends(history, nextState);

      history.length = globalHistory.length;

      transitionManager.notifyListeners(history.location, history.action);
    };

    var handlePopState = function handlePopState(event) {
      if ((0, _DOMUtils.isExtraneousPopstateEvent)(event)) return;

      handlePop(getDOMLocation(event.state));
    };

    var handleHashChange = function handleHashChange() {
      handlePop(getDOMLocation(getHistoryState()));
    };

    var forceNextPop = false;

    var handlePop = function handlePop(location) {
      if (forceNextPop) {
        forceNextPop = false;
        setState();
      } else {
        var action = 'POP';

        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
          if (ok) {
            setState({ action: action, location: location });
          } else {
            revertPop(location);
          }
        });
      }
    };

    var revertPop = function revertPop(fromLocation) {
      var toLocation = history.location;

      // TODO: We could probably make this more reliable by
      // keeping a list of keys we've seen in sessionStorage.
      // Instead, we just default to 0 for keys we don't know.

      var toIndex = allKeys.indexOf(toLocation.key);

      if (toIndex === -1) toIndex = 0;

      var fromIndex = allKeys.indexOf(fromLocation.key);

      if (fromIndex === -1) fromIndex = 0;

      var delta = toIndex - fromIndex;

      if (delta) {
        forceNextPop = true;
        go(delta);
      }
    };

    var initialLocation = getDOMLocation(getHistoryState());
    var allKeys = [initialLocation.key];

    var createHref = function createHref(location) {
      return basename + (0, _PathUtils.createPath)(location);
    };

    var push = function push(path, state) {
      (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

      var action = 'PUSH';
      //  重写location对象
      var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (!ok) return;

        var href = createHref(location);
        var key = location.key,
            state = location.state;

        if (canUseHistory) {
          globalHistory.pushState({ key: key, state: state }, null, href);

          if (forceRefresh) {
            window.location.href = href;
          } else {
            var prevIndex = allKeys.indexOf(history.location.key);
            var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

            nextKeys.push(location.key);
            allKeys = nextKeys;

            setState({ action: action, location: location });
          }
        } else {
          (0, _warning2.default)(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');

          window.location.href = href;
        }
      });
    };

    var replace = function replace(path, state) {
      (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

      var action = 'REPLACE';
      var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (!ok) return;

        var href = createHref(location);
        var key = location.key,
            state = location.state;


        if (canUseHistory) {
          globalHistory.replaceState({ key: key, state: state }, null, href);

          if (forceRefresh) {
            window.location.replace(href);
          } else {
            var prevIndex = allKeys.indexOf(history.location.key);

            if (prevIndex !== -1) allKeys[prevIndex] = location.key;

            setState({ action: action, location: location });
          }
        } else {
          (0, _warning2.default)(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');

          window.location.replace(href);
        }
      });
    };

    var go = function go(n) {
      globalHistory.go(n);
    };

    var goBack = function goBack() {
      return go(-1);
    };

    var goForward = function goForward() {
      return go(1);
    };

    var listenerCount = 0;

    var checkDOMListeners = function checkDOMListeners(delta) {
      listenerCount += delta;

      if (listenerCount === 1) {
        (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

        if (needsHashChangeListener) (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
      } else if (listenerCount === 0) {
        (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

        if (needsHashChangeListener) (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
      }
    };

    var isBlocked = false;

    var block = function block() {
      var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var unblock = transitionManager.setPrompt(prompt);

      if (!isBlocked) {
        checkDOMListeners(1);
        isBlocked = true;
      }

      return function () {
        if (isBlocked) {
          isBlocked = false;
          checkDOMListeners(-1);
        }

        return unblock();
      };
    };

    var listen = function listen(listener) {
      var unlisten = transitionManager.appendListener(listener);
      checkDOMListeners(1);

      return function () {
        checkDOMListeners(-1);
        unlisten();
      };
    };

    var history = {
      length: globalHistory.length,
      action: 'POP',
      location: initialLocation,
      createHref: createHref,
      push: push,
      replace: replace,
      go: go,
      goBack: goBack,
      goForward: goForward,
      block: block,
      listen: listen
    };

    return history;
  };
</pre>
