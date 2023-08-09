const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('node-sass'));
const minifyCSS = require('gulp-csso');
const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('browser-sync', () => {
  browserSync.init({
      server: {
          baseDir: "dist"
      }
  });
});

gulp.task('css', () => {
  return gulp.src('src/scss/**/*.scss')
      .pipe(sass()
      .on('error', sass.logError))
      .pipe(minifyCSS())
      .pipe(autoprefixer())
      .pipe(concat('app.min.css'))
      .pipe(gulp.dest('src/dist'))
      .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src('src/js/*.js')
      .pipe(concat('app.min.js'))
      .pipe(minifyJS())
      .pipe(gulp.dest('src/dist'))
      .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch("src/scss/**/*.scss", gulp.task('css'));
  gulp.watch("src/js/*.js", gulp.task('js'));
});