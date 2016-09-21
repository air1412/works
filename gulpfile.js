'use strict'
/*
1. LESS编译 压缩 合并
2. JS合并 压缩 混淆
3. img的复制
4. html压缩
 */

//在gulpfile中先载入gulp包，这个包提供一些api
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');

//1. LESS编译 压缩 合并
gulp.task('style',function () {
	//这里是在执行style任务时自动执行的
	gulp.src('src/styles/*.less')//获取文件
	.pipe(less())//格式化less文件
	.pipe(cssnano())//压缩css文件
	.pipe(gulp.dest('dist/styles'))//复制文件
	.pipe(browserSync.reload({stream:true}));//通知浏览器刷新
})

//2. JS合并 压缩 混淆
var concat=require('gulp-concat')
var uglify=require('gulp-uglify')

gulp.task('script',function () {
	gulp.src('src/script/*.js')
	.pipe(concat('all.js'))//合并文件
	.pipe(uglify())//压缩混淆js代码
	.pipe(gulp.dest('dist/scripts'))//复制文件
	.pipe(browserSync.reload({stream:true}));//通知浏览器刷新
})

//3. img的复制
gulp.task('image',function () {
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({stream:true}));//通知浏览器刷新
})


//4. html
var htmlmin=require('gulp-htmlmin')
gulp.task('html',function () {
	gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitespace:true}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));//通知浏览器刷新
})

//配置本地web服务器
var browserSync = require('browser-sync')
gulp.task('serve',function () {
	browserSync({
		server: {
			baseDir:'dist/'
		}
		
	}, function(err, bs) {
		console.log(bs.options.getIn(["urls", "local"]));
	});

	//监视文件
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/script/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
})