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
var concat=require('gulp-concat')//文件合并

//1. LESS编译 压缩 合并
/*gulp.task('style',function () {
	//这里是在执行style任务时自动执行的
	gulp.src('src/styles/*.less')//获取文件
	.pipe(less())//格式化less文件
	.pipe(cssnano())//压缩css文件
	.pipe(gulp.dest('dist/styles'))//复制文件
	.pipe(browserSync.reload({stream:true}));//通知浏览器刷新
})*/
gulp.task('style',function () {
	//这里是在执行style任务时自动执行的
	gulp.src('src/study163/styles/*.css')//获取文件
	/*.pipe(less())//格式化less文件*/
	.pipe(concat('index.css'))
	.pipe(cssnano())//压缩css文件
	.pipe(gulp.dest('dist/study163/styles'))//复制文件
	.pipe(browserSync.reload({stream:true}));//通知浏览器刷新
})

//2. JS合并 压缩 混淆

var uglify=require('gulp-uglify')

gulp.task('script',function () {
	gulp.src('src/study163/scripts/*.js')
	.pipe(concat('all.js'))//合并文件
	.pipe(uglify())//压缩混淆js代码
	.pipe(gulp.dest('dist/study163/scripts'))//复制文件
	.pipe(browserSync.reload({stream:true}));//通知浏览器刷新
})

//3. img的复制
gulp.task('image',function () {
	gulp.src('src/study163/images/*.*')
	.pipe(gulp.dest('dist/study163/images'))
	.pipe(browserSync.reload({stream:true}));//通知浏览器刷新
})


//4. html
var htmlmin=require('gulp-htmlmin')
gulp.task('html',function () {
	gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitespace:true}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));

	gulp.src('src/study163/*.html')
	.pipe(htmlmin({collapseWhitespace:true}))
	.pipe(gulp.dest('dist/study163'))
	.pipe(browserSync.reload({stream:true}));
})

/*gulp.task('html1',function () {
	gulp.src('src/study163/*.html')
	.pipe(htmlmin({collapseWhitespace:true}))
	.pipe(gulp.dest('dist/study163/'))
	.pipe(browserSync.reload({stream:true}));//通知浏览器刷新
	
})*/

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
	gulp.watch('src/study163/styles/*.css',['style']);
	gulp.watch('src/study163/scripts/*.js',['script']);
	gulp.watch('src/study163/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
	gulp.watch('src/study163/*.html',['html']);
})