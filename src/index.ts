import Vue from 'vue'
import * as components from './components'
import * as directives from './directives'

const exp = {
	install(Vue, options) {
		var pfx = (options && options.prefix) || 'S';
		for(let i in components)
			Vue.component(pfx+i, components[i]);
		for(let i in directives)
			Vue.directive(i, directives[i]);
	}
};

Object.assign(exp, directives, components);

export default exp;