const gulp = require('gulp')

gulp.task('default', () =>
  gulp.src('src/js/*.js')
      .pipe(gulp.dest('dist/js'))
)