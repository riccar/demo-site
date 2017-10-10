//Include glup and glup-watch
var gulp = require('gulp'),

//Require gulp-watch to monitor file changes
watch = require('gulp-watch'),

//require or import ONLY the create method of browser-sync package
browserSync = require('browser-sync').create();

//Define a task called watch
gulp.task('watch', function () {

  /*Initialize browser-sync to open a web browser-sync
  and display the index.html at the app folder*/
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  //Define the watch function for the index.html file
  watch('./app/index.html', function () {
    //Reload browser when the index.html changes
    browserSync.reload();
  });

  //Define the watch function for any css file
  //the double asterisk includes any other or future sub folders
  watch('./app/assets/styles/**/*.css', function () {
    //star the task cssInject when any css in above path changes
    gulp.start('cssInject');

  });

});

/*Task cssIngest to ingest any change to the styles.css
file whenever it changes
the [styles] task is passed as pre-requisite
so cssIngest function won't run until the styles function
finishes so the /temp/styles/styles.css is generated*/
gulp.task('cssInject', ['styles'], function () {

  //Setup the source of the file
  return gulp.src('./app/temp/styles/styles.css')
    //pipe to the source file the broswerSync stream feature
    //that makes available in the browser the source file
    //and any modification done to it.
    .pipe(browserSync.stream());

});
