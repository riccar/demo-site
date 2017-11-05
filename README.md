# demo-site: A travel agency site
This is a rather simple site made with a very powerful and organized development workflow aimed to promote easy code maintenance, common workflow task automation and team collaboration. 

In addition, this website was built leveraging powerful nodejs npm modules, a mobile-first approach and assets optimization for a fast and friendly mobile browsing.

## Code organization
The website consist on one html index file and a number of javascript and css files following a very modular and reusable approach.

Folder structure example

```
/app
  /assets
    /images
      /scripts
        /modules    -Object-oriented well-organized ES6 js files
        App.js      -Imports js files within /modules and declare js objects. 
        Vendor.js   -Imports vendor js libraries not requiring custom js code
      /styles
        /base
        /modules    -Modular css files following the B.E.M. approach
        styles.css  -Imports css files within /modules
  /temp             -Contains bundled css and js files, imported from the html. 
                      These files are generated and modernized by automated tasks and npm modules 
/docs               -The "dist" folder containing only the necessary assets, for production deployment. 
                      These assets are well optimized for faster low data consumption download. 
/gulp               -Contains the definition of gulp tasks to automate various developmental tasks like 
                      css pre-processing, js bundling, and browser refresh when source files change.
    
```
# Development phase nodejs modules
These are the most important modules used throughout the development phase
- ``postcss``: A very fast css preprocessor to build clearer and more modular css
- ``modernizr``: To analyzes the css and js files to determine features require testing for legacy browser support 
- ``webpack``: A Bundlerer tool for js files 
- ``babel``: A ES6 js syntax compiler
- ``browsersync``: A powerful tool that creates a mini web server that launches, refreshes and syncs different web browser windows for easy cross-browser and screen-size check  
- Gulp: A set of modules used to build this highly automated development workflow


# Development workflow
Many common and repetitive tasks were automated using [Gulp](https://gulpjs.com//).
During developing the ``gulp watch`` task is always running in the console. This task monitors any change done to the css and js files to open and/or refresh all the browser windows using browsersync via the execution of ```gulp cssInject``` and ```gulp scriptRefresh``` tasks. In the process, Gulp also executes the following chained tasks that gets all the developer friendly CSS and js files and bundle them together into browser compatible assets.

- ``gulp styles`` task that uses ``postcss`` to produce the browser compatible css bundled files and save them into the ``/temp/styles`` folder
- ``gulp scripts`` to bundle all the js files using ``webpack`` which also loads Babel to convert ES6 js syntax into ES5. This task also runs ``gulp modernizr`` task to enhance browser support. js bundled file is automatically saved into the ``/temp/scripts`` folder

 # Build phase nodejs modules
The build phase is also heavily leveraged using the following nodejs modules
- ``gulp-imagemin``: To compress image assets
- ``gulp-usemin``: To optimize css and js files via ``gulp-cssnano`` and ``gulp-uglyfi`` respectively
- ``gulp-rev``: To revision css and js files. This module adds a random string before the file extension to force web browsers reload
 
 # Build workflow
The build process is fully automated via the ``gulp build`` task which executes the following sub tasks
- ``gulp deleteDistFolder``: Deletes the content of the ``/dist`` folder before creating new files
- ``gulp optimizeImages``: Compress jpeg, gif ans svg images using ``gulp-imagemin`` and save them in the ``/dist/assets/images`` folder
- ``gulp useminiTrigger``: Compress, optimize and revision css and js files using the ``gulp-cssnano`` and ``gulp-uglify`` modules before copying the files to the ``/assets/styles`` and ``/assets/scripts`` folders. In the process this task also triggers the ``gulp styles`` and ``gulp scripts`` tasks
- Finally ``gulp previewDist`` launches another ``browsersync`` mini server to preview the site within the ``/dist``folder ready for deployment

# Vendor modules.
The following modules are used in production to improve website load time and browser compatibility
- ``picturefill``: TEnable the usage of ``<picture>`` tag and ``srcset=`` attribute used for responsive images in browsers not yet supporting them 
- ``lazysizes``: Allows to use special attributes for html image tags so they are downloaded once they are needed to be displayed while scrolling down the page rather than at page load

# Styling
This website was styled following the next two approaches.

- Block Element Modifier (BEM) naming convention. BEM makes the relationship between HTML and CSS easier understand, maintain and reuse which facilitate scalability 

B.E.M.:
- Blocks: css class selectors to style independent reusable portions of the designed page
- Element: css class selectors for elements contained within a block requiring additional styling
- Modifier: css class selectors to target blocks or elements to provide style for a change to the default state 

- Mobile first approach
With the heavy increase in traffic coming from mobile devices, it's wise to start the styling for small screens and then build up additional styling to properly fit bigger screens. The result is lightweight and fast browsing websites that look great for tiny, small, medium and large size screens

Example of BEM and mobile first approach. (Original comments were edited for better exemplification)
Note: the "&" symbol is used in conjunction with Postcss preprocessor to indicate the use of the name of the main class during css conversion and avoid cascading BEM Elements within the Block 

```
/*Main class selector for the testimonial Block*/
.testimonial {
  /*Default styling for tiny screens and bigger */
  background-color: rgba(255, 255, 255, .8);
  padding: 0 1rem 1px 1rem;
  margin-bottom:  98px;

  /*Style for large screens only*/
  @mixin atLarge {
    padding: 0 1.8125rem 1px 1.8125rem;
    margin-bottom:  0;
  }

  /*Class Modifier for the last testimonial Element*/
  &--last {
    margin-bottom: 0;
  }

  /*Class Modifiers for the photo, title and sub title Element within the testimonial*/
  &__photo {
    border-radius: 80px;
    ...
  }

  &__title {
    color: $mainBlue;
    ...
  }

  &__subtitle {
    color: $mainOrange;
    ...
  }

}
```
Snippet of the html section. Note the responsive image approach by providing the different image resolution and the screen width size where each image should be used. 
```
<div class="testimonial testimonial--last">
    <div class="testimonial__photo">
      <img class="lazyload" sizes="160px" data-srcset="assets/images/testimonial-cat.jpg 160w, assets/images/testimonial-cat-hi-dpi.jpg 320w" alt="Cat McKitty">
    </div>
    <h3 class="testimonial__title">Cat McKitty</h3>
    <h4 class="testimonial__subtitle">6 Time Escaper</h4>
    ...
  </div>
</div>

```

# Scripting
- O.O. javascript approach with Babel

# What's next
- Server-side features with Nodejs, Express and MongoDB
