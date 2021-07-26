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
    getNotication int,
    type nvarchar(10)
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
    QUESTION_REPLY_ID INT IDENTITY(1,1) PRIMARY KEY,
    QUESTION_ID INT,
    PIN INT,---NẾU GHIM CÂU TRẢ LỜI(CHỈ CHỦ CÂU HỎI MỚI CÓ THỂ GHIM)
    QUESTION_DETAIL NVARCHAR(1000),
    QUESTION_IMAGE NVARCHAR(100)
)
GO
CREATE TABLE COMMENT_REPLY(--COMMENT CÂU TRẢ LỜI
    COMMENT_REPLY_ID INT IDENTITY(1,1) PRIMARY KEY,
    QUESTION_REPLY_ID INT,--NẾU BÌNH LUẬN CÂU HỎI
    QUESTION_ID INT,--NẾU BÌNH LUẬN CÂU TRL
    COMMENT_DETAIL NVARCHAR(1000)
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


create proc userSignup 
(@username nvarchar(100),@usermail nvarchar(100),@userpassword nvarchar(100),@slug nvarchar(100))
as
insert into Infouser(USER_NAME,USER_EMAIL,USER_PASSWORD,slug,Tfa) values(@username,@usermail,@userpassword,@slug,0)
GO


create proc userLogin 
(@usermail nvarchar(100),@userpassword nvarchar(100))
as
select * from Infouser where USER_EMAIL=@usermail and USER_PASSWORD=@userpassword


create proc getCategory 
as
select * from category

create proc askNew
(@title nvarchar(100),@tag nvarchar(100),@detail nvarchar(1000),@category nvarchar(10),@slug nvarchar(150),@getnotication nvarchar(10))
as
insert into QUESTION (QUESTION_TITLE,QUESTION_TAG,QUESTION_CATEGORY,QUESTION_DETAIL,SLUGS,getNotication)
values (@title,@tag,@category,@detail,@slug,@getnotication)