const path = require('path');

module.exports ={
    entry: {
        app: path.join(__dirname, './test/index.js')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias:{
            'browser-socket': path.resolve(__dirname, "src/index.js"),
        }
      },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};