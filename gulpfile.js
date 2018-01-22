var gulp = require('gulp');
var sass = require('gulp-sass');

var sassSrc   = './public/css/src/';
var sassDest  = './public/css/dest/'; 

gulp.task('default',    defaultTask);
gulp.task('sass',       compileSass);
gulp.task('watchSass',  watchSass);
gulp.task('watch',      watchSass);

function defaultTask(done) {
  done();
}

function compileSass() {
  return gulp.src(sassSrc + '**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(sassDest));
}

function watchSass() {
  gulp.watch('./public/css/src/**/*.scss', ['sass']);
}