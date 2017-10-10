基于Gulp的PC端脚手架

核心功能

1、项目热加载

2、sass&compass

3、html结构拆分

4、js模块化

5、打包


项目目录结构
1、gitignore为git忽略文件配置
2、config.rb为compass的配置文件，非常重要，在gulp的compass任务中要
指向该配置文件，不然compass的图片精灵会有路径问题
3、gulpfile.js为gulp的所有任务
4、package.json为npm安装包
5、app为项目主体，其中build是打包之后的文件，css是样式表文件，js是js文件，html是模板和html文件，images是图片资源
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
    │  │          banner_2.png
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
    │          banner_4.png
    │          banner_5.png
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
    │      banner_4.png
    │      banner_5.png
    │
    └─js
            jquery-3.2.1.min.js
            main.js