// gulpfile.js
var gulp = require('gulp');
// var server = require('gulp-express');
var gls = require('gulp-live-server');
// var mocha = require('gulp-mocha');
var mocha = require('gulp-mocha');
var babel = require('babel/register');

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

  gulp.watch(['server.js', 'api/**/*.js'], function() {
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

// gulp.task('test', function () {
//     return gulp.src('tests/**/*.js', {read: false})
//         // gulp-mocha needs filepaths so you can't have any plugins before it
//         .pipe(mocha({reporter: 'nyan'}));
// });

gulp.task('default',['server']);
