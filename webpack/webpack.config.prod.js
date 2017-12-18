const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')

// add options here
const options = {
	projname: 'react-boilerplate-project',
	public: 'http://localhost:8080/'
}

// plugins initialized and configured
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
const gzipify = new CompressionPlugin({
	asset: '[path].gz[query]',
	algorithm: 'gzip',
	test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
	threshold: 10240,
	minRatio: 0.8
})
const swprecache = new SWPrecacheWebpackPlugin({
	  cacheId: options.projname,
	  dontCacheBustUrlsMatching: /\.\w{8}\./,
	  filename: 'service-worker.js',
	  minify: true,
	  navigateFallback: options.public + 'index.html',
	  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
})
const preload = new PreloadWebpackPlugin({
	rel: 'preload',
	as: 'script',
	include: 'all',
	fileBlacklist: [/\.(css|map)$/, /base?.+/]
})

// config
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
			}),
			gzipify,
			swprecache,
			preload
	]
}