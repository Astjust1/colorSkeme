const path = require('path');
const webpack = require('webpack');
const constants = require('./constants');
const UglifyJs = require('uglifyjs-webpack-plugin');

module.exports ={
    entry: './client/src/index.js',
    output: {
        path: `${__dirname}/client/public/js`,
        filename: `bundle.js`
    },
    module: {
        rules: [{
            test: /.(jsx|js)?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },{
            test: /.css?$/,
            use: [{
                loader: 'style-loader'
            },{
                loader: 'css-loader'
            }]
            
        },{
            test: /\.svg$/,
            use:{
                loader: 'react-svg-loader'
            }
        }]
    },
    plugins:[
        new UglifyJs({
            test: /.(jsx|js)?$/
        })
    ]
}