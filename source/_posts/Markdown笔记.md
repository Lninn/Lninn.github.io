---
title: Markdown笔记
date: 2017-11-11 12:24:38
tags:
categories: 开发工具
---

### 介绍

    Markdown 语法是一种非常简单的标记语言，上手容易，语法通俗易懂。主要用户为写文档的码农、博客写手、  
    <br />网站小编、出版业人士等等。使用简单的命令就可以完成负责内容的排版。

### 标题

    Setext 形式
      ===  最高阶
      --- 第二阶
    atx 形式
      用1到6个#符号分别表示1阶到6阶6种格式的标题

### 段落
    一个 Markdown 段落是由一个或多个连续的文本行组成，它的前后要有一个以上的空行。

    区块引用 '>'
    Markdown 标记区块引用是使用类似 email 中用 > 的引用方式。

    区块引用 blockquote
    <blockquote> 引用区块 </blockquote

    代码块
    使用 `` 把代码包裹起来，使用 table键缩进即可。

### 强调

    倾斜 *放置要倾斜的文本* _放置要倾斜的文本_

    加粗 **放置要加粗的文本** __放置要加粗的文本__

### 列表

    无序列表使用星号、加号或是减号作为列表标记
    * 第一项
    * 第二项
    * 第三项

    - 第一项
    - 第二项
    - 第三项

    + 第一项
    + 第二项
    + 第三项

    有序列表则使用数字接着一个英文句点
    1. 第一项
    2. 第二项
    3. 第三项

### 表格

     ### 某某记录表
    | 记录标题1 | 记录标题2 | 记录标题3 |
    | -------- |:---------:|---------:|
    | HTML | 10.10 | OK |
    | CSS | 10.10 | OK |
    | JavaScript | 10.10 | OK |


### 链接
    Markdown 支持两种格式的链接
    行内样式
    this is an [example link](https://www.google.com)
    参考样式
    this is an [example link][1]

    [1]: (https://www.google.com) 'title'

    图片链接和超链接类似
    行内样式
    ![Alt text](/path/to/img.jpg)
    参考样式
    ![Alt text][id]
    [id]: url/to/image  "Optional title attribute"
    img 标签(可以控制宽高)

### 分割线
     在新的一行连续输入三个星号(***)
     在新的一行连续输入三个减号(---)

### 参考

- 简明版 [Markdown 语法说明(简体中文版)][2]

- 完整版 [Markdown 语法说明(简体中文版)][3]


[1]: https://daringfireball.net/projects/markdown/dingus "markdown在线转换"
[2]: http://wowubuntu.com/markdown/basic.html "快速入门"
[3]: http://wowubuntu.com/markdown/index.html "Markdown 语法说明 (简体中文版)"
