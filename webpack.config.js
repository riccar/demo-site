/*require node buit-in path module to access project absolute path
because it's required by webpack configuration*/
var path = require('path');

module.exports = {
  //property for bundle file target
  entry: "./app/assets/scripts/App.js",
  //property for boundle file destinatio
  output: {
    //resolve __direname return the absolute path to this file in the
    //OS directory
    path: path.resolve(__dirname, "./app/temp/scripts"),
    filename: "App.js"
  },
  //add a new module to bundle javascrip conversion through Babel
  module : {
    loaders: [
      {
        //load the babel-loader module
        loader: 'babel-loader',
        query: {
          //use es2015 standard (there is already an es2016)
          presets: ['es2015']
        },
        //Regex to apply this loader to javascrit files only
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
