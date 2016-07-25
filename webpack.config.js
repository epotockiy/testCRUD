var webpack = require('webpack');

 module.exports = {
     entry: './app/mainScript.js',
     resolve: {
        modulesDirectories: ["./node_modules/"
        ]
     },
     output: {
         path: './',
         filename: 'app.bundle.js',
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
         }]
     }
 };