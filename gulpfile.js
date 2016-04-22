// grab our packages
var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    bower = require('gulp-bower'),
    nunjucksRender = require('gulp-nunjucks-render')

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// minify js
gulp.task('build_js', function() {
  return gulp.src('src/javascript/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/javascript'));
});

// compile scss
gulp.task('build_css', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/stylesheets'));
});

// compile scss
gulp.task('move_bower_components', function() {
    return bower().pipe(gulp.dest('public/bower_components'));
});

// compile html
gulp.task('build_html', function () {
  return gulp.src('src/**/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
      path: ['src/templates/'] // String or Array
    }))
    .pipe(gulp.dest('public'));
});

// compile html
gulp.task('move_images', function () {
  return gulp.src('src/image/**/*')
             .pipe(gulp.dest('public/image'));
});

// build
gulp.task('build', ['build_html','build_js', 'build_css', 'move_bower_components', 'move_images']);

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('src/**/*.+(html|nunjucks)', ['build_html']);
  gulp.watch('src/javascript/**/*.js', ['build_js']);
  gulp.watch('src/scss/**/*.scss', ['build_css']);
  gulp.watch('./bower_components', ['move_bower_components']);
  gulp.watch('src/image/**/*', ['move_images']);
});