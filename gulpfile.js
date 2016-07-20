'use strict';

const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const sass = require('gulp-sass');
const bower = require('gulp-bower');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const minify = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
//const merge = require('merge-stream');,

var config = {
    bootstrapDir: './vendor/bower_components/bootstrap-sass',
    publicDir: './assets',
    bowerDir: './vendor/bower_components',
    sassPath: './resource',
    jQueryDir: './vendor/bower_components/jquery',
    ngDir: './vendor/bower_components/angular/',
    ngRouteDir: './vendor/bower_components/angular-route/',
    ngUiRouteDir: './vendor/bower_components/angular-ui-router/'
};

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('sass', function() {
    return gulp.src(config.sassPath + '/main.scss')
        .pipe(sass({
            includePaths: [config.bootstrapDir + '/assets/stylesheets']
        }))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .on('error', notify.onError(function(error) {
            return "Error :" + error.message;
        }))
        .pipe(gulp.dest(config.publicDir + '/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
        .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('uglifyPlugins', function() {
    return gulp.src([
            config.jQueryDir + '/dist/jquery-2.1.4.js',
            config.bootstrapDir + '/assets/javascripts/bootstrap.js',
            config.ngDir + '/angular.js',
            config.ngRouteDir + '/angular-route.js',
            config.ngUiRouteDir + '/release/angular-ui-router.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.publicDir + '/js'))
})

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
})

gulp.task('build', ['uglifyPlugins']);

gulp.task('default', ['bower', 'uglifyPlugins', 'fonts', 'watch']);
