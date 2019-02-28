---
layout: 使用
title: 使用 NPM 来管理包 - FCC笔记
date: 2019-02-27 22:19:41
tags: npm
---

#### 关于 npm

Node Package Manager（简写 npm）是使用 Node.js 一个命令行工具，用来分享和管理使用 JavaScript 开发的代码包。

当使用 npm 来创建一个项目时，会自动生成一个 package.json 文件，你的项目中所有依赖的包都会在这个文件列表中。

由于 npm 上的包经常更新，所以这个文件允许为每个依赖指定对应的版本号，这样可以确保包的更新不会影响项目本身。

npm 将所有的包都保存到一个名为 nodemodules 的文件夹。可以通过以下两种方式来安装这个包:

+ 全局的安装在 node modules 的根目录，所有的项目都可以访问

+ 局部的安装在每个项目当前的 node_modules 文件夹中，只允许当前项目来访问这些包

#### 使用 package.json

任何使用 Node.js 或者是 npm 构建的项目都需要使用 package.json 来管理项目中的包。

在 package.json 中，所有的信息都通过 JSON 的形式来表示，整个文件用一个 JSON 对象来表示。

在这个对象里面通过各种不同的格式来表示项目本身的信息和项目依赖的包的信息。

+ author 表示当前项目的作者

+ description 关于项目的描述

+ keywords 与项目有关的关键字，使用一个数组来表示

+ license 项目当前使用协议，比如开原协议 MIT BSD

+ version 项目的版本号

- 扩展项目的包

- dependencies 项目中所有依赖的包都将存储到这个字段中，以键值对的形式。需要指定每个包的名字以及对应的版本号

#### 理解 npm 中 dependencies 中的版本号 version

每一个框架、库或者是其他工具发布、更新、修复的时候都会有一个对应的版本号，我们可以从这个版本号的改变发现每个版本对应的区别。

一般的为 MAJOR.MINOR.PATCH:

+ MAJOR 添加新功能，比如进行不兼容的 API 更改

+ MINOR 对早期版本进行了无效的修改，以向后的方式添加更改

+ PATCH 错误修复 以向后兼容的方式进行错误修复

#### 使 dependencies 的包依赖最新的补丁

当使用 MAJOR.MINOR.PATCH 的方式指定一个包的时候，固定了每一个包的版本，当有的包有很重要的补丁更新的时候，通过这种方式无法更新最新的补丁。

通过在 ~MAJOR.MINOR.PATCH 的方式就可以解决这个问题，这样相当于 MAJOR.MINOR.X 使 dependencies 的包依赖最新的升级和补丁。

当在 dependencies 中使用 ~MAJOR.MINOR.PATCH 解决了可以使用任何 PATCH 版本的问题，但是当遇到有重要的 MINOR 更新时却无法使用，

这时候可以通过下面的方式来解决 ^MAJOR.MINOR.PATCH 相当于 ^MAJOR-X-X

#### 安装

安装到全局 npm i -g <pacakgename>，安装到当前项目，npm i --save-dev <pacakgename>

#### 删除

移除包，直接从 package.json 里面删除对应的 key value 就可以了。