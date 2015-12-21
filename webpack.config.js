module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: './build/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.sass$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    }
};