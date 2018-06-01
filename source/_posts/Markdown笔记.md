---
title: Markdown笔记
date: 2018-05-22 18:35:54
tags: Markdown
---

### 介绍

Markdown 语法是一种非常简单的标记语言，上手容易，语法通俗易懂。主要用户为写文档的码农、博客写手、网站小编、出版业人士等等。使用简单的命令就可以完成负责内容的排版。

### 标题

Setext 形式

+ ===  最高阶
+ --- 第二阶

atx 形式

+ 用1到6个#符号分别表示1阶到6阶6种格式的标题

<!-- more -->

### 段落

一个 Markdown 段落是由一个或多个连续的文本行组成，它的前后要有一个以上的空行。

+ 区块引用 '>'

    Markdown 标记区块引用是使用类似 email 中用 > 的引用方式。

+ 区块引用 blockquote

    ```
    <blockquote> 引用区块 </blockquote>
    ```


+ 代码块

    使用三个 ` 符号把代码包裹起来，使用 table 键缩进即可。

### 强调

+ 倾斜

    ```
    *放置要倾斜的文本* _放置要倾斜的文本_
    ```

+ 加粗

    ```
    **放置要加粗的文本** __放置要加粗的文本__
    ```

### 列表

+ 无序列表使用星号、加号或是减号作为列表标记

    ```
    * 第一项
    * 第二项
    * 第三项

    - 第一项
    - 第二项
    - 第三项

    + 第一项
    + 第二项
    + 第三项
    ```

+ 有序列表则使用数字接着一个英文句点

    ```
    1. 第一项
    2. 第二项
    3. 第三项
    ```


### 表格

   + 简单方式

    ```
    Name | Academy | score
    - | :-: | -:
    Harry Potter | Gryffindor| 90
    Hermione Granger | Gryffindor | 100
    Draco Malfoy | Slytherin | 90
    ```

   + 原生方式

    ```
    | Name | Academy | score |
    | - | :-: | -: |
    | Harry Potter | Gryffindor| 90 |
    | Hermione Granger | Gryffindor | 100 |
    | Draco Malfoy | Slytherin | 90 |
    ```


   + HTML 标签

    ```
    <table>
        <tr>
            <th width=10%, bgcolor=yellow >Name</th>
            <th width=40%, bgcolor=yellow>Academy</th>
            <th width="50%", bgcolor=yellow>score</th>
        </tr>
        <tr>
            <td bgcolor=#eeeeee> Harry Potter </td>
            <td> Gryffindor </td>
            <td> 90 </td>
        </tr>
        <tr>
            <td bgcolor=#00FF00> Hermione Granger </td>
            <td> Gryffindor </td>
            <td> 100 </td>
        <tr>
            <td bgcolor=rgb(0,10,0)> Draco Malfoy </td>
            <td> Slytherin </td>
            <td> 90 </td>
        </tr>
    </table>
    ```


   + 语法说明：

    1. 第一行为表头，指定每一列的标题。第二行指定不同列单元格内容的对齐方式。第三行主体部分。

    2. 列与列之间用管道符号 “|” 隔开，原生方式的表格每一行的两边也要有管道符。

    3. 表格的对齐方式默认为左对齐，在 “-” 右边加上 “:” 为右对齐，在 “-” 两侧同时加上 “:” 为居中对齐。

### 链接

**Markdown 支持两种格式的链接**

+ 行内样式

    ```
    this is an [example link](https://www.google.com)
    ```

+ 参考样式

    ```
    this is an [example link][1]

    [1]: (https://www.google.com) 'title'
    ```

**图片链接**

+ 行内样式

    ```
    ![Alt text](/path/to/img.jpg)
    ```

+ 参考样式

    ```
    ![Alt text][id]

    -[id]: url//to//image  "Optional title attribute"
    ```

**note**: img 标签(可以控制宽高)

### 其他

+ 分割线

    ```
    在新的一行连续输入三个星号(***)

    在新的一行连续输入三个减号(---)
    ```

+ 空行

    ```
    显示看起来像空行
    ```

+ 竖线

    ```
    竖线用 &#124; 或者 &#x7C;
    ```

### 参考

- 简明版 [Markdown 语法说明(简体中文版)][2]

- 完整版 [Markdown 语法说明(简体中文版)][3]

- [在线转换][1]


[1]: https://daringfireball.net/projects/markdown/dingus "markdown在线转换"
[2]: http://wowubuntu.com/markdown/basic.html "快速入门"
[3]: http://wowubuntu.com/markdown/index.html "Markdown 语法说明 (简体中文版)"
