
const MenuContainer = {
  template: `<router-view></router-view>`
};	//used for route-group, menu groups
import Accordion from './routes/accordion.vue'
import Buttons from './routes/buttons.vue'
import Form from './routes/form.vue'
import Inputs from './routes/inputs.vue'
import Progress from './routes/progress.vue'
import Sidebars from './routes/sidebars.vue'
import Table from './routes/table.vue'
import Tabs from './routes/tabs.vue'
const comps = {Accordion, Buttons, Form, Inputs, Progress, Sidebars, Table, Tabs}
const routes = [];
for(let i in comps) {
	let name = i.toLowerCase();
	routes.push({
		name, path: '/'+name,
		menu: i,
		component: comps[i].default
	});
}
export default routes;