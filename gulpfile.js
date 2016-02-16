var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var imageop = require('gulp-image-optimization');
var livereload = require('gulp-livereload');

// gulp.task('concat-styles', function () {
//     var g = gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css', './styles/**/*.scss'])
//     .pipe(concat('main.scss'))
//     .pipe(gulp.dest('./styles'))
//     .pipe(notify({ message: 'Style files concated'}));    
//     return g;
// });

gulp.task('css', function () {
    var g = gulp.src('./styles/*.css')
    .pipe(gulp.dest( './dist/css'));
    return g;
});

gulp.task('sass', function () {
    var g = sass('./styles/style.scss', { style: 'compressed' })
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify({ message: 'Finished compile SASS files'})); 
    return g;
});

gulp.task('libs.js', function() {
  var g = gulp.src(['./bower_components/jquery/dist/jquery.js', './bower_components/bootstrap/dist/js/bootstrap.min.js', './bower_components/angular/angular.js', './bower_components/angular-route/angular-route.js', './bower_components/photoswipe/dist/photoswipe.js', './bower_components/photoswipe/dist/photoswipe-ui-default.js', './bower_components/enscroll/js/mylibs/enscroll.js'])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest( './dist/js'))
    .pipe(notify({ message: 'libs.min.js created'}));
    return g;
});

gulp.task('app.js', function() {
  var g = gulp.src('./js/**/*.js')
  	.pipe(concat('app.js'))
    //.pipe(uglify())
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
    gulp.watch( './img/*', ['images']);
});

gulp.task('build', ['css', 'sass', 'app.js', 'libs.js', 'images']); 