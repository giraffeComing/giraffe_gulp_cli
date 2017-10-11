/**
 * Created by zhangwei36@staff.sina.com.cn on 2017/9/18.
 */
var gulp = require('gulp');
// sass（引入compass后已弃用）
var sass = require('gulp-sass');
// 引入compass
var compass = require('gulp-compass');
// 热加载
var browserSync = require('browser-sync');
var reload = browserSync.reload;
// tpl
var fileinclude  = require('gulp-file-include');
// 重命名
var rename = require("gulp-rename");
// 压缩css
var minifyCSS = require('gulp-minify-css');
// 文件拼合
var concat = require('gulp-concat');
// 读写文件 node 内置模块
var fs = require('fs');
// 文件内的附加内容
var wrapper = require('gulp-wrapper');
// gulp任务按顺序执行
var gulpSequence = require('gulp-sequence');
// 正则替换
var replace = require('gulp-replace');
// html内容替换
var htmlreplace = require('gulp-html-replace');
// js文件压缩
var uglify = require('gulp-uglify');
/**
 * [projectConfig 项目设置]
 */
var projectConfig = {
    // 项目名称
    name: 'gulp pro',
    // 项目开发者
    author: 'zhangwei36@staff.sina.com.cn',
    // 是否自动发布
    isAutoRelease: true,
    // 发布路径
    releasePath: 'finance/crowdfunding/index/3.0.0',
    // 是否自动补全 CDN路径
    isAutoPrefixCDN: true,
    // CDN路径
    cdnPath: '//static.360buyimg.com/'
};
/**
 * [projectUtil 工具类]
 */
var projectUtil = {
    // 获取CDN全部路径
    getCDNpath: function() {
        var cdnPath = projectConfig.cdnPath + projectConfig.releasePath;
        return cdnPath;
    },
    // 获取当前时间
    getNowDate: function() {
        var nowDate = new Date();
        now = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate() + ' ' + nowDate.getHours() + ':' + nowDate.getMinutes() + ':' + nowDate.getMinutes();
        return now;
    },
    // 删除文件夹
    deleteDir: function(path) {
        var _this = this;
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function(file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    _this.deleteDir(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
};

//compass
gulp.task('compass',function(){
    return gulp.src('app/css/*.scss')
        .pipe(compass({
            // 这里这个配置文件炒鸡重要，进到配置文件里还要配置一下图片路径
            config_file: 'config.rb',
            // 是否生成map文件
            sourcemap: false,
            time: true,
            css: 'app/css/',
            sass: 'app/css/',
            // images:'app/css/i/bgs/',
            style: 'compact' //nested, expanded, compact, compressed
        }))
        .pipe(gulp.dest('app/css/'));
});

// html打包到build目录时候对css和js的引用路径进行替换
gulp.task('html',function() {
    return gulp.src('app/html/**/*.html')
        .pipe(htmlreplace({
            'css': projectUtil.getCDNpath()+'/css/index.min.css',
            'seajs': projectUtil.getCDNpath()+'/js/sea.js',
            'jquery': projectUtil.getCDNpath()+'/js/jquery-3.2.1.min.js',
            'mainjs': projectUtil.getCDNpath()+'/js/main.js'
        }))
        .pipe(gulp.dest('app/build/html'));
});

// 移动图片到build
gulp.task('moveFiles', function() {
    gulp.src([
        'app/css/i/*.png',
        'app/css/i/*.jpg',
        'app/css/i/*.gif'
    ])
        .pipe(gulp.dest('app/build/css/i'));
    gulp.src([
        'app/css/bgs/*.png',
        'app/css/bgs/*.jpg',
        'app/css/bgs/*.gif'
    ])
        .pipe(gulp.dest('app/build/css/sprite'));
    gulp.src([
        'app/images/*.png',
        'app/images/*.jpg',
        'app/images/*.gif'
    ])
        .pipe(gulp.dest('app/build/images'));
});

// uglify javascript
gulp.task('js', function() {
    gulp.src([
        'app/js/**/*.js'
    ]).pipe(uglify({
        //注意，以前的保留字字段是except，现在的是reserved
        mangle: { reserved: ['require' ,'exports' ,'module' ,'jQuery', '$'] },
        output: { ascii_only: true }
    }))
        // .pipe(replace(/\.\.\//, projectUtil.getCDNpath() + '/'))
        .pipe(wrapper({
            header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
        }))
        .pipe(gulp.dest('app/build/js'))
});

// css拼合
gulp.task('contactCss', function() {
    return gulp.src('app/css/*.css')
        .pipe(concat('index.css'))
        .pipe(gulp.dest('app/build/css'))
});

// css压缩,先拼合再压缩
gulp.task('minifyCss',['contactCss'],function() {
    return gulp.src([
        'app/build/css/*.css'
    ])
        .pipe(minifyCSS({
            compatibility: 'ie7'
        }))
        .pipe(wrapper({
            header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
        }))
            // 将css文件的名字改成min.css的
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest('app/build/css'))
});

// tpl模板任务
gulp.task('fileinclude', function() {
    // 路径为页面级的tpl路径
    gulp.src(['app/html/template/*.tpl'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
    // 页面级tpl改为html后缀输出
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(gulp.dest('app/html'));
});

// 监视文件改动并重新载入
gulp.task('server', function() {
    // 先拼合一下模板
    gulp.run(['fileinclude']);
    // 模板发生修改的时候再重新拼合模板并更新html,watch的时候一定要指定cwd的目录
    // **/*能匹配到目录下的所有文件
    gulp.watch('html/template/**/*.tpl', {cwd: 'app'}, ['fileinclude']);
    browserSync({
        server: {
            baseDir: 'app',
            // 是否开启目录访问
            directory: true
        }
    });
    // gulp监控到scss文件改变就执行sass任务
    gulp.watch('css/*.scss',{cwd: 'app'}, ['compass']);
    // gulp监控到html,js,css文件改变就执行浏览器重载任务
    gulp.watch(['html/*.html','css/**/*.css', 'js/**/*.js'], {cwd: 'app'}, reload);
});

// 删除build文件夹
gulp.task('deleteBuild', function() {
    projectUtil.deleteDir('app/build');
});

// task build 打包流程
gulp.task('build', function() {
    gulp.run(['deleteBuild','minifyCss','js','moveFiles', 'html']);
});