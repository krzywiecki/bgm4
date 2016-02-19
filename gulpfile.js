var gulp = require('gulp');
var gulpMerge = require('gulp-merge');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var imageop = require('gulp-image-optimization');
var livereload = require('gulp-livereload');
var clean = require('gulp-clean');

gulp.task('default', function() {
    gulp.watch( './styles/**/*.scss', ['css-prod']);
    gulp.watch( './js/**/*.js', ['js-prod']);
    gulp.watch( './img/*', ['img-prod']);
});

gulp.task('fonts-prod', function () {
    var g = gulp.src('./fonts/*')
    .pipe(gulp.dest( './dist/fonts'));
    return g;
});

gulp.task('img-prod', function(cb) {
    gulp.src(['./img/**/*.png','./img/**/*.jpg','./img/**/*.gif','./img/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./dist/img')).on('end', cb).on('error', cb);
});

gulp.task('css-prod', function () {
    return gulpMerge(
        gulp.src(['./styles/animate.min.css', './bower_components/bootstrap/dist/css/bootstrap.min.css', './bower_components/photoswipe/dist/photoswipe.css', './bower_components/photoswipe/dist/default-skin/default-skin.css', './styles/style.scss'])
        .pipe(concat('style.scss'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify({ message: 'style.scss created' }))    
    )
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify({ message: 'style.css created'})); 
});

gulp.task('js-prod', function() {
    return gulpMerge(
            gulp.src(['./bower_components/jquery/dist/jquery.js', './bower_components/bootstrap/dist/js/bootstrap.min.js', './bower_components/angular/angular.js', './bower_components/angular-route/angular-route.js', './bower_components/photoswipe/dist/photoswipe.js', './bower_components/photoswipe/dist/photoswipe-ui-default.js', './bower_components/enscroll/js/mylibs/enscroll.js'])
            .pipe(concat('libs.js'))
            .pipe(gulp.dest( './dist/js'))
            .pipe(notify({ message: 'libs.js created'})),
            gulp.src('./js/**/*.js')
            .pipe(concat('main.js'))
            .pipe(gulp.dest( './dist/js'))
            .pipe(notify({ message: 'main.js created'}))
    )
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest( './dist/js'))
    .pipe(notify({ message: 'app.min.js created'}));
});

gulp.task('build', ['img-prod', 'fonts-prod', 'css-prod', 'js-prod'], function () {
    gulp.src(['dist/js/*.js', 'dist/css/*.scss', '!dist/js/*min.js'], {read: false})
    .pipe(clean());
}); 