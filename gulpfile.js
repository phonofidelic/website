var gulp = require('gulp'),
    validate = require('gulp-jsvalidate'),
    uglify = require('gulp-uglify'),
    minCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    catCss = require('gulp-concat-css'),
    htmlReplace = require('gulp-html-replace');

// script validation
gulp.task('val', function() {
    gulp.src('js/*.js')
    .pipe(validate());
});

// process head scripts
gulp.task('headScripts', function() {
    gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/sticky/jquery.sticky.js'
        ])
    .pipe(concat('headScripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

//process css
gulp.task('appCss', function() {
    gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'css/font-awesome.min.css',
        'css/main.css'])
    .pipe(catCss('app.min.css', {rebaseUrls: false}))
    .pipe(minCss({rebase: false}))
    .pipe(gulp.dest('dist/css'))
});

// process body scripts
gulp.task('bodyScripts', function() {
    gulp.src('js/*.js')
    // .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// process html
gulp.task('html', function() {
    gulp.src('index.html')
    .pipe(htmlReplace({
        'headScripts': 'js/headScripts.min.js',
        'appCss' : 'css/app.min.css'
        // 'appScripts': 'js/app.min.js'

    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('default', ['headScripts', 'appCss', 'bodyScripts', 'html']);