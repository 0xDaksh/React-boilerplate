const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/main.js',
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
			},
			{
				test: /\.css$/,
				loader: require.resolve('css-loader'),
				options: {
					importLoaders: 1,
					modules: true,
					localIdentName: "[name]__[local]___[hash:base64:5]"  
				  },
			},
		],
	},
	plugins: [new htmlWebpackPlugin({
		template: './src/index.template.html',
		filename: 'index.html',
		inject: 'body'
	})]
}
