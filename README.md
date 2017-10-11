# 基于Gulp的PC端脚手架

> A Gulp.js project

## Build Setup

``` bash
At first you should install Ruby on your computer.  

Then
# install dependencies
npm install

# serve with hot reload at localhost:3000
gulp server

# build for production with minification
gulp build

```
### 一、项目热加载

编辑scss、tpl、js文件的时候页面会实时刷新，无需手动刷新

### 二、sass&compass
1. 引入reset模块，样式重置
2. 图片精灵（注意图片文件夹的导入路径）
3. 各版本浏览器前缀补全
4. 圆角、透明、边框阴影、清浮动等  

[COMPASS 简介](http://www.ruanyifeng.com/blog/2012/11/compass.html)  

[COMPASS API](http://compass-style.org/reference/compass/css3/box_shadow/)


### 三、html结构拆分
以tpl文件为单位进行html的模块化，页面级的tpl中@@引用其他模块，并自动生成完整页面

### 四、js模块化
1. js的按需引入使用的是seajs
[SEAJS](https://seajs.github.io/seajs/docs/)
2. 主入口是main.js，其他js文件都在main.js中引入，不单独在页面中引入

### 五、打包
1. 执行build命令之后会自动生成build目录,其中html中引用的css和js路径是在gulpfile.js中配置的，可自动替换
2. css与js文件会进行压缩处理
3. 没有配置图片文件的gulp自动压缩，图片需压缩处理的在[tiny png](https://tinypng.com/)上手动处理




# 目录结构说明

- gitignore为git忽略文件配置
- config.rb为compass的配置文件，非常重要，在gulp的compass任务中要指向该配置文件，不然compass的图片精灵会有路径问题
- gulpfile.js为gulp的所有任务
- package.json为npm安装包
- app为项目主体，其中build是打包之后的文件，css是样式表文件，js是js文件，html是模板和html文件，images是图片资源

```
│  .gitignore
│  config.rb
│  gulpfile.js
│  package.json
│  README.md
│
└─app
    ├─build
    │  ├─css
    │  │  │  index.css
    │  │  │  index.min.css
    │  │  │
    │  │  └─i
    │  │          banner_1.png
    │  │          banner_3.png
    │  │          bgs-s386dc1fc71.
    │  │
    │  ├─html
    │  │      index.html
    │  │
    │  └─images
    │          banner_1.png
    │          banner_2.png
    │          banner_3.png
    │
    ├─css
    │  │  index.css
    │  │  index.scss
    │  │  test.css
    │  │  test.scss
    │  │
    │  └─i
    │      │  banner_1.png
    │      │  banner_2.png
    │      │  banner_3.png
    │      │  bgs-s386dc1fc71.png
    │      │
    │      └─bgs
    │              banner_2.png
    │              banner_3.png
    │              banner_4.png
    │              banner_5.png
    │
    ├─html
    │  │  index.html
    │  │
    │  └─template
    │      │  index.tpl
    │      │
    │      └─module
    │          ├─footer
    │          │      footer.tpl
    │          │
    │          └─header
    │                  header.tpl
    │
    ├─images
    │      banner_1.png
    │      banner_2.png
    │      banner_3.png
    │
    └─js
            jquery-3.2.1.min.js
            main.js
```

