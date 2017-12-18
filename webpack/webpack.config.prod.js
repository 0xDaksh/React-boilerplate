const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const html = new htmlWebpackPlugin({
	template: './src/index.template.html',
	filename: 'index.html',
	excludeChunks: ['base'],
	inject: 'body',
    minify: {
		collapseWhitespace: true,
		collapseInlineTagWhitespace: true,
		removeComments: true,
		removeRedundantAttributes: true
	}
})

const concat = new webpack.optimize.ModuleConcatenationPlugin()

const chunk = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[chunkhash].js',
    minChunks (module) {
      return module.context && module.context.indexOf('node_modules') >= 0;
    }
})

const uglify = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    },
    output: {
      comments: false
    }
  })


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
			}
		],
	},
	plugins: [
			html, 
			concat, 
			chunk, 
			uglify, 
			new webpack.HashedModuleIdsPlugin(),   
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new ScriptExtHtmlWebpackPlugin({
				defaultAttribute: 'defer'
			})
	]
}