import 'semantic-ui/dist/semantic.min.css'
import * as Vue from 'vue'
import semanticVue from 'semantic-vue'
Vue.use(semanticVue);

import App from './app.vue'

new Vue({
	el: 'app',
	components: {App}
});
