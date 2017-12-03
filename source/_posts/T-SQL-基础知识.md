---
title: T-SQL 基础知识
date: 2017-11-30 22:24:34
tags:
categories: 数据库
---

T-SQL 是 SQL 的扩展, 可以灵活的使用使用 SQL 来操作数据库, 可以看作是针对数据库的编程。

#### 全局变量和局部变量

    DECLARE @VariableName varType;

    简单赋值
    set @VariableName = value;

    基于查询的赋值
    select @VariableName = Query Value;

    @@VariableName;
	全局变量由系统定义，供用户使用

<!-- more -->
#### IF-ELSE语句

    IF (CONDITION)
    	BEGIN
    		STATEMENT;
    	END
    ELSE
    	BEGIN
    		STATEMENT;
    	END

#### CASE语句

    CASE Expression
    	WHEN Expression THEN result_Expression1
    	[..n]
    	[ELSE result_ExpressionN]
    END

#### WHILE语句

    WHILE BoolExpression
    	BEGIN
    		STATEMENT;
    		[CONTIUNE|BREAK]
    	END

#### 临时表

	本地临时表
		CREATE TABLE #table_name1(column_name)
			SELECT * INTO table_name1 FROM table_name2

	全局临时表
		CREATE TABLE ##table_name1(column_name)
			SELECT * INTO table_name1 FROM table_name2
