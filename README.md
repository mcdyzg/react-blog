# react-blog #

a blog system based on react,express and mongoDB

## introduction ##

- 前端使用react，react-router，react-redux，代码遵循ES6规范，使用babel编译；后端基于express搭建简单的REST api；数据库采用mongoDB，并使用mongoose增删改查。

- UI使用material-ui！

- 添加文章时使用markdown语法！


## how to start ##

** *：mongoDB must open first **

**注：mongo数据库必须先打开**

```
npm install 

npm server

npm start

```
open http://localhost:3001

admin：http://localhost:3001/admin

## how to build ##

```
npm run build

npm server
```

open http://localhost:3004

admin：http://localhost:3004/admin

## 结构 ##

`src/app`：存放前端代码

`src/www`：存放图片，css，和html文件

`be/index.js`：后端代码（第一版比较简单，仅实现增加文章，增加分类，查询分类文章，查询所有文章，删除所有文章，未实现删除某篇文章，管理员没有添加验证登录，直接/admin进入后台）

`be/views`：存放index.html（不小心成了单页应用）

`be/static`：存放build后的前台代码、图片等，每次npm run build会删除原有文件，存放新生成的资源文件。
