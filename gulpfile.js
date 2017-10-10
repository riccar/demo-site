//Include glup and glup-watch
var gulp = require('gulp'),
//Require gulp-watch to monitor file changes
watch = require('gulp-watch'),
//require postcss as a CSS preprocessor 
postcss = require('gulp-postcss'),
//require autoprefixer to automatically prefix vendor tags to CSS files
autoprefixer = require('autoprefixer'),
//require simple-vars to use variables within CSS files
cssvars = require('postcss-simple-vars'),
//require nested to be able to nest CSS code
nested = require('postcss-nested'),
//require import to be able to import css files within other css files
cssImport = require('postcss-import');


//Create gulp main task providing task name and callback function
//this task is mandatory
gulp.task('default', function () {
  console.log('First gulp taks');
});

//Define a task called html
gulp.task('html', function () {
  console.log('This is an html task');
});

//Define a task called styles
gulp.task('styles', function () {
  //asyncronously return the result of the styles file saved into the temp folder
  return gulp.src('./app/assets/styles/styles.css')
    //pipe the postcss features or filters to be applied to the source file
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    //pipe the destination folder to save source file
    .pipe(gulp.dest('./app/temp/styles'));
});

//Define a task called watch
gulp.task('watch', function () {
  //Define the watch function for the index.html file
  watch('./app/index.html', function () {
    //start the html task when index.html changes
    gulp.start('html');
  });

  //Define the watch function for any css file
  //the double asterisk includes any other or future sub folders
  watch('./app/assets/styles/**/*.css', function () {
    //star the task styles when any css in above path changes
    gulp.start('styles');

  });

});
