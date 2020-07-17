const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DEV = process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
    mode: DEV,
    entry: {
        main: path.join(__dirname, 'components/index.tsx')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.js',
        // libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@style': path.resolve(__dirname, 'components', 'style'),
        }
    },
    // devtool: '',
    // externals: /^(react)/,
    module: {
        rules: [
            { test: /\.t|jsx?$/, use: ['babel-loader', 'ts-loader'], exclude: /node_modules/ },
            { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    },
    devServer: {
        hot: true
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.join('index.html'),
        //     filename: `index.html`,
        //     chunks: 'all'
        // }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['./dist']
        })
    ]
};