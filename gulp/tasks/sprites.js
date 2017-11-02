/*createSprite task combines all the icons in the source into a sprites
and saves them to the destination folder*/

var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

/*Sprite configuration object to control the css generated for the svg assets. To provide compatibility for older browsers not supporting svg
create a filter function to replace .svg for .png */
var config = {
  mode: {
    css: {
      variables: {
        //Filter function to replace the svg file with png 
        replaceSvgWithPng: function() {
          //Return another function with the sprite file and render function as parameters
          return function(sprite, render) {
            //call the render method that gives access to the css template to search for the sprite name generated and change the .svg extension for .png
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite: 'sprite.svg',
      render: {
        css: {
          /*use the following css file as template*/
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

/*
Deletes the following folders to avoid keeping old sprites files every time
changes are done to the icons and the new sprite is generated
*/
gulp.task('beginClean', function() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

/*
Create the sprite.svg file using the icons in assets/images/icons
and copy the new .svg file to the temp/sprite folder.
In addition generate the sprites.css file into the
./app/temp/sprite folder
*/
gulp.task('createSprite', ['beginClean'], function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

/*Creates a png copy of the svg for browsers not supporting svg*/
gulp.task('createPngCopy', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});

/*
Copy the sprite.svg generated file to the assets/images/sprites
folder. The 'createSprite' task is set as a dependency parameter
*/
gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

/*
Copy the sprite.css file from the temp/sprite/css folder into
the assets/styles/modules folder
The 'createSprite' is passed as dependency parameter
*/
gulp.task('copySpriteCSS', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/sprite.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('app/assets/styles/modules'));
});

/*
Delete the temp/sprite folder after the sprite.svg and sprite.css are
copied to the assets folder
*/
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
  return del('./app/temp/sprite');
});

/*
Compile above tasks into one so they can be run together
*/
gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
