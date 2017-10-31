/*require node built-in path module to access project absolute path
because it's required by webpack configuration*/
var path = require('path');

module.exports = {
  //property for bundle file target
  entry: {
    App: "./app/assets/scripts/App.js",
    Vendor: "./app/assets/scripts/Vendor.js"
  },
  //property for bundle file destination
  output: {
    //resolve __direname return the absolute path to this file in the
    //OS directory
    path: path.resolve(__dirname, "./app/temp/scripts"),
    //Adding variable name so webpack dynamically bundles both js files using their source names. 
    filename: "[name].js"
  },
  //add a new module to bundle javascript conversion through Babel
  module : {
    loaders: [
      {
        //load the babel-loader module
        loader: 'babel-loader',
        query: {
          //use es2015 standard (there is already an es2016)
          presets: ['es2015']
        },
        //Regex to apply this loader to javascript files only
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
