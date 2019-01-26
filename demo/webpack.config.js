var webpack = require("webpack"),
	path = require("path"),
	VueLoader = require('vue-loader'),
	bundleSources = require('./bundle-sources');

module.exports = {
	mode: 'development',	//This is meant to be bundled afterward anyway
	context: path.resolve(__dirname, 'src'),
	entry: {
		app: ['./index.ts'],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, "run"),
		chunkFilename: "[chunkhash].js"
	},
	plugins: [
		bundleSources,
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new VueLoader.VueLoaderPlugin()
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
			test: /\.[jt]sx?$/,
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
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			loader: 'file-loader?name=public/fonts/[name].[ext]'
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'file-loader',
				options: {}
			}]
		}, {
			test: require.resolve('jquery'),
			use: [{
				loader: 'expose-loader',
				options: 'jQuery'
			}]
		}]
	},
	resolve: {
		alias: {
			lib: path.resolve(__dirname, '../src/lib/'),
			components: path.resolve(__dirname, '../src/components/'),
			directives: path.resolve(__dirname, '../src/directives/'),
			'v-semantic': path.resolve(__dirname, '../src/')
		},
		extensions: [".ts", '.js', '.vue']
	},
	watchOptions: {
		ignored: /\/run\//
	}
};