const gulp = require('gulp')

gulp.task('js', () =>
  gulp.src('src/js/*.js')
      .pipe(gulp.dest('dist/js'))
)

gulp.task('css', () =>
  gulp.src('src/css/*.css')
      .pipe(gulp.dest('dist/css'))
)

gulp.task('default', ['js', 'css'])