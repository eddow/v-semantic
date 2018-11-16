var webpack = require("webpack"),
	path = require("path"),
	glob = require("glob");

module.exports = {
	mode: 'development',
	context: __dirname,
	entry: glob.sync(path.resolve(__dirname, 'src/routes/*.vue')),
	output: {
		filename: 'source.js',
		path: path.resolve(__dirname, "run")
	},
	module: {
		rules: [{
			test: /\.vue$/,
			use: [{
				loader: 'raw-loader',
				options: {}
			}]
		}]
	},
	resolve: {
		extensions: ['.vue']
	}
};