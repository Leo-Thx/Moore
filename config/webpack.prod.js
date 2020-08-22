const Webpack = require('webpack');
const ora     = require('ora');
const os      = require('os');
const path    = require('path');
const fs      = require('fs');

const chalk                   = require('chalk');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const HappyPack               = require('happypack');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


let { argv }      = process,
    directory     = argv[ argv.length - 1 ],
    directoryPath = '',
    basePath      = path.resolve(__dirname, '../');

if( !directory ) return false;
directoryPath = path.resolve(basePath, `components/${directory}`);


let stat        = fs.statSync(directoryPath),
    isDirectory = stat.isDirectory();
if (isDirectory === false) return console.warn(chalk.blue(`路径: ${directoryPath} 不是一个文件夹!`));


const config = {
    mode: 'development',
    // mode: 'production',
    entry : path.resolve(directoryPath, 'index.tsx'),
    output: {
        path    : path.resolve(basePath, 'lib', directory),
        filename: `${directory}.js`,
    },
    resolve: {
        modules   : [ 'node_modules' ],
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias     : {
            '@style': path.resolve(basePath, 'components', 'style'),
        }
    },
    module: {
        rules: [
            { test: /\.t|jsx?$/, use: ['happypack/loader?id=happyBabel'], exclude: /node_modules/ },
            { 
                test: /\.s?css$/,
                use : [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options: {modules: true} }, 
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    externals: {
        react      : 'React',
        'react-dom': 'ReactDOM '
    },
    plugins: [
        new Webpack.NamedModulesPlugin(),
        new Webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(directoryPath, 'demo', 'index.html'),
            filename: `index.html`,
            chunks  : 'all',
            title   : directory
        }),
        // new CleanWebpackPlugin({
        //     cleanAfterEveryBuildPatterns: [
        //         path.resolve(basePath, 'lib', directory)
        //     ]
        // }),
        new CleanWebpackPlugin(),
        new HappyPack({
            id     : 'happyBabel',
            loaders: ['babel-loader?cacheDirectory'],
            threads: os.cpus().length
        }),
        new MiniCssExtractPlugin({
            filename     : `${directory}.css`,
            chunkFilename: `${directory}.css`
        }),
        new OptimizeCSSAssetsPlugin()
    ]
};

const spinner = ora('building for production...');
spinner.start();

Webpack(config).run((err, stats)=>{
    spinner.stop();
    if (err) throw err;

    process.stdout.write(stats.toString({
        colors      : true,
        modules     : false,
        children    : false,   // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks      : false,
        chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan(`  Build ${directory} complete.\n`))
});