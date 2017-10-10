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

//require or import to be able to import css files within other css files
cssImport = require('postcss-import'),

//require or import ONLY the create method of browser-sync package
browserSync = require('browser-sync').create();

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

  //asyncronously return the result of the styles file saved into
  //the temp folder
  return gulp.src('./app/assets/styles/styles.css')

    //pipe the postcss features or filters to be applied to the source file
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))

    //pipe the destination folder to save source file
    .pipe(gulp.dest('./app/temp/styles'));
});

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
