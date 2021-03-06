/*Import vendor libraries to be bounded with webpack
These are libraries not requiring developing any custom script. They just need to be added and in some instances changes to the css and html is required*/

/*modernizr file is automatically generated by gulp-modernizr. Its determine the features we should test for compatibility based on project css and js files*/

import "../../temp/scripts/modernizr";

//Support of responsive images for legacy browsers
import 'picturefill'
//Download assets only when needed, that is, when the user scrolls down the page and the asset like images are about to be displayed. 
import 'lazysizes';

