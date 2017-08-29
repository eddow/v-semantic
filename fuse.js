const {
	Sparky, FuseBox, UglifyJSPlugin, TypeScriptHelpers, CSSPlugin, EnvPlugin, VuePlugin,
	JSONPlugin, BabelPlugin, HotReloadPlugin, QuantumPlugin
} = require('fuse-box');
let producer;
let production = false;

Sparky.task("build", ()=> {
	const fuse = FuseBox.init({
		homeDir: "src",
		output: "dist/$name.js",
		package: 'v-semantic',
		plugins: [
			TypeScriptHelpers(),
			EnvPlugin({NODE_ENV: production ? "production" : "development"}),
			CSSPlugin(), production && UglifyJSPlugin(),
			VuePlugin(),
			JSONPlugin(),
			QuantumPlugin({
				bakeApiIntoBundle : 'v-semantic',
				containedAPI : true,
				target: 'npm'
			})
		],
		hash: production,
		//hmr: true,
		//sourceMaps: {project: true, vendor: false},
		//cache: false,
		cache: !production,
		debug: !production, log: !production,
		package: {
			name: "v-semantic",
			main: 'index.ts'
		},
		alias: {
			//vue: 'vue/dist/vue.common.js',
			lib: '~/lib',
			components: '~/components',
			directives: '~/directives'
		},
		globals: {
			'v-semantic': '*'
		}/*,
		shim: {
			jquery: {
				source: "node_modules/jquery/dist/jquery.js",
				exports: "$",
			}
		}*/
	});

	const app = fuse.bundle("v-semantic")
		//.sourceMaps(true)
		//.plugin(HotReloadPlugin({port: 4445}))
    .instructions('!> [index.ts] - *.d.ts');
	//if (!production) app.hmr();

	return fuse.run();
});
Sparky.task("test", ()=> {
	const fuse = FuseBox.init({
		homeDir: ".",
		output: "test/$name.js",
		package: 'test',
		plugins: [
			TypeScriptHelpers(),
			EnvPlugin({NODE_ENV: production ? "production" : "development"}),
			CSSPlugin(), production && UglifyJSPlugin(),
			VuePlugin(),
			JSONPlugin()
		],
		cache: false,
		debug: true, log: true,
		alias: {
			vue: 'vue/dist/vue.common.js',
			'v-semantic': '~/src/index',
			lib: '~/src/lib',
			components: '~/src/components',
			directives: '~/src/directives'
		},
		shim: {
			jquery: {
				source: "node_modules/jquery/dist/jquery.js",
				exports: "$",
			}
		}
	});

	const test = fuse.bundle("test")
		.watch('(test|src)/**(vue|ts|html)')
		//.sourceMaps(true)
		//.plugin(HotReloadPlugin({port: 4445}))
		.instructions('!> [test/index.ts] - *.d.ts');
	
	const vendor = fuse.bundle("vendor")
		//.sourceMaps(true)
		//.plugin(HotReloadPlugin({port: 4445}))
		.instructions('~ [test/index.ts] +tslib');

	return fuse.run().then((fuseProducer)=> {
		producer = fuseProducer;
	});
});
// main task
Sparky.task("default", ["clean", "build"], ()=> {});
Sparky.task("on", ["build"], ()=> {});	//node fuse on
//Sparky.task("test", ["test"], ()=> {});	//node fuse on

// wipe it all
Sparky.task("clean", ()=> {
	return Promise.all([
		Sparky.src(".fusebox/*").clean(".fusebox/").exec(),
		Sparky.src("dist/*").clean("dist/").exec()
	]);
});

Sparky.task("set-production-env", ()=> production = true);
Sparky.task("dist", ["clean", "set-production-env", "build"], ()=> {})
