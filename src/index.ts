import './libs'
import * as Vue from 'vue'
import * as components from './components'
import * as directives from './directives'
export {components, directives}
import 'semantic-ui/dist/semantic'
export default {
	install(Vue, options) {
		for(let i in components)
			Vue.component(`S${i}`, components[i]);
		for(let i in directives)
			Vue.directive(i, directives[i]);
	}
};
var CancelError = new Error('Canceled event');
Vue.mixin({
	methods: {
		$cancel() {
			throw CancelError;
		},
		$cancelable(event, ...args) {
			try {
				this.$emit(event, ...args);
				return true;
			} catch(x) {
				if(CancelError!== x) throw x;
				return false;
			}
		}
	}
});