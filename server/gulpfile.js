// gulpfile.js
var gulp = require('gulp');
// var server = require('gulp-express');
var gls = require('gulp-live-server');
// var mocha = require('gulp-mocha');
var mocha = require('gulp-mocha');
var babel = require('babel/register');
var jshint = require('gulp-jshint');
var map = require('map-stream');
var symlink = require('gulp-symlink'); //Again don't forget to install it

var paths = {
  scripts: ['server.js', 'api/**/*.js', 'config/*.js'],
  hints: ['server.js', 'api/**/*.js', 'test/**/*.js', 'config/*.js'],
  hooks: 'hooks/.pre-commit',
  images: 'client/img/**/*'
};

var errorReporter = function () {
  return map(function (file, cb) {
    if (!file.jshint.success) {
      process.exit(1);
    }
    cb(null, file);
  });
};

gulp.task('server', function() {
  //1. run your script as a server
  var server = gls.new('index.js');
  server.start();

  //2. run script with cwd args, e.g. the harmony flag
  // var server = gls.new(['--harmony', 'myapp.js']);
  //this will achieve `node --harmony myapp.js`
  //you can access cwd args in `myapp.js` via `process.argv`
  // server.start();

  //use gulp.watch to trigger server actions(notify, start or stop)
  // gulp.watch(['static/**/*.css', 'static/**/*.html'], function (file) {
  //   server.notify.apply(server, [file]);
  // });
  // gulp.watch('server.js', server.start.bind(server)); //restart my server

  gulp.watch(paths.scripts, function() {
    server.start.apply(server);
  });
});

gulp.task('test', function() {
    // var server = gls.new('index.js');
    // server.start();

    return gulp.src(['tests/**/*.js'])
        .pipe(mocha({
            compilers: {
                js: babel
            }
        }));
});

gulp.task('test-watch', function() {
    gulp.watch(['tests/**/*.js'], ['test']);
});

// JS hint task
gulp.task('jshint', function() {
  gulp.src(paths.hints)
    .pipe(jshint({
        "strict": false,
        "globals": {
            "logger": false,
            "models": false,
            "appRoot": false
        }
    }))
    .pipe(jshint.reporter('default'))
    .pipe(errorReporter());
});

gulp.task('watch', function() {
    // gulp.watch(paths.scripts, ['server']);
    gulp.watch(paths.hints, ['jshint']);
});

gulp.task('hook', function () {
  return gulp.src(paths.hooks)
    .pipe(symlink('../.git/hooks/pre-commit'));
});

gulp.task('default',['server']);
gulp.task('test-server', ['server', 'test-watch'])
