var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function () {
  return gulp.src('./bower_components/*/*.min.js')
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./public/javascripts/'))
    .on('end', done);
});

gulp.task('minify-spa', function () {
  return gulp.src('./app/*.js')
    .pipe(concat('brew-test.js'))
    //.pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('watch', function () {
  gulp.watch('./bower_components/*', ['scripts']);
  gulp.watch('./app/*.js', ['minify-spa']);
});

gulp.task('default', ['scripts', 'minify-spa']);