const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require("path");

const production = process.env.NODE_ENV === 'production';

module.exports = {
    mode: production ? 'production' : 'development',

    entry: path.join(__dirname, 'app', 'index.tsx'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
        clean: true
    },

    module: {
        rules: [
            { 
                test: /.(js|jsx|ts|tsx)$/, 
                exclude: /node_modules/, 
                use: { loader: 'babel-loader', 
                options: { cacheDirectory: true } } 
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            namedExport: false,
                        },
                    importLoaders: 1,
                    sourceMap: !production
                    },
                    },
                    'sass-loader'
                ],
                },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: [
                    production ? MiniCssExtractPlugin.loader: 'style-loader',
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
        new ForkTsCheckerWebpackPlugin({ async: true, typescript: { diagnosticOptions: { semantic: true, syntactic: true } } })
    ],

    resolve: {
        extensions: ['.tsx', '.ts','.js', '.jsx', ".scss", ".*"],
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