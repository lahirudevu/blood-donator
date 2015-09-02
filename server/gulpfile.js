// gulpfile.js
var gulp = require('gulp');
// var server = require('gulp-express');
var gls = require('gulp-live-server');

gulp.task('server', function() {
  //1. run your script as a server
  var server = gls.new('server.js');
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

gulp.task('default',['server']);
