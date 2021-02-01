---
title: fileReader读取文件，实现图片本地预览
date: 2018-10-09 11:14:34
tags: js
---

### FileReader

FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件(或原始数据缓冲区)的内容,使用 File 或 Blob 对象指定要读取的文件或数据。

首先创建一个FileReader实例：

``` js
var reader = new FileReader();
```

#### 方法

方法 | 描述
---- | ----
abort()|中止读取操作。在返回时，readyState属性为DONE。
readAsArrayBuffer()|开始读取指定的 Blob中的内容, 一旦完成, result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象.
readAsBinaryString() |开始读取指定的Blob中的内容。一旦完成，result属性中将包含所读取文件的原始二进制数据。
readAsDataURL()|开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容
readAsText()|开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。

#### 具体事例

input file实现本地图片预览

``` js
var inputBox = document.getElementById("inputBox");
inputBox.addEventListener("change",function(){
  var reader = new FileReader();
  reader.readAsDataURL(inputBox.files[0]);//发起异步请求
  reader.onload = function(){
    // 读取完成后，base64数据保存在对象的result属性中
    console.log(this.result)
  }
})
```

#### 引用

* [FileReader详解](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)
