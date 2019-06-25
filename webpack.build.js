const path = require('path');
const merge = require('webpack-merge');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const configBase = require('./webpack.base.js');
const devMode = false;

module.exports = merge(configBase, {
    entry: {
        app: path.join(__dirname, './test/index.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    mode: 'development',
    devtool: "source-map",
    externals:[],
    plugins: [
        new CleanWebpackPlugin(['dist']),
    ],
    module: {
    }
});