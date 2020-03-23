const
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();

gulp.task('css', () => {
    return gulp.src(['dev/css/index.css'])
        .pipe(concat('index.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('static/css'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
    })
})

gulp.task('default', gulp.series(gulp.parallel('browserSync', 'css')), () => {
    gulp.watch('dev/css/*.css', gulp.series('css'))
    gulp.watch('dev/css/*.css', browserSync.reload)
})

// Todo: Ervoor zorgen dat hij elke keer refresht als er een file wordt aangepast
// Todo: Niet elke keer een nieuwe tab openen maar refreshen