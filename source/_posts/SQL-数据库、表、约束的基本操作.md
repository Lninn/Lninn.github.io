---
title: SQL 数据库、表、约束的基本操作
date: 2017-11-30 22:08:36
tags:
categories: 数据库
---

### 创建和删除数据库

- 创建

        CREATE DATABASE dbName
        ON(
            NAME = "filename.mdf",
            FILENAME = "path\filename.mdf",
            SIZE = SizeMB,
            FILEGROWTH = 10%
        )
        LOG ON(
            NAME = "filename_log.ldf",
            FILENAME = "path\filename_log.ldf",
            SIZE = SizeMB,
            FILEGROWTH = 10%
        )

<!-- more -->
- 删除

        IF EXISTS(SELECT 1 FROM SYS.DATABASES WHERE NAME = DbName)
            BEGIN
                DROP DATABASE DbName
            END

### 表的 CRUD

   - 创建

         CREATE TABLE table_name
         ( <column_defintion> )

   - 删除

         DROP TABLE table-name

   - 修改

         ALTER TABLE table_name
         {
            -- 修改字段
            ALTER COLUMN column_name  
                {   
                    type_name [ ( precision [ , scale ] ) ]   
                    [ COLLATE Windows_collation_name ]   
                    [ NULL | NOT NULL ]  
                }

            -- 添加字段
            | ADD { <column_defintion> | <column_constraint> FOR <column_name>} [ ,...n ]  

            -- 删除字段
            | DROP { column column_name | [constraint] constraint_name } [ ,...n ]    
         }

### 数据的 CRUD

   - 插入数据

         INSERT INTO [table_name] [ ( column_name [ ,...n ] ) ]  
         {   
          VALUES ( { NULL | expression } )  
          | SELECT <select_criteria>  
         }

   - 删处数据

         DELETE FROM table_name
         [ WHERE <search_condition> ]   
         [ OPTION ( <query_options> [ ,...n ]  ) ]

   - 修改数据

         UPDATE table_name
         SET FILED = VALUE
         [ WHERE <search_condition> ]

   - 查询数据

        SELECT语句完整语法：

         SELECT  [ ( column_name [ ,...n ] ) ]
            FROM table_name
            [WHERE row_expression]
            [GROUP BY  column_name]
               [HAVING  expression]
            [ORDER BY column_name[ASC | DESC]]

    + WHERE CLAUSE

            规定选择的标准, 根据条件将选择数据源中的数据

            Syntax:
                SELECT column_name FROM table_name   
                WHERE column_name operator value

    + GROUPBY CLAUSE

            用于根据一个列或多个列对查询的结果集进行分组, 常结合聚合函数出现在SELECT子句中的列名必须在  
            GROUP BY中或聚合函数中

            Syntax:
                SELECT column_name, aggregate_function(column_name)
                    FROM table_name
                    WHERE column_name operator value
                    GROUP BY column_name

    + HAVING CLAUSE

            作用和WHERE子句类似, 但是HAVING子句可以包含聚合函数, 也就是对分组后的数据在进行筛选。  
            HAVING子句可以引用选择列表中现实的任意项

            Syntax:
                SELECT column_name, aggregate_function(column_name)
                    FROM table_name
                    WHERE column_name operator value
                    GROUP BY column_name
                    HAVING aggregate_function(column_name) operator value

    + ORDER BY CLAUSE

             根据指定的列名对查询的结果集进行排序，默认按照升序，可以通过DESC关键字进行降序排序



### 约束

   - 主键

            ALTER TABLE table-name
                ADD CONSTRAINT PK_table_name-column_name PRIMARY KEY (column_name)[column_name1, column_name2]

   - 外键

            ALTER TABLE table-name
            	ADD CONSTRAINT FK_table_name_column_name FOREIGN_ KEY (column_name)
            	REFERENCES table-name (column_name)

   - 默认值

            ALTER TABLE table-name
            	ADD CONSTRAINT DF_table_name_column_name DEFAULT(VALUE) FOR column_name

   - 检查

            ALTER TABLE table-name
            	ADD CONSTRAINT CK_table_name_column_name CHECK(Expression)

   - 唯一约束

            ALTER TABLE table-name
            	ADD CONSTRAINT UN_table_name_column_name UNIQUE(column_name1, column_name2)

   - 约束

            ALTER TABLE table-name
            	DROP CONSTRAINT constraint_name
### 常用函数

|  函数      |  说明 |
| :--:       | :-- |
| ABS()      | 求一个数的绝对值|
| SQRT()     | 平方根 |
| RAND()     | 返回0-1之间的随机值 |
| FLOOR()    | 向下取整 |
| CEILING()  | 向下取整 |
| ROUND()    | 取一个数的四舍五入值 |
| SIGN()     | 返回当前数值的符号 |
| POWER(x, y)| 返回x的y次方 |
| ASCII()    | 获取字符串中最左端字符的ASCII码值 |
| CHAR()     | 将ASCII码值转换为字符 |
| LOWER()    | 转换为小写字母 |
| UPPER()    | 转换为大写字母 |
| LTRIM()    | 去掉字符串左空格 |
| RTRIM()    | 去掉字符串右空格 |
| SPACE()    | 返回指定个数的空格 |
| REPLICATE()| 将指定的字符串指定重复的次数 |
| LEFT()     | 返回已知字符串从左边开始指定个数的字符 |
| RIGHT()    | 返回已知字符串从右边开始指定个数的字符 |
| DATALENGTH()| 返回字符串的长度(包括末尾的空格) |
| SUBSTRING()| 返回从字符串左边’开始位置’起数量为’长度’的字符串。其中表达式可以是字符串或二进制串或含字段名或字符型变量的表达式。在这里要注意一下SUBSTRING（）函数不能用于TEXT 和IMAGE 数据类型 |
| LEN()     | 返回表达式的长度。注意它返回的是字符数，而不是字节数。不计算串尾空格 |
| STUFF()     | 删除字符串中指定长度的字符串 |
| REVERSE()     | 将指定的字符串的字符排列顺序颠倒 |
| CHARINDEX()     | 返回串1在串2的开始位置，可从所给出的‘开始位置’进行查找 |


### 聚合函数

   - AVG 返回平均值

         AVG ( [ ALL | DISTINCT ] EXPRESSION )

	     ALL是默认值, 默认对所有的值进行计算

	     DISTINCT指定 AVG 只在每个值的唯一实例上执行, 而不管该值出现了多少次

   - COUNT 返回组中的项数

         COUNT ( { [ [ ALL | DISTINCT ] EXPRESSION ] | * } )

	     ALL 是默认值, 默认对所有的值进行计算

	     DISTINCT 指定 COUNT 返回唯一非空值的数量

	     COUNT(*)，计算表中行的总数, 即使表中行的数据为NULL, 也被计入在内

   - MAX 返回表达式的最大值

	     MAX ( [ ALL | DISTINCT ] EXPRESSION)

   - MIN 返回表达式的最小值

         MIN ( [ ALL | DISTINCT ] EXPRESSION)

   - SUM 求和       

         SUM ( [ ALL | DISTINCT ] EXPRESSION)

         返回表达式中所有值的和或仅非重复值的和

         SUM 只能用于数字列, 空值将为忽略

   - DATEPART 日期函数

		 DATEPART ( Datepart, Date )

         返回代表指定日期的指定日期部分的整数

   - CONVERT

		 CONVERT (Data_Type[(Length)], EXPRESSION [, Style])

		 将某种数据类型的表达式显式转换为另一种数据类型

### 多表查询

    内连接 INNER JOIN
    左连接 LEFT JOIN
    右连接 RIGHT JOIN
    完全连接 OUTER JOIN
