"use strict";
const browsersync = require("browser-sync").create();
var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const styleSRC = "src/scss/**/*.scss";
const styleDIST = "./src/css/";
function compileStyles() {
  return gulp
    .src(styleSRC)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browserslistrc: ["last 3 versions", "ie >= 11", "> 5%"],
        cascade: false,
      })
    )
    .pipe(gulp.dest(styleDIST));
}
function watchFiles() {
  gulp.watch("./src/scss/**/*.scss", compileStyles);
}
const watch = gulp.series(gulp.parallel(watchFiles, compileStyles));
module.exports = {
  style: compileStyles,
  watch: watch,
  default: watch,
};
