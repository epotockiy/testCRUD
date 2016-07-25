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
// const webpack = require('webpack-stream');
const webpack = require('gulp-webpack');
const $ = require('gulp-load-plugins')({
    camelize: true
})

var config = {
    bootstrapDir: './vendor/bower_components/bootstrap-sass',
    boostrapValidatorDir: './vendor/bower_components/bootstrap-validator',
    publicDir: './assets',
    bowerDir: './vendor/bower_components',
    sassPath: './resource',
    jQueryDir: './vendor/bower_components/jquery',
    knockoutDir: './vendor/bower_components/knockout',
    koMappingDir: './vendor/bower_components/bower-knockout-mapping',
    pagerJsDir: './node_modules/pagerjs'
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


gulp.task('webpack', function() {
  return gulp.src('./app/script.js')
    .pipe(webpack())
    .pipe(gulp.dest('./dist/'));
});


gulp.task('uglifyPlugins', function() {
    return gulp.src([
            config.jQueryDir + '/dist/jquery-2.1.4.js',
            config.bootstrapDir + '/assets/javascripts/bootstrap.js',
            config.boostrapValidatorDir + '/dist/validator.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        // .pipe(uglify())
        .pipe(gulp.dest(config.publicDir + '/js'))
})

gulp.task('default', ['bower', 'uglifyPlugins', 'fonts', 'browserSync']);
