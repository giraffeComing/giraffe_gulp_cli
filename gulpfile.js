/**
 * Created by zhangwei36 on 2017/9/18.
 */
var gulp = require('gulp');
// 这里要用gulp-sass不能用gulp-ruby-sass
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
});

// 监视文件改动并重新载入
gulp.task('server',['sass'], function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
    // gulp监控到scss文件改变就执行sass任务
    gulp.watch('app/scss/*.scss', ['sass']);
    // gulp监控到html,js,css文件改变就执行浏览器重载任务
    gulp.watch(['*.html', 'html/**/*.html','css/**/*.css', 'js/**/*.js'], {cwd: 'app'}, reload);
});