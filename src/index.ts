import Vue from 'vue'
import * as components from './components'
export * from './components'
import * as directives from './directives'
export * from './directives'

export default {
	install(Vue, options) {
		var pfx = (options && options.prefix) || 'S';
		for(let i in components)
			Vue.component(pfx+i, components[i]);
		for(let i in directives)
			Vue.directive(i, directives[i]);
	}
};

/*TODO: Idea, directive `field-value` :
<s-select v-field-value :options="['Too much', 'Yes', 'No']" />
instead of
<s-select v-model="model.deep.thinking" :options="['Too much', 'Yes', 'No']" />
*/