import './libs'
import * as Vue from 'vue'
import * as components from './components'
export * from './components'
import * as directives from './directives'
export * from './directives'
/*import * as lib from 'lib/*'
export {lib}*/
import 'semantic-ui/dist/semantic'

export default {
	install(Vue, options) {
		var pfx = (options && options.prefix) || 'S';
		for(let i in components)
			Vue.component(pfx+i, components[i]);
		for(let i in directives)
			Vue.directive(i, directives[i]);
	},
	/**
	 * Initialize [alertify.js](https://alertifyjs.org) object for semantic use
	 */
	alertify(alertify) {
/*{  
	"buttons":{  
		"holder":"<nav>{{buttons}}</nav>",
		"ok":"<button class='ok' tabindex='1'>{{ok}}</button>",
		"cancel":"<button class='cancel' tabindex='2'>{{cancel}}</button>"
	},
	"input":"<input type='text'>",
	"message":"<p class='msg'>{{message}}</p>",
	"log":"<div class='{{class}}'>{{message}}</div>"
}*/
		/*var config = alertify._$$alertify.dialogs;
		config.buttons.ok = '<button class="btn primary ui button" tabindex="1">{{ok}}</button>';
		config.buttons.cancel = '<button class="btn ui button" tabindex="2">{{cancel}}</button>';
		config.input = '<input type="text" class="form-control ui input">';*/
	}
};