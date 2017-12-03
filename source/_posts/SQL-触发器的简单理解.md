---
title: SQL 触发器的简单理解
date: 2017-12-03 13:30:39
tags:
categories: 数据库
---

#### 对触发器的理解

   - 概述：在数据库中，在执行对数据有异动的动作时，先行拦截并处理的特定程序。不由用户直接调用。创建触发器时会对其进行定义，以便在对特定表或列作特定类型的数据修改时执行。

   - 分类

	DML 触发器为当用户通过数据操作语言 DML 去修改数据时自动执行的触发器程序。可以看作是一种特殊类型的存储过程。DML 事件包括 INSERT、UPDATE 和 DELETE 语句。

	DDL 触发器为响应各种数据定义语言 DDL 事件。DDL 事件包括 CREATE、ALTER 和 DROP。

<!-- more -->

#### DML 触发器

   - DML 触发器可以分为一下三种类型

	BEFORE

	> 定义的触发器将在操作数据之前触发并自动运行。

    AFTER

    > 在执行 INSERT、UPDATE、MERGE 或 DELETE 语句的操作之后执行 AFTER 触发器。 如果违反了约束，则永远不会执行 AFTER 触发器

    INSTEAD OF

   > 在操作执行之前指定执行特定的触发器而不是 SQL 语句。即替换（覆盖）定义在相应数据操作上的触发器。DDL 和登陆程序不能指定 INSTEAD OF。

   > 可以在视图或者表上定义每个INSERT UPDATE DELETE语句各一个 INSTEAD OF 触发器。

#### DDL 触发器

   - DDL 触发器为对数据库架构需要更改或者防止恶意更改的程序。对数据库架构的更改和事件大多都可捕捉，视数据库管理系统而定。DDL 触发器不会创建特殊的 INSERTED 和 DELETED 表。

#### 触发器有什么作用

   - 可在数据写入数据表前，强制检验或转换数据。

   - 触发器发生错误时，异动的结果会被撤销而不影响原先的数据。

   - 部分数据库管理系统可以针对数据定义语言（DDL）使用触发器，称为 DDL 触发器。

   - DML 触发器类似于约束，因为可以强制实体完整性或域完整性

   - 语法

		 DELIMITER |
		 CREATE TRIGGER `<databaseName>`.`<triggerName>`
		 < [ BEFORE | AFTER ] > < [ INSERT | UPDATE | DELETE ] >
		 ON [dbo]<tableName> //dbo(所有者)
		 FOR EACH ROW
		 BEGIN
		 ...

		 END |

#### 使用触发器

   - 触发器新增操作

			-- 只允许录入18岁以上的学生
            CREATE TRIGGER TRIGGER_STUDENT_INSERT
					ON Student
					FOR INSERT
			AS
					DECLARE @age INT
					SELECT @age = Student.Sage FROM Student
								INNER JOIN inserted ON Student.Sno = inserted.Sno
					PRINT @age
					if (@age < 18)
						BEGIN
							RAISERROR ('学生年龄必须大于18', 16, 8)
							ROLLBACK TRAN
						END

			INSERT INTO Student VALUES(1335232, '王二', '男', 30, '信息技术系')
			INSERT INTO Student VALUES(1321132, '李四', '男', 17, '信息技术系')

   - 触发器更新操作

	当在定义有触发器的表上执行 UPDATE 时,原始行被移入到 DELETE 表
	更新后被移入 INSERTED 表。触发器检查 DELETED 表和 INSERTED 表以及被更新的表,来确定是否更新了多行以及如何执行触发器动作。

			-- 更新学生表学生id的同时,分数表中相应学生的ID也同步更新
			CREATE TRIGGER TRIGGER_STUDENT_UPDATE
					ON Student
					FOR UPDATE
			AS
					IF UPDATE(Sno)
					UPDATE Score SET Score.Sno = inserted.Sno
					FROM Score, deleted, inserted
					WHERE Score.Sno = deleted.Sno

			UPDATE Student SET Sno = 222222 WHERE Sno = 9512102

			SELECT * FROM Score
			SELECT * FROM Student

   - 触发器删除操作

	当触发 DELETE 触发器后,从影响的表中删除的行将被置到一个特殊的  DELETED 表, DELETED 是一个逻辑表,他保留已被删除数据行的一个副本

			-- 删除课程时, 同时删除该课程的选课信息
			CREATE TRIGGER TRIGER_Courses_Delete
					ON Course
					FOR DELETE
			AS
					DELETE Score
					FROM Score, deleted WHERE Score.Cno = deleted.Cno
			GO

			DELETE FROM Course WHERE Cno = 'C01'


   - INSTEAD OF 触发器

			-- 删除课程时, 同时删除该课程的选课信息
			CREATE TRIGGER TRIGER_Courses_Instead_Delete
			ON Course
			INSTEAD OF DELETE
			AS
				DECLARE @courseId VARCHAR(16)
				SELECT @courseId = Cno FROM deleted
				DELETE FROM Score WHERE Cno = @courseId
				DELETE FROM Course WHERE Cno = @courseId
			GO

			DELETE FROM Course WHERE Cno = 'C01'

参考资料：

1. [CREATE TRIGGER (Transact-SQL)][1]
2. [触发器(数据库)][2]·维基百科
3. [触发器][3]


[1]: https://docs.microsoft.com/zh-tw/sql/t-sql/statements/create-trigger-transact-sql#
[2]: https://zh.wikipedia.org/wiki/%E8%A7%A6%E5%8F%91%E5%99%A8_(%E6%95%B0%E6%8D%AE%E5%BA%93)#cite_note-1
[3]: https://docs.microsoft.com/zh-cn/sql/relational-databases/triggers/logon-triggers "微软官方文档"
