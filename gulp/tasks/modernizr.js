var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

/**
 * Grab all the css and js files, pipe them into modernizr function to determine which features we need to test for and generate new versions of these files that are compatible with old browsers. 
 */
gulp.task('modernizr', function() {
  return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
    .pipe(modernizr({
      "options": [
        "setClasses"
      ]
    }))
    .pipe(gulp.dest('./app/temp/scripts/'));
});
