import './libs'
import * as Vue from 'vue'
import * as components from './components'
import * as directives from './directives'
import * as utils from 'lib/utils'
export {components, directives, utils}
import 'semantic-ui/dist/semantic'
export default {
	install(Vue, options) {
		for(let i in components)
			Vue.component(`S${i}`, components[i]);
		for(let i in directives)
			Vue.directive(i, directives[i]);
	}
};