import 'semantic-ui/dist/semantic.min.css'
import 'semantic-ui/dist/semantic'
import * as Vue from 'vue'
import semanticVue from 'v-semantic'
Vue.use(semanticVue);
import * as VueRouter from 'vue-router'
Vue.use(VueRouter);
import * as VueCodeMirror from 'vue-codemirror'
Vue.use(VueCodeMirror)

import App from './app.vue'
new Vue({
	router: new VueRouter({
		mode: 'hash',
		routes: require('./routes').routes
	}),
	el: 'app',
	components: {App}
});


import 'codemirror/mode/meta'
import 'codemirror/mode/vue/vue'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'