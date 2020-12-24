//different package import
const { src, dest, watch, parallel, series } = require("gulp");
const sass = require("gulp-sass");
const sync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default;

//minify JS
function generateJS(cb) {
  src("src/js/*.js").pipe(uglify()).pipe(dest("public/js"));
  cb();
}

//compile SASS
function generateCSS(cb) {
  src("src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      cleanCSS({
        compatibility: "ie10",
      })
    )
    .pipe(dest("public/css"));
  cb();
}

//Browser Live Reload
function browserSync(cb) {
  sync.init({
    server: {
      baseDir: "./public",
    },
  });

  watch("src/scss/*.scss", generateCSS);
  watch("src/js/*.js", generateJS);
  watch("public/css/main.css").on("change", sync.reload);
  watch("public/*.html").on("change", sync.reload);
  cb();
}

//build command
exports.build = series(parallel(generateCSS, generateJS));

//live watch
exports.watch = browserSync;
