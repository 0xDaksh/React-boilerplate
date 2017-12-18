const path = require('path')

module.exports = {
	context: path.resolve('src'),
	entry: './main.js',
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js'
	},
	loaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'env']
			}
		}
	]
}