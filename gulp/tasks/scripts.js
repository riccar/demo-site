//Gulp tasks to execute webpack
var gulp = require('gulp'),
webpack = require('webpack');

/*Execute webpack. callback is passed and execued to let Gulp know when
the webpack finishes. The parameters err and stats are printed in the console
for debuggin*/
gulp.task('scripts', function(callback) {
    webpack(require('../../webpack.config.js'), function(err, stats) {
      if (err) {
        console.log(err.toString());
      }
      console.log(stats.toString());
      callback();
    });
});
