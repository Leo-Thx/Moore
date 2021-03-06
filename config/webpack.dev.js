const Webpack                     = require('webpack');
const WebpackDevServer            = require('webpack-dev-server');
const portfinder                  = require('portfinder');
const os                          = require('os');
const path                        = require('path');
const fs                          = require('fs');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk                       = require('chalk');
const HtmlWebpackPlugin           = require('html-webpack-plugin');
const { CleanWebpackPlugin }      = require('clean-webpack-plugin');
const HappyPack                   = require('happypack');


let { argv }      = process,
    directory     = argv[ argv.length - 1 ],
    directoryPath = '',
    basePath      = path.resolve(__dirname, '../');

if( !directory ) return false;
directoryPath = path.resolve(basePath, `components/${directory}`);


let stat        = fs.statSync(directoryPath),
    isDirectory = stat.isDirectory();
if (isDirectory === false) return console.warn(chalk.blue(`路径: ${directoryPath} 不是一个文件夹!`));


let interfaces = os.networkInterfaces(),
    ipAddress  = '';
for (let devName in interfaces) {
	let iface = interfaces[devName];
	for (let alias of iface) {
		if (/IPv4/i.test(alias.family) && alias.address !== '127.0.0.1' && !alias.internal) {
			ipAddress = alias.address;
			break;
		}
	}
}

portfinder.getPort((error, port) => {
    const host            = '0.0.0.0';
    const devServerConfig = {
        stats: "errors-only",
        host,
        port,
        hot     : true,
        inline  : true,
        progress: true
    };
    const config = {
        mode   : 'development',
        entry  : path.resolve(directoryPath, 'demo/demo.tsx'),
        devtool: 'cheap-module-eval-source-map',
        output : {
            path    : path.resolve(basePath, 'lib', directory),
            filename: `${directory}.js`,
        },
        resolve: {
            modules   : [ 'node_modules' ],
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
            // alias: {
            //     '@style': path.resolve(basePath, 'components', 'style')
            // }
        },
        module: {
            rules: [
                { test: /\.t|jsx?$/, use: ['happypack/loader?id=happyBabel'], exclude: /node_modules/ },
                { 
                    test: /\.s?css$/,
                    use : [
                        { loader: 'style-loader' },     // 使用之后，可能打包不会编译出className
                        { loader: 'css-loader' }, 
                        { loader: 'sass-loader' }
                    ]
                }
            ]
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
            new CleanWebpackPlugin({
                cleanAfterEveryBuildPatterns: [
                    path.resolve(basePath, 'lib', directory)
                ]
            }),
            new FriendlyErrorsWebpackPlugin({
				compilationSuccessInfo: {
					messages: [
						chalk.yellow(
							`Project is running at \n
                                http://localhost:${port}/
                                http://${ipAddress}:${port}/
                        `)
					]
				},
				clearConsole: true
            }),
            new HappyPack({
                id     : 'happyBabel',
                loaders: ['babel-loader?cacheDirectory'],
                threads: os.cpus().length
            }),
            // new class {
            //     apply (compiler) {
            //         compiler.hooks.emit.tapAsync('replaceModuleName', function(compilation, callback){
            //             compilation.chunks.forEach(chunk=>{
            //                 chunk.files.forEach(fileName=>{
            //                     let assets = compilation.assets,
            //                         asset = assets[ fileName ],
            //                         source = asset.source();
            //                     if( /%moduleName%/.test(source) ) {
            //                         let newSource = source.replace(/%(moduleName)%/i, (input, $0, $1) => {
            //                             return 'button';
            //                         });
            //                         assets[ fileName ] = Object.assign(asset, {
            //                             source: ()=>newSource,
            //                             size: ()=>Buffer.byteLength(newSource, 'utf-8')
            //                         });
            //                     }
            //                 });
            //             });
            //             callback();
            //         });
            //     }
            // }
        ]
    };
    
    const server = new WebpackDevServer(
        Webpack(config), devServerConfig
    );

    server.listen(port, host, error => {
        if (error) console.info(chalk.red(error));
    });
});