---
title: express 和 node 基础 - FCC笔记
date: 2019-02-27 22:39:38
tags: express, node
---

#### 基本的 Node 和 Express 操作

Node.js 是一个 JavaScript 工具，允许开发者使用 JavaScript 写后端程序。Node.js 内置了一些核心模块：

+ HTTP 充当服务器的模块

+ File System 文件系统操作的模块

+ Path 目录操作的模块

+ Assertion Testing 根据规定的约束检测代码的模块

#### Express

Express 在基于 Node.js 创建服务器和 Web 应用程序的前端页面之间运行。

开启一个 Express 服务器，可以用 express 模块来创建一个 express 实例，这个实例相当于一个服务器对象。

代码如下：

```JavaScript
const express = require('express')
const app = express()
```

这样我们就获得了一个服务器实例，然后在这个实例上调用 listen 方法，监听相应的端口就可以开启这个服务。

```JavaScript
app.listen(3000)
```

在 Express 中，通过 app.METHOD(PATH, HANDLER) 的形式来处理用户代理的 HTTP 请求。

METHOD 就是小写的 http 方法。

+ PATH 是一个在服务器上的相对路径（可以是字符串甚至是正则表达式）

+ HANDLER 是一个函数，处理当前路由的请求和响应，一般形式如下

```JavaScript
function (req, res) {
    res.send('Response String')
}

// req HTTP 请求（request）
// res  HTTP 响应（response）
```

#### 服务器响应一个文件 response.sendFIle()

可以在路由处理函数中使用 response.sendFile() 来响应一个文件，参数为服务器上文件的绝对路径。

当使用 response.sendFile() 来响应一个文件时，服务器端会根据其类型来设置适当的头信息，以表示你要发送给用户代理的文件。

一般情况下，使用 __dirname 内置变量来获取文件的绝对路径。

```JavaScript
const filepath = __dirname + '/views/index.html'
```

#### 服务器处理静态资源

express 通过中间件的方式来处理用户代理访问服务器的静态资源。

首先，在 express 中，使用 express.static(path) 来处理静态资源，参数是静态资源目录在服务器上的绝对路径。

使用中间件通过 app.use(path, midderware) 传入要处理的请求路径和对应的中间价，比如

```JavaScript
const publicResourcePath = __dirname + '/public'
app.use(express.static(publicResourcePath))  // all request
```

#### 在指定的路由上响应 JSON

当 Web 服务器响应用户的请求时，由服务器的 APT 来提供数据。

REST API 以一种简单的方式来提供数据，用户代理不需要知道服务器的细节，用户代理只需要下面的信息就可以获取数据：

+ the URL 你想要的资源位置

+ the verb 你想要执行的操作

在 express 中，通过 response.json(jsonObejct)，传入一个 JavaScript 对象就可以返回 json 数据。

当执行到这个方式的时候，会在此关闭请求-响应循环，返回数据。在 express 中，它将有效的 JavaScript 对象转换为字符串，

然后设置响应的头信息告诉用户代理返回的是一个 json 格式的数据。

#### 环境变量 process.env

在 express 中，环境变量保存在一个名为 .env 的文件中，这个文件是一个 shell 文件。

在项目中可以可以通过 process.env.VarName 来访问其中定义的环境变量

#### 根级别的中间件

在 express 中，中间件为一个函数，作为一种集中处理用户请求或者响应的方式来呈现。

中间件函数接收三个参数：请求对象、响应对象、执行下一个请求处理函数的函数

在应用程序请求-响应的周期中。这个函数执行某些代码来影响 app 实例，通常为添加某些信息到请求对象或者是响应对象。

当前符合某些条件的时候，他们也可以结束请求-响应周期发送响应对象，一般情况下，会执行下一个函数继续处理请求。

#### 基于 http 方法的链式中间件

中间件可以被指定在 http 方法上，而且还可以在一个路由中被链式的定义。

指定形式： app.METHOD(path, middlewareFunction)

```JavaScript
app.get('/user, function(req, res, next) {
    req.user = getTheUserSync()
    next()
}, function(req, res) {
    res.send(req.user)
})
```

使用这个方式将服务器操作拆分为较小的单元，使用应用程序的结构更简洁，代码的复用更高。

在这个方法中还可用于对数据执行某些验证。

#### 获取用户的 url 地址上的参数

express 允许用户通过与服务器上的 API 交互，来获取服务器上的数据。用户在使用 API 的时候，

必须要告诉服务器用户对那个数据感兴趣，也就是要指定对应数据的唯一标识。

在 express 中，可以通过下面的方式获取想要的参数，从而可以在路由处理函数中获取这些参数进行相应的逻辑处理

```JavaScript
route_path: '/user/:userId/book/:bookId'

actual_request_URL: '/user/231/book/3222'

req.params: {userId: '231', bookId: '3222'}
```

#### 获取用户的查询参数

从用户代理获取数据的另一种方式就是从查询参数中获取。

在 express 中，查询参数会自动的由框架获取并转码完成，然后自动的填充到 req.query 中，

所以我们可以直接在路由处理函数来使用由用户代理发送的查询参数

```JavaScript
route_path: '/library'

actual_request_URL: '/library?userId=332&bookId=2323'

req.query: {userId: '332', bookId: '2023'}
```

#### 使用 body-parser 来转换 post 请求的数据

post 请求是用户代理默认发送表单数据的方法。在 REST 约定中，post 方法用来发送数据到服务器，

然后服务器在数据库中创建一个当前数据的记录。使用 post 请求时，数据一般不会出现在 url 中，

它隐藏在请求主体里面，作为 html 请求的一部分，有时也称为 payload。

因为 html 是基于文本的，即使看不到数据，也不意味着数据就是不可见的。

在 express 中，需要安装 body-parser 来解析来自用户代理请求的数据。

然后在中间件中使用，请求的数据为填充到 req.body 中

```JavaScript
route: POST '/library'

urllencodeed_body: userId=456&bookId=5566

req.body: {userId: '456', bookId: '5566'}
```

按照惯例，http 动词与您要在服务器上执行的操作之间存在对应的关系，传统的对照是

+ POST (有时也是 PUT ) 请用请求发送的信息创建新资源

+ GET 读取现有资源而不修改它

+ PUT 或 PATCH (有时也是 POST ) 使用发送的数据更新资源

+ DELETE 删除资源