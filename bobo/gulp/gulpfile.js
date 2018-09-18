//接受参数
const gulp=require('gulp');
const babel=require('gulp-babel');
const sass=require('gulp-sass');
const concat=require('gulp-concat');
const connect=require('gulp-connect');
const clean=require('gulp-clean-css');
const uglify=require('gulp-uglify');
const rename=require('gulp-rename');
const imagemin=require('gulp-imagemin');
const plumber=require('gulp-plumber');
const sourcemaps=require('gulp-sourcemaps')
//创建gulp任务
gulp.task('copy-index',function(){
    gulp.src('bobo/index.html')
    .pipe(gulp.dest('dist'));
})
  
gulp.task('copy-html',function(){
  	gulp.src('bobo/html/*.html')
  	.pipe(gulp.dest('dist/html'))
})   

gulp.task('copy-vendor',function(){
      gulp.src('bobo/vendor/**/*.*')
      .pipe(gulp.dest('dist/vendor'))
})

 gulp.task('copy-assets',function(){
 	gulp.src('bobo/assets/**/*.*')
 	.pipe(gulp.dest('dist/assets'))
 })
 
//gulp.task('copy',['copy-index','copy-html','copy-vendor','copy-assets'])
 
gulp.task('concat',function(){
     gulp.src('bobo/js/**/*.js','!bobo/js/**/es6.js')
     .pipe(concat('output.js'))
     .pipe(gulp.dest('dist/js'))
     .pipe(uglify())
     .pipe(rename('output.min.js'))
     .pipe(gulp.dest('dist/js'))
})

gulp.task('babel',function(){
	gulp.src('bobo/js/**/es6.js')
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest('dist/js'))
	.pipe(uglify())
	.pipe(rename('es6.min.js'))
	.pipe(gulp.dest('dist/js'))	
})

gulp.task('sass',function(){
     gulp.src('bobo/css/**/*.scss')
     .pipe(plumber())
     .pipe(sourcemaps.init())
     .pipe(sass())
     .pipe(gulp.dest('dist/css'))
     .pipe(clean())
     .pipe(sourcemaps.write())
     .pipe(rename(function(filename){
     	filename.basename+='.min';
     }))
     .pipe(gulp.dest('dist/css'))
})

gulp.task('watch',function(){
	 gulp.watch('bobo/index.html',['copy-index'])
	 gulp.watch('bobo/html/*.html',['copy-html'])
	 gulp.watch('bobo/js/**/*.js',['concat'])
	 gulp.watch('bobo/css/**/*.scss',['sass'])
	 gulp.watch('bobo/vendor/**/*.*',['copy-vendor'])
	 gulp.watch('bobo/assets/**/*.*',['copy-assets'])
	 gulp.watch('bobo/js/**/es6.js',['babel'])
     gulp.watch('dist/**/*.*',['reload'])
})



gulp.task('reload',function(){
	gulp.src('dist/**/*.html')
	.pipe(connect.reload());
})


gulp.task('server',function(){
	connect.server({
		root:'dist',
		livereload:true
	})
})
gulp.task('default',['server','watch'],function(){})







