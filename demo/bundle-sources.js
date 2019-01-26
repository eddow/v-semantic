var fs = require("fs"),
	path = require('path')
	glob= require('glob');

module.exports = {
	apply(compiler) {
		compiler.hooks.compile.tap('bundle-source', function bundle() {
			console.log('Bundling sources.');
			var sourcesPath = path.resolve(__dirname, 'src/routes/*.vue'),
				destFile = path.resolve(__dirname, 'run/sources.js')
				sources = {};

			for(var src of glob.sync(sourcesPath)) {
				var name = /([^/]*)\.vue$/.exec(src);
				if(name) {
					sources[name[1]] = fs.readFileSync(src, "utf8");
				}
			}
			fs.writeFileSync(destFile, `module.exports = ${JSON.stringify(sources)};`, 'utf8');
		});
	}
}
