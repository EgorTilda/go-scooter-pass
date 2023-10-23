const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const mediaCSS = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imagemin = require('imagemin');

const babel = require('gulp-babel');
const webpack = require('webpack-stream');

// Prefs
const plumberConfig = {
    errorHandler: notify.onError({
        title: 'Styles',
        message: 'Error <%= error.message %>',
        sound: false
    })
}

// Tasks
gulp.task('html', function(){
    return gulp.src('./src/*.html')
            .pipe(fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
            .pipe(plumber(plumberConfig))
            .pipe(sourceMaps.init())
            .pipe(sass())
            .pipe(mediaCSS())
            .pipe(sourceMaps.write())
            .pipe(gulp.dest('./dist/css/'));
});

gulp.task('img', function() {
    return gulp.src('./src/img/**/*')
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./dist/img/'));
});

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('files', function() {
    return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./dist/files/'));
});

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(babel())
            .pipe(gulp.dest('./dist/js/'))
});

gulp.task('server', function() {
    return gulp.src('./dist/').pipe(server({
        livereload: true,
        open: true
    }));
});

gulp.task('clean', function(done) {
    if (fs.existsSync('./dist/'))
        return gulp.src('./dist/', {read: false}).pipe(clean());
    done();
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/img/**/*', gulp.parallel('img'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts'));
    gulp.watch('./src/files/**/*', gulp.parallel('files'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.series(
    'clean', 
    gulp.parallel('html', 'sass', 'img', 'fonts', 'files'),
    gulp.parallel('server', 'watch')
));

