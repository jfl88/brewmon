var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var scriptPaths = [
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/d3/d3.min.js',
  'bower_components/nvd3/build/nv.d3.min.js',
  'bower_components/angular-nvd3/dist/angular-nvd3.min.js',
  'bower_components/socket.io-client/dist/socket.io.js'
];

var stylePaths = [
  'bower_components/bootstrap/dist/css/bootstrap.min.css',
  'bower_components/bootstrap/dist/css/bootstrap-theme.css',
  'bower_components/nvd3/build/nv.d3.min.css',
];

gulp.task('scripts', function () {
  return gulp.src(scriptPaths)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('stylelibs', function () {
  return gulp.src(stylePaths)
    .pipe(concat('lib.css'))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('minify-spa', function () {
  return gulp.src('./app/*.js')
    .pipe(concat('brewtest.js'))
    //.pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('styles', function () {
  return gulp.src('./css/*.css')
    .pipe(concat('site.css'))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', function () {
  gulp.watch('./bower_components/*', ['scripts', 'stylelibs']);
  gulp.watch('./app/*.js', ['minify-spa']);
  gulp.watch('./css/*.css', ['styles']);
});

gulp.task('default', ['scripts', 'minify-spa', 'styles', 'stylelibs']);
