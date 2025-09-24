const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");

let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
    mode,
    entry: path.join(__dirname, 'app', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }

            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app', 'template.html'),
            filename: 'index.html'
        }),
        // заменил на output.clean
        // new FileManagerPlugin({
        //     events: {
        //         onStart: {
        //             delete: ['dist']
        //         }
        //     }
        // })
    ],
    resolve: {
        extensions: ['.js', '.jsx']  // чтобы не писать расширение при импорте
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        port: 8080
    }
}