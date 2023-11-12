const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const mediaCSS = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-csso');
const htmlmin = require('gulp-htmlclean');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const sassGlob = require('gulp-sass-glob');
const webp = require('gulp-webp');
const webphtml = require('gulp-webp-html');
const webpcss = require('gulp-webp-css');

// Tasks
gulp.task('html:docs', function(){
    return gulp.src('./src/*.html')
            .pipe(fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(webphtml())
            .pipe(htmlmin())
            .pipe(gulp.dest('./docs/'));
});

gulp.task('sass:docs', function() {
    return gulp.src('./src/scss/*.scss')
            .pipe(sassGlob())
            // .pipe(mediaCSS())
            .pipe(sass())
            .pipe(webpcss())
            .pipe(cssmin())
            .pipe(gulp.dest('./docs/css/'));
});

gulp.task('img:docs', function() {
    return gulp.src('./src/img/**/*')
    .pipe(webp())
    .pipe(gulp.dest('./docs/img/'))

    .src('./src/img/**/*')
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./docs/img/'));
});

gulp.task('fonts:docs', function() {
    return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./docs/fonts/'));
});

gulp.task('files:docs', function() {
    return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./docs/files/'));
});

gulp.task('js:docs', function() {
    return gulp.src('./src/js/*.js')
            .pipe(webpack(require('../webpack.config.js')))
            .pipe(babel())
            .pipe(gulp.dest('./docs/js/'))
});

gulp.task('server:docs', function() {
    return gulp.src('./docs/').pipe(server({
        livereload: true,
        open: true
    }));
});

gulp.task('clean:docs', function(done) {
    if (fs.existsSync('./docs/'))
        return gulp.src('./docs/', {read: false}).pipe(clean());
    done();
});


