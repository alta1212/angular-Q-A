create database QandA
go
USE QandA
GO

create table Infouser(--BẢNG NGƯỜI DÙNG
    USER_ID INT IDENTITY(1,1) PRIMARY KEY,
    USER_NAME nvarchar(60),
    slug nvarchar(50),
    UniqueKey nvarchar(50),
    Tfa nvarchar(2),
    USER_PASSWORD NVARCHAR(60),
    USER_LOCATION NVARCHAR(60),
    USER_EMAIL NVARCHAR(60),
    USER_IMAGE NVARCHAR(60),
    USER_DESCRIPTION NVARCHAR(1000),
    WEBSITE NVARCHAR(100),
    FACEBOOK NVARCHAR(100),
    TWITTER  NVARCHAR(100),
    INSTAGRAM NVARCHAR(100),
    YOUTUBE NVARCHAR(100),
    GITHUB NVARCHAR(100),
    GET_NOTICATION_EMAIL nvarchar(2),
    RECOVERYtfacode nvarchar(100),
)
go
create table COMPANY(--BẢNG NGƯỜI DÙNG
    COMPANY_ID INT IDENTITY(1,1) PRIMARY KEY,
    USER_NAME nvarchar(60),
    USER_PASSWORD NVARCHAR(60),
    USER_LOCATION NVARCHAR(60),
    USER_EMAIL NVARCHAR(60),
    USER_IMAGE NVARCHAR(60),
    USER_DESCRIPTION NVARCHAR(1000),
    WEBSITE NVARCHAR(100),
    FACEBOOK NVARCHAR(100),
    TWITTER  NVARCHAR(100),
    INSTAGRAM NVARCHAR(100),
    YOUTUBE NVARCHAR(100),
    GITHUB NVARCHAR(100),
    GET_NOTICATION_EMAIL INT
)
go
CREATE TABLE QUESTION(--CÂU HỎI
    QUESTION_ID INT IDENTITY(1,1) PRIMARY KEY,
    QUESTION_TITLE NVARCHAR(500),
    QUESTION_TAG NVARCHAR(100),
    QUESTION_CATEGORY INT,
    QUESTION_DETAIL NVARCHAR(1000),
    QUESTION_IMAGE NVARCHAR(100),
    SLUGS NVARCHAR(500),
    getNotication nvarchar(10),
    type nvarchar(10),
    author int,
    time NVARCHAR(50),
    author_name NVARCHAR(50),
    author_image NVARCHAR(50)
)
GO

CREATE TABLE VOTE(-----UP VÀ DOWN VOTE CHO REPLY QUESTION
    QUESTION_ID INT,---NẾU VOTE CHO CÂU HỎI
    QUESTION_REPLY_ID INT,--NẾU VOTE CHO CAU TRẢ LỜI
    USER_ID INT,--USER VOTE
    VOTE INT
)
GO

CREATE TABLE QUESTION_REPLY(---TRẢ LỜI CÂU HỎI
    answer_REPLY_ID INT IDENTITY(1,1) PRIMARY KEY,
    answer_QUESTION_ID INT,
    PIN INT,---NẾU GHIM CÂU TRẢ LỜI(CHỈ CHỦ CÂU HỎI MỚI CÓ THỂ GHIM)
    answer_DETAIL NVARCHAR(1000),
    answer_IMAGE NVARCHAR(100),
    answer_author int,
    answer_time NVARCHAR(50),
    answer_author_name NVARCHAR(50),
    answer_author_image NVARCHAR(50)
)
GO
CREATE   TABLE COMMENT_REPLY(--COMMENT CÂU TRẢ LỜI
    COMMENT_REPLY_ID INT IDENTITY(1,1) PRIMARY KEY,
    answer_REPLY_ID INT,--NẾU BÌNH LUẬN CÂU HỎI
    QUESTION_ID INT,--NẾU BÌNH LUẬN CÂU TRL
    COMMENT_DETAIL NVARCHAR(1000),
    COMMENT_author int,
    COMMENT_time NVARCHAR(50),
    COMMENT_author_name NVARCHAR(50),
    COMMENT_author_image NVARCHAR(50)
)
GO
CREATE TABLE NOTICATION(
    NOTICATION_ID INT IDENTITY(1,1) PRIMARY KEY,
    NOTICATION_STATUS INT,
    NOTICATION_TIME NVARCHAR(40),
    NOTICATION_DETAIL NVARCHAR(100),
    USER_ID INT,--USER
)
GO
CREATE TABLE CATEGORY(
    CATEGORY_ID INT IDENTITY(1,1) PRIMARY KEY,
    CATEGORY_NAME NVARCHAR(40),
    CATEGORY_IMAGE NVARCHAR(40),
    CATEGORY_COUNT_POST INT,
    SLUGS NVARCHAR(500)
)

go
create proc userSignup 
(@username nvarchar(100),@usermail nvarchar(100),@userpassword nvarchar(100),@slug nvarchar(100))
as
insert into Infouser(USER_NAME,USER_EMAIL,USER_PASSWORD,slug,Tfa) values(@username,@usermail,@userpassword,@slug,0)
GO


create proc userLogin 
(@usermail nvarchar(100),@userpassword nvarchar(100))
as
select * from Infouser where USER_EMAIL=@usermail and USER_PASSWORD=@userpassword
go

create proc getCategory 
as
select * from category

go

create  proc [dbo].[newQuestion]
(@title nvarchar(50),
@tag nvarchar(100),@category nvarchar(50)
,@detail nvarchar(1000),@slug nvarchar(100),
@getNOtication nvarchar(2),@type nvarchar(2),
@author  nvarchar(100),@author_name  nvarchar(100),
@author_image  nvarchar(100)
)
as
insert  into QUESTION (QUESTION_TITLE,
QUESTION_TAG,
QUESTION_CATEGORY,
QUESTION_DETAIL,
SLUGS,
type,
getNotication,
author,
author_image,author_name,
time
) values (@title,@tag,@category,@detail,@slug,@type,@getNOtication,@author,@author_image,@author_name, GETDATE())
go




create proc QuestionDetail
(@slug nvarchar(200))
as
select * from QUESTION where SLUGS =@slug
go

go
CREATE proc ENABLE2fa(@id nvarchar(10)) AS
update Infouser set Tfa=1 
where USER_ID=@id

go

    go
    CREATE proc disable2fa(@id nvarchar(10)) AS
    update Infouser set Tfa=0 
    where USER_ID=@id

    go




SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[getReply]
(@id int)
as
select * from QUESTION_REPLY where answer_QUESTION_ID=@id
GO





create proc answer(@answer_QUESTION_ID nvarchar(10),
@detail nvarchar (MAX),@author_name nvarchar(50),
@author_image NVARCHAR(400) null,
@author NVARCHAR(4)
)
AS
INSERT into QUESTION_REPLY (
answer_QUESTION_ID,
answer_DETAIL,
answer_author,
answer_author_name,
answer_author_image,
answer_time) VALUES(
    @answer_QUESTION_ID,
    @detail,
    @author_image,
    @author,
    @author_name,
   convert(varchar, getdate(), 20)
    )


go

create proc getComment(@id int)

as SELECT * from COMMENT_REPLY where QUESTION_ID=@id
go
---temp------------------------------------

create proc GetAllQuestion
as
select q.QUESTION_ID,q.QUESTION_TITLE,q.QUESTION_TAG,q.author_name,q.SLUGS,q.[time],
sum( case when v.vote  is null then 0
 else v.vote end) as vote,
count(  r.answer_REPLY_ID ) as answer
from QUESTION q left JOIN VOTE v 
on v.QUESTION_ID=q.QUESTION_ID LEFT join QUESTION_REPLY r on r.answer_QUESTION_ID=q.QUESTION_ID
group by  q.QUESTION_TITLE,q.QUESTION_TAG,
q.author_name,q.SLUGS,q.[time]
,q.QUESTION_ID
GO
