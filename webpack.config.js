const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

const production = process.env.NODE_ENV === 'production';

module.exports = {
    mode: production ? 'production' : 'development',

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
            {
                test: /\.module\.scss$/, // Обработка CSS модулей
                use: [
                    'style-loader',
                    {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                    },
                    'sass-loader'
                ],
                },
            {
                test: /\.scss$/, // Обработка обычных стилей
                exclude: /\.module\.scss$/, // исключить, чтобы не пересекаться с модульными
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app', 'template.html'),
            filename: 'index.html'
        }),

        new webpack.HotModuleReplacementPlugin(),

        new MiniCssExtractPlugin({
            filename: production ? '[name].[contenthash].css' : '[name].css',
        }),
    ],

    resolve: {
        extensions: ['.js', '.jsx', ".scss", ".*"],  // чтобы не писать расширение при импорте
        alias: {
            '@': path.resolve(__dirname, "./app")
        },
    },

    devtool: 'source-map',
    devServer: {
        hot: true,
        host: '0.0.0.0',
        compress: true,
        port: 8080,
        client: {
            overlay: true,
            progress: true
        },
        proxy: [
            {
                context: ['/api'],
                target: 'http://back:3000',
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
                secure: false,
            },
        ],
    }
}