'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');
var config = require('./app/config.js');

var files=[];
for(var key in config.modulePaths){
    files.push('./app/'+config.modulePaths[key].src);
}
console.log(files);
var bundleArr= config.env.BUNDLE.split('/');
var bundleFileName=bundleArr[bundleArr.length-1];
var bundelFilePath='./app/'+config.env.BUNDLE.replace(bundleFileName,'');

gulp.task('js', function () {
    // set up the browserify instance on a task basis
    var b = browserify(files,{
        //entries: './app/browserifyEntry.js',
        debug: true
    });

    return b.bundle()
        .pipe(source(bundleFileName||'bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(ngAnnotate())
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(bundelFilePath||'./app/dist/'));
});

gulp.task('default', ['javascript']);