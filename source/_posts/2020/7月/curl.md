---
title: curl
date: 2020-07-08 09:00:00
tags: http基础
---

curl 是一个命令行工具，用来请求 web 服务器。它的名字就是客户端（client）的 URL 工具的意思。

不带有任何参数时，curl 就是发出 get 请求。

``` shell
curl www.baidu.com
```

上面的命令向 www.baidu.com 发出 get 请求，服务器返回的内容会在命令行输出。

##### -b

-b 参数用来向服务器发送 cookie

``` shell
curl -b 'foo=bar' www.baidu.com
```

##### -c

-c 参数将服务器设置的 cookie 写入一个文件

``` shell
curl -c cookies.txt www.baidu.com
```

##### -d

-d 参数用来发送 post 请求

``` shell
curl -d 'login=emma&password=123' -X POST www.baidu.com
# 或者
curl -d 'login=emma' -d 'password=123' -X POST www.baidu.com
```

使用 -d 参数以后， HTTP 请求会自动加上表头 Content-Type: application/x-www-form-urlencoded。并且
会自动将请求转为 POST 方法，因此可以省略 -X POST。

-d 参数也可以读取本地文本文件的数据，向服务器发送。

``` shell
curl -d '@data.txt' www.baidu.com
```

##### -v

-v 参数输出通信的整个过程，用于调试。

``` shell
curl -v www.baidu.com
```

-- trace 参数也可以用于调试，还会输出原始的二进制数据。

``` shell
curl --trace - www.baidu.com
```
