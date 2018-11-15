import 'semantic-ui/dist/semantic.min.css'
import 'semantic-ui/dist/semantic'
import * as Vue from 'vue'
import semanticVue from 'v-semantic'
Vue.use(semanticVue);
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import * as VueCodeMirror from 'vue-codemirror'
Vue.use(VueCodeMirror)
import App from './app.vue'
import routes from './routes'

new App({
	router: new VueRouter({
		mode: 'hash',
		routes: routes
	}),
	el: 'app'
});

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/mode/meta'
import 'codemirror/addon/mode/overlay'
import 'codemirror/addon/mode/simple'
import 'codemirror/addon/selection/selection-pointer'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/handlebars/handlebars'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/vue/vue'