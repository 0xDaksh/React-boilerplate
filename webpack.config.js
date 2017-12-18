const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
	context: path.resolve('src'),
	entry: './main.js',
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'env']
				}
			}
		],
	},
	plugins: [new htmlWebpackPlugin({
		template: './src/index.template.html',
		filename: 'index.html',
		inject: 'body'
	})]
}