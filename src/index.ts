import './libs'
import * as Vue from 'vue'
import * as components from './components'
export * from './components'
import * as directives from './directives'
export * from './directives'
import * as lib from 'lib/*'
export {lib}
import 'semantic-ui/dist/semantic'
import './warnHandler'

export default {
	install(Vue, options) {
		var pfx = (options && options.prefix) || 'S';
		for(let i in components)
			Vue.component(pfx+i, components[i]);
		for(let i in directives)
			Vue.directive(i, directives[i]);
	}
};