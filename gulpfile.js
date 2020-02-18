const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const precss = require('precss');


gulp.task("compile-styles", function() {
  return gulp
    .src("assets/styles/scss/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([precss(), autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("assets/styles/css"));
});