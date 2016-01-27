var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

gulp.task('styles', function() {
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen({basePath: "public"});
  gulp.watch('src/sass/**/*.scss',['styles']);
});

//Watch task
gulp.task('default', ['watch']);
