const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');

const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const sassGlob = require('gulp-sass-glob');

// Prefs


// Tasks
gulp.task('html:dev', function(){
    return gulp.src('./src/*.html')
            .pipe(fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('./build/'));
});

gulp.task('sass:dev', function() {
    return gulp.src('./src/scss/*.scss')
            .pipe(sassGlob())
            .pipe(sass())
            .pipe(gulp.dest('./build/css/'));
});

gulp.task('img:dev', function() {
    return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('fonts:dev', function() {
    return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./build/fonts/'));
});

gulp.task('files:dev', function() {
    return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./build/files/'));
});

gulp.task('js:dev', function() {
    return gulp.src('./src/js/*.js')
            .pipe(webpack(require('./../webpack.config.js')))
            .pipe(gulp.dest('./build/js/'))
});

gulp.task('server:dev', function() {
    return gulp.src('./build/').pipe(server({
        livereload: true,
        open: true
    }));
});

gulp.task('clean:dev', function(done) {
    if (fs.existsSync('./build/'))
        return gulp.src('./build/', {read: false}).pipe(clean());
    done();
});

gulp.task('watch:dev', function() {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
    gulp.watch('./src/**/*.html', gulp.parallel('html:dev'));
    gulp.watch('./src/img/**/*', gulp.parallel('img:dev'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
    gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
});

