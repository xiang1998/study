
## 介绍

1.utils目录
- public.js 常用方法封装
- http.js ajax请求封装

2.App.scss
- 公用css样式

## request示例

-url: 接口地址
-data: 接口参数
-header: Content-Type,用于定义网络文件的类型和网页的编码
this.$http(url,data,header)
.then(res=>{})
.catch(err=>{})

## 最后

- 有用到的js方法可以添加到public.js文件内
