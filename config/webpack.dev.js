const Webpack                       = require('webpack');
const WebpackDevServer              = require('webpack-dev-server');
const portfinder                    = require('portfinder');
const os                            = require('os');
const path                          = require('path');
const fs                            = require('fs');
const FriendlyErrorsWebpackPlugin   = require('friendly-errors-webpack-plugin');
const chalk                         = require('chalk');
const HtmlWebpackPlugin             = require('html-webpack-plugin');
const { CleanWebpackPlugin }        = require('clean-webpack-plugin');


let { argv } = process, 
    directory = argv[ argv.length - 1 ],
    directoryPath = '',
    basePath = path.resolve(__dirname, '../');

if( !directory ) return false;
directoryPath = path.resolve(basePath, `components/${directory}`);


let stat = fs.statSync(directoryPath),
    isDirectory = stat.isDirectory();
if (isDirectory === false) return console.warn(chalk.blue(`路径: ${directoryPath} 不是一个文件夹!`));


let interfaces = os.networkInterfaces(),
	ipAddress = '';
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
    const host = '0.0.0.0';
    const config = {
        mode: 'development',
        entry: path.resolve(directoryPath, 'index.tsx'),
        output: {
            path: path.resolve(basePath, 'packages', directory),
            filename: `${directory}.js`,
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@style': path.resolve(basePath, 'components', 'style'),
            }
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                { test: /\.t|jsx?$/, use: ['babel-loader', 'ts-loader'], exclude: /node_modules/ },
                { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
            ]
        },
        devServer: {
            hot: true,
            host,
            port,
            compress: true,
            quiet: true,
            clientLogLevel: 'warning',

            historyApiFallback: true
        },
        plugins: [
            new Webpack.HotModuleReplacementPlugin(),
            new Webpack.NamedModulesPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(directoryPath, 'demo', 'index.html'),
                filename: `index.html`,
                chunks: 'all',
                title: directory
            }),
            new CleanWebpackPlugin({
                cleanAfterEveryBuildPatterns: [
                    path.resolve(basePath, 'packages', directory)
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
			})
        ]
    };

    // WebpackDevServer.addDevServerEntrypoints(config, {});

    const server = new WebpackDevServer(Webpack(config), config.devServer);
    server.listen(port, host, error => {
        if (error) console.info(chalk.red(error));
        // else {
        //     console.info(chalk.yellow(
        //         `Project is running at \n
        //             http://localhost:${port}/
        //             http://${ipAddress}:${port}/
        //     `));
        // }
    });
});