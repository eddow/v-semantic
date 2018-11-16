var webpack = require("webpack"),
	path = require("path"),
	externals = require('webpack-node-externals'),
	{default: DtsBundlePlugin} = require('webpack-dts-bundle'),
	VueLoader = require('vue-loader');

module.exports = {
	mode: 'development',	//This is meant to be bundled afterward anyway
	context: path.resolve(__dirname, 'src'),
	entry: {
		'v-semantic': ['./index.ts'],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, "dist"),
		libraryTarget: 'umd',
		library: 'v-semantic',
		umdNamedDefine: true
	},
	plugins: [
		new DtsBundlePlugin({
			name: 'v-semantic',
			main: 'dist/index.d.ts',
			out: 'v-semantic.d.ts',
			removeSource: true
		}),
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new VueLoader.VueLoaderPlugin()
	],
	externals: [
		externals()
	],
	devtool: 'source-map',
	module: {
		rules: [{
			test: /\.tsx?$/,
			exclude: /node_modules/,
			loader: 'ts-loader',
			options: {
				appendTsSuffixTo: [/\.vue$/]
			}
		}, {
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}, {
			enforce: 'pre',
			test: /\.tsx?$/,
			exclude: /node_modules/,
			use: "source-map-loader"
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					ts: 'ts-loader'
				}
			}
		}]
	},
	resolve: {
		alias: {
			lib: path.resolve(__dirname, 'src/lib/'),
			components: path.resolve(__dirname, 'src/components/'),
			directives: path.resolve(__dirname, 'src/directives/')
		},
		extensions: [".ts", ".js", '.html', '.vue']
	}
};