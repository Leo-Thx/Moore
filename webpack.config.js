const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DEV = process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
    mode: DEV,
    entry: {
        main: path.join(__dirname, './index.tsx')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.js',
        // libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    // devtool: '',
    // externals: /^(react)/,
    module: {
        rules: [
            { test: /\.tsx?$/, use: ['ts-loader'] },
            { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    },
    devServer: {
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join('index.html'),
            filename: `index.html`,
            chunks: 'all'
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['./dist']
        })
    ]
};