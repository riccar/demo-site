//Gulp tasks to execute webpack
var gulp = require('gulp'),
webpack = require('webpack');

/*Execute webpack. callback is passed and execued to let Gulp know when
the webpack finishes*/

gulp.task('scripts', function(callback) {
    webpack(require('../../webpack.config.js'), function() {
      console.log("webpack completed");
      callback();
    });
});
