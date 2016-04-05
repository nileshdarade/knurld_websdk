// Gulp Dependencies
var gulp = require('gulp');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var concat = require("gulp-concat");
var path = require('path');
var karma = require('karma');
var karmaParseConfig = require('karma/lib/config').parseConfig;

gulp.task('build', function() {
	gulp.src([ './app/src/**/*.js' ]).pipe(concat('knurldsdk.js')).pipe(
			uglify()).pipe(gulp.dest('output'))
});

function runKarma(configFilePath, options, cb) {
	configFilePath = path.resolve(configFilePath);
	var server = karma.server;
	var log=gutil.log, colors=gutil.colors;
	var config = karmaParseConfig(configFilePath, {});

    Object.keys(options).forEach(function(key) {
      config[key] = options[key];
    });

	server.start(config, function(exitCode) {
		log('Karma has exited with ' + colors.red(exitCode));
		cb();
		process.exit(exitCode);
	});
}

/** single run */
gulp.task('test', function(cb) {
	runKarma('app/test/jasmine/websdk_test.conf.js', {
		autoWatch: false,
		singleRun: true
	}, cb);
});

/** continuous ... using karma to watch (feel free to circumvent that;) */
gulp.task('test-dev', function(cb) {
	runKarma('app/test/jasmine/websdk_test.conf.js', {
		autoWatch: true,
		singleRun: false
	}, cb);
});
