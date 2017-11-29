---
title: 博客搭建过程笔记
date: 2017-11-28 00:12:50
categories: "HEXO"
---

### 介绍

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

### 安装
我是使用的操作系统为win10
> 搭建环境
  + [Node.js][Node]
  + [Git][Git]

> 使用 npm 安装 Hexo

>     $ npm install -g hexo-cli
>     $ npm update hexo -g #升级

### 建站
安装完HEXO后, 在命令行环境下执行下面的命令初始化博客(folder 为要初始化博客的文件夹)。

    $ hexo init <folder>
    $ cd <folder>
    $ npm install

新建完成后，指定文件夹的目录如下：

    .
    ├── _config.yml
    ├── package.json
    ├── scaffolds
    ├── source
    |   ├── _drafts
    |   └── _posts
    └── theme

    _config.yml 网站的配置文件,可以配置整个站点的大部分参数
    package.json 应用程序的信息
    scaffolds 模版文件夹,新建一篇文章时,Hexo 会根据 scaffolds来建立文件
    source 资源文件夹是存放用户资源的地方
    themes 主题文件夹,Hexo 会根据主题来生成静态页面

### 写作
新建一篇文章。如果没有设置 layout 的话，默认使用 _config.yml 中的 default_layout 参数代替。如果标题包含空格的话，请使用引号括起来。

> #### init
> 新建一个网站。如果没有设置 folder ，Hexo 默认在目前的文件夹建立网站。

>     $ hexo init [folder]#初始化博客

> #### new
> 新建一篇文章

>     $ hexo new [layout] <title>

> #### generate
> 生成静态文件

>     $ hexo generate

> #### publish
> 发表草稿

>     $ hexo publish [layout] <filename>

> #### server
> 启动服务器。默认情况下，访问网址为： http://localhost:4000/。

>     $ hexo server

> #### 安装git部署插件

>    $ npm install hexo-deployer-git --save

> #### deploy
> 部署网站

>    $ hexo deploy










[Node]: https://nodejs.org/en/download/ "node.js 官网安装包下载"
[Git]: https://git-scm.com/download/win "Git官方下载"