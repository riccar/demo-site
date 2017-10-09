//Include glup and glup-watch
var gulp = require('gulp'),
watch = require('gulp-watch');

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
  console.log('Here we can run Sass or PostCSS');
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
