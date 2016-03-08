var gulp = require('gulp');
var install = require('gulp-install');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var shell = require('gulp-shell');
var pm2 = require('pm2');

gulp.task('default', ['start'], function() {
	// place code for your default task here
});

gulp.task('install', function() {
	return gulp.src(['./bower.json', './package.json'])
		.pipe(install())
		.pipe(shell("bash getRecursos.sh"));
});

gulp.task('pre-test', ['install','stop'], function() {
	return gulp.src(['app/*/*.js', 'app/*.js'])
		// Covering files
		.pipe(istanbul())
		// Force `require` to return covered files
		.pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function() {
	return gulp.src(['test/*.js'])
		.pipe(mocha())
		.pipe(istanbul.writeReports())
		// Enforce a coverage of at least 90%
		.pipe(istanbul.enforceThresholds({
			thresholds: {
				global: 90
			}
		}));
});

gulp.task('start',['test'], function() {
	return pm2.connect(function(err) {
		if (err) console.log(err);
		pm2.start('app.js', function(err, app) {
			if (err) console.log(err);
			pm2.disconnect();
		});
	});
});
gulp.task('stop', function() {
	return pm2.connect(function(err) {
		if (err) console.log(err);
		pm2.stop('all', function(err, proc) {
			if(err) console.log(err);
			pm2.disconnect();
		});
	});
});
