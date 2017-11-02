/*createSprite taks combines all the icons in the source into a sprites
and saves them to the destination folder*/

var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

/*Sprite configuration object*/
var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          /*use the following css file as template*/
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
};

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

/*
Copy the sprite.svg generated file to the assets/images/sprites
folder. The 'createSprite' task is set as a dependency parameter
*/
gulp.task('copySpriteGraphic', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
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
gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
