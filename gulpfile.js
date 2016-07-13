var gulp = require('gulp-task-doc');
var install = require('gulp-install');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var shell = require('gulp-shell');
var pm2 = require('pm2');
//var browserify = require('browserify');
//var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');

// Show the help
gulp.task('help', gulp.help());

// Default task (start the server)
gulp.task('default', ["start"], function() {});

// Get all the resources to run the server
gulp.task('get-resources', shell.task("bash getRecursos.sh"));

// Install all necessary resources to run the server
gulp.task('install', ['get-resources', 'build'], function() {
    return gulp.src(['./bower.json'])
        .pipe(install());
});

// Run necessary actions before the tests
gulp.task('pre-test', ['stop'], function() {
    return gulp.src(['app/*/*.js', 'app/*.js', '*.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

// Run tests
gulp.task('test', ['pre-test'], function() {
    return gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        // Enforce a coverage of at least 90%
        .pipe(istanbul.enforceThresholds({
            thresholds: {
                global: 85
            }
        }));
});

// Start the server
gulp.task('start', ['test'], function() {
    return pm2.connect(function(err) {
        if (err) console.log(err);
        pm2.start('app.js', function(err, app) {
            if (err) console.log(err);
            pm2.disconnect();
        });
    });
});

// Stop the server
gulp.task('stop', function() {
    return pm2.connect(function(err) {
        if (err) console.log(err);
        pm2.stop('all', function(err, proc) {
            if (err) console.log(err);
            pm2.disconnect();
        });
    });
});

// Build resources
gulp.task('build', ['bundle-js', 'uglify', 'sass', 'imagemin']);


// Uglify bundle scripts
gulp.task('uglify', ['bundle-js'], function() {
    return gulp.src('./public/scripts/builds/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/scripts/builds/'));
});

// Generates css from scss files using sass
gulp.task('sass', function() {
    return gulp.src('./src/sass/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename('bundle.css'))
        .pipe(gulp.dest('./public/css/builds'));
});

//bundle javascript client code
gulp.task('bundle-js', function() {
    return gulp.src('./src/js/main.js')
        .pipe(webpack({
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('./public/scripts/builds/'));
});

//minify images
gulp.task('imagemin', function() {
    gulp.src('public/imagenes/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/imagenes'));
    gulp.src('public/img/banners/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img/banners'));
    gulp.src('public/img/general/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img/general'));
    gulp.src('public/img/inicio/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img/inicio'));
    gulp.src('public/img/interior/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img/interior'));
});
