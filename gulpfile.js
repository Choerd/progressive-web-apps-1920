const
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCss = require('gulp-clean-css')

gulp.task('css', () => {
    return gulp.src(['dev/css/index.css'])
        .pipe(concat('index.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('static/css'))
})

gulp.task('watch', () => gulp.watch('dev/css/*.css', gulp.series('css')))
gulp.task('default', gulp.series('watch'))