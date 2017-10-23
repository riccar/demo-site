//Include glup and glup-watch
var gulp = require('gulp'),

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

//mixins for reusable bits of code
mixins = require('postcss-mixins'),

hexrgba = require('postcss-hexrgba');




//Define a task called styles
gulp.task('styles', function () {

  //asyncronously return the result of the styles file saved into
  //the temp folder
  return gulp.src('./app/assets/styles/styles.css')

    //pipe the postcss features or filters to be applied to the source file
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))

    /*Add the on error function to tell gulp the styles
    task sucessfully ends, even though there was an error
    This is to prevent gulp from stop running even when an error
    happens*/
    .on('error', function (errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })

    //pipe the destination folder to save source file
    .pipe(gulp.dest('./app/temp/styles'));
});
