const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rimraf = require('rimraf');
const fileinclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');

const config = {
  server: {
    baseDir: './dest'
  },
  path: {
    dest: {
      styles: './dest/css',
      scripts: './dest/js',
      sourcemaps: ".",
      images: './dest/images',
      fonts: './dest/fonts',
      html: './dest'
    },
    src: {
      styles: './src/sass/style.sass',
      scripts: './src/js/**/*.js',
      images: './src/images/**/*.*',
      fonts: './src/fonts/**/*.*',
      html: './src/*.html'
    },
    watch: {
      styles: './src/scss/**/*.sass',
      scripts: './src/js/**/*.js',
      images: './src/images/**/*.*',
      fonts: '',
      html: './src/*.html'
    }
  }
};

function styles() {
  return gulp
    .src(config.path.src.styles)
    .pipe(sourcemaps.init(config.path.src.styles))
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cleanCss())
    .pipe(sourcemaps.write(config.path.dest.dest))
    .pipe(gulp.dest(config.path.dest.styles))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src(config.path.src.scripts)
    .pipe(sourcemaps.init(config.path.src.scripts))
    .pipe(uglify())
    .pipe(sourcemaps.write(config.path.dest.sourcemaps))
    .pipe(gulp.dest(config.path.dest.scripts))
    .pipe(browserSync.stream());
}

function copyImages() {
  return gulp
    .src(config.path.src.images)
    .pipe(gulp.dest(config.path.dest.images));
}

function fonts() {
  return gulp.src(config.path.src.fonts)
    .pipe(gulp.dest(config.path.dest.fonts));
}

function html() {
  return gulp.src(config.path.src.html)
    .pipe(fileinclude({
      prefix: "@",
      basepath: "@file"
    }))
    .pipe(gulp.dest(config.path.dest.html));
}

function watch() {
  browserSync.init({
    server: config.server,
    notify: false
  });

  gulp.watch(config.path.watch.styles, styles);
  gulp.watch(config.path.watch.scripts, scripts);
  gulp.watch(config.path.watch.images, copyImages);
  gulp.watch(config.path.watch.html, html);
  gulp.watch(config.path.watch.html).on('change', browserSync.reload);
}

function clean(cb) {
  rimraf(config.path.dest.html, cb);
}

gulp.task('html', html);
gulp.task('clean', clean);
gulp.task('copyImages', copyImages);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('fonts', fonts);
gulp.task('watch', watch);

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.series('html', 'scripts', 'styles', 'fonts', 'copyImages')
  )
);
