var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var order = require("gulp-order");
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var jsFiles = 'src/js/*.js';
var jsDestination = './js/min';
var scssFiles = 'src/scss/**/*.scss';
var scssDestination = './css/';

gulp.task('styles', function () {
	return gulp.src(scssFiles)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(scssDestination))
});

gulp.task('lint', function () {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
	return gulp.src(jsFiles)
		.pipe(order([
			'main.js',
		], {base: './'}))
		.pipe(concat('compiled.js'))
		.pipe(gulp.dest(jsDestination))
		.pipe(rename('site.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(jsDestination));
});

//Watch task
gulp.task('watch', function () {
	gulp.watch(scssFiles, ['styles']);
	gulp.watch(jsFiles, ['scripts']);
	gulp.watch(jsFiles, ['lint']);/**/
});

gulp.task('default', ['styles', 'scripts', 'watch']);

