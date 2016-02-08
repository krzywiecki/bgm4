var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var imageop = require('gulp-image-optimization');

gulp.task('sass', function () {
	var g = sass( './styles/style.scss', { style: 'compressed' })
	.pipe(gulp.dest( './dist/css'))
	.pipe(notify({ message: 'Finished compile SASS files'}));	
	return g;
});

gulp.task('libs.js', function() {
  var g = gulp.src(['./bower_components/jquery/dist/jquery.js', './bower_components/angular/angular.js'])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest( './dist/js'))
    .pipe(notify({ message: 'libs.min.js created'}));
    return g;
});

gulp.task('app.js', function() {
  var g = gulp.src('./js/*.js')
  	.pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest( './dist/js'))
    .pipe(notify({ message: 'app.min.js created'}));
	return g;
});

gulp.task('images', function(cb) {
    gulp.src(['./img/**/*.png','./img/**/*.jpg','./img/**/*.gif','./img/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./dist/img')).on('end', cb).on('error', cb);
});

gulp.task('default', function() {
    gulp.watch( './styles/**/*.scss', ['sass']);
    gulp.watch( './js/**/*.js', ['app.js']);
    gulp.watch( './img', ['images']);
});

gulp.task('build', ['sass', 'app.js', 'libs.js', 'images']);