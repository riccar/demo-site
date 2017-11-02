var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

/**
 * Grab all the css and js files, pipe them into modernizr function to determine which features we need to test for and generate new versions of these files that are compatible with old browsers. 
 */
gulp.task('modernizr', function() {
  //Point modernizr towards all the css and java files so it can examine the features we are using and determine what needs to be tested for older browsers
  return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
    .pipe(modernizr({
      "options": [
        "setClasses"
      ]
    }))
    .pipe(gulp.dest('./app/temp/scripts/'));
});
