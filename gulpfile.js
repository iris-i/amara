var gulp      = require('gulp'),
  sass        = require('gulp-sass'),
  sourcemaps  = require('gulp-sourcemaps'),
  prefix      = require('gulp-autoprefixer'),
  sassLint    = require('gulp-sass-lint'),
  jsLint      = require('gulp-eslint');

// Directories for storing sass and css files
var sassFiles = 'sass/**/*.scss';
var cssDir    = 'css';
var jsDir     = 'js/*.js';

// Gulp-sass options. Log errors to console and compile expanded css
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded' // Change to 'compressed' for production files
};

// Set up sass linting task
'use strict';
gulp.task('lint-sass', function() {
  return gulp.src(sassFiles)
    .pipe(sassLint({
      rules: {
        // 'class-name-format': 0
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

// Set up JS lint
gulp.task('lint-js', function() {
  return gulp.src([jsDir,'!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(jsLint())
    .pipe(jsLint.format())
    .pipe(jsLint.failAfterError());
});

gulp.task('sass', function() {
  return gulp.src(sassFiles)
  // Initialize sourcemaps
    .pipe(sourcemaps.init())
  // Run Sass
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/susy/sass']
    }).on('error', sass.logError))
  // Run autoprefixer.
    .pipe(prefix({
      browsers: ['last 2 versions'],
      cascade: false
    }))
  // Write sourcemaps.
    .pipe(sourcemaps.write())
  // Write the resulting CSS in the output folder.
    .pipe(gulp.dest(cssDir));
});

// gulpfile.js
gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/susy/sass']
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

// Keep an eye on Sass files for changes...
gulp.task('watch', function () {
  gulp.watch(sassFiles, ['lint-sass', 'sass']);
});

gulp.task('default', ['lint-js', 'watch']);





