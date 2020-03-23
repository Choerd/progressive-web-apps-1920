const gulp = require('gulp')
const css_import = require('gulp-cssimport')
const clean_css = require('gulp-clean-css');
const rename = require('gulp-rename')

return gulp.src(__dirname + '/static/css/index.css')
    .pipe(css_import())
    .pipe(clean_css({
        compatibility: 'ie8'
    }))
    .pipe(rename('index.css'))
    .pipe(gulp.dest(__dirname + '/static/bundled/'))