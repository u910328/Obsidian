'use strict';

var path = require('path');
var gulp = require('gulp');

var paths = gulp.paths;

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('obsidianize-app', function () {
    return gulp.src([paths.src+ '/**/*.*', '!'+paths.src+ '/assets/**/*.*'])
        .pipe($.replace('triangular','obsidian'))
        .pipe($.replace('Triangular','Obsidian'))
        .pipe($.replace('triA','obA'))
        .pipe($.replace('triB','obB'))
        .pipe($.replace('triC','obC'))
        .pipe($.replace('triD','obD'))
        .pipe($.replace('triE','obE'))
        .pipe($.replace('triF','obF'))
        .pipe($.replace('triG','obG'))
        .pipe($.replace('triH','obH'))
        .pipe($.replace('triI','obI'))
        .pipe($.replace('triJ','obJ'))
        .pipe($.replace('triK','obK'))
        .pipe($.replace('triL','obL'))
        .pipe($.replace('triM','obM'))
        .pipe($.replace('triN','obN'))
        .pipe($.replace('triO','obO'))
        .pipe($.replace('triP','obP'))
        .pipe($.replace('triQ','obQ'))
        .pipe($.replace('triR','obR'))
        .pipe($.replace('triS','obS'))
        .pipe($.replace('triT','obT'))
        .pipe($.replace('triU','obU'))
        .pipe($.replace('triV','obV'))
        .pipe($.replace('triW','obW'))
        .pipe($.replace('triX','obX'))
        .pipe($.replace('triY','obY'))
        .pipe($.replace('triZ','obZ'))
        .pipe($.replace('tri-','ob-'))
        .pipe($.rename(function(path){
            path.dirname= path.dirname.replace('triangular','obsidian');
            path.basename = path.basename.replace('triangular', 'obsidian')
        }))
        .pipe(gulp.dest('obsidianized/'))
});
gulp.task('obsidianize-assets', function () {
    return gulp.src([paths.src+ '/assets/**/*.*'])
        .pipe($.rename(function(path){
            path.dirname= path.dirname.replace('triangular','obsidian');
            path.basename = path.basename.replace('triangular', 'obsidian')
        }))
        .pipe(gulp.dest('obsidianized/assets/'))
});

gulp.task('obsidianize', ['obsidianize-app','obsidianize-assets']);
