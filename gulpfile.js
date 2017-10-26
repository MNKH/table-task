'use strict';

const gulp = require('gulp'),
  path = require('path'),
  fs = require('fs'),
  del = require('del'),
  rename = require('gulp-rename'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  portfinder = require('portfinder'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass'),
  csso = require('gulp-csso'),
  browserSync = require("browser-sync"),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  twig = require('gulp-twig'),
  data = require('gulp-data'),
  cache = require('gulp-cached'),
  cachebust = require('gulp-cache-bust'),
  eslint = require('gulp-eslint'),
  babel = require("gulp-babel"),
  duration = require('gulp-duration'),
  sasslint = require('gulp-sass-lint'),
  runSequence = require('run-sequence'),
  clean = require('gulp-clean'),
  reload = browserSync.reload;


const processors = [
  require('postcss-inline-svg'),
  require('autoprefixer'),
  require('css-mqpacker'),
];

// Ресурсы проекта
const paths = {
  styles: 'assets/source/styles/',
  css: 'assets/css/',
  scripts: 'assets/source/scripts/',
  js: 'assets/js/',
  templates: 'templates/',
  bundles: 'assets/img/',
  html: './',
};

// Одноразовая сборка проекта
gulp.task('default', function() {
  gulp.start('twig', 'styles', 'scripts', 'cache');
});

// Запуск живой сборки
gulp.task('live', function() {
  gulp.start('twig', 'styles', 'scripts', 'cache', 'watch', 'server');
});

// Cборка с вотчем без браузерсинка
gulp.task('no-server', function() {
  gulp.start('twig', 'styles', 'scripts', 'cache', 'watch');
});

// Федеральная служба по контролю за оборотом файлов
gulp.task('watch', function() {
  gulp.watch(paths.templates + '**/*.twig', ['twig']);
  gulp.watch(paths.styles + '**/*.sass', ['styles', 'cache']);
  gulp.watch(paths.scripts + '*.js', ['scripts', 'cache']);
});

// Шаблонизация
gulp.task('twig', function() {
  gulp.src(paths.templates + '*.twig')
    .pipe(plumber({errorHandler: onError}))
    .pipe(twig())
    .pipe(gulp.dest(paths.html))
    .pipe(reload({stream: true}));
});

//Стили

gulp.task('styles', function() {
  runSequence('styles:lint', 'scss:build')
});

//сборка SCSS
gulp.task('scss:build', function() {
  return gulp.src(paths.styles + '*.sass')
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: true,
      precision: 8
    }).on('error', onError))
    .pipe(postcss(processors))
    .pipe(csso({
      restructure: false,
      sourceMap: false,
      debug: false
    }))
    .pipe(duration(`style.css has built`))
    .pipe(gulp.dest(paths.css));
});

// Линтинг стилей
gulp.task('styles:lint', function() {
  gulp.src(paths.styles + '**/*.sass')
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(plumber({errorHandler: onError}));
});

// Сборка и минификация скриптов
gulp.task('scripts', function() {
  gulp.src(paths.scripts + '*.js')
    .pipe(plumber({errorHandler: onError}))
    .pipe(eslint())
    .pipe(eslint.format())
    // .pipe(babel())
    // .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));
});

// Очистка кэша для яваскрипта и ЦССа
gulp.task('cache', function() {
  gulp.src(paths.html + '*.html')
    .pipe(cachebust())
    .pipe(gulp.dest(paths.html))
    .pipe(reload({stream: true}));
});

// Локальный сервер
gulp.task('server', function() {
  portfinder.getPort(function(err, port) {
    browserSync({
      server: {
        baseDir: ".",
        serveStaticOptions: {
          extensions: ['html']
        }
      },
      host: 'localhost',
      notify: false,
      port: port
    });
  });
});

// Рефреш HTML-страниц
gulp.task('html', function() {
  gulp.src(paths.html + '*.html')
    .pipe(reload({stream: true}));
});

// Ошибки
const onError = function(error) {
  gutil.log([
    (error.name + ' in ' + error.plugin).bold.red,
    '',
    error.message,
    ''
  ].join('\n'));
  gutil.beep();
  this.emit('end');
};
