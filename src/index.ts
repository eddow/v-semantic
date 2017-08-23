import './libs'
import * as components from './components'
export * from './components'
import 'semantic-ui/dist/semantic'
export default {
	install(Vue, options) {
		for(let i in components)
			Vue.component(`s-${i}`, components[i]);
	}
};