var gulp = require('gulp');
var install = require('gulp-install');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');


gulp.task('default',['test'], function() {
	// place code for your default task here
});

gulp.task('install',function(){
return gulp.src(['./bower.json', './package.json'])
	.pipe(install());
});

gulp.task('pre-test', function () {
  return gulp.src(['app/*/*.js','app/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test','install'], function () {
  return gulp.src(['test/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('run',['test'],function(){


});
