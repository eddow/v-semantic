
const MenuContainer = {
  template: `<router-view></router-view>`
};	//used for route-group, menu groups
import * as comps from './routes/*.vue'
export const routes = [];
for(let i in comps) {
	let name = /test\/routes\/(.*).vue$/.exec(i)[1];
	routes.push({
		name, path: '/'+name,
		menu: name.substr(0,1).toUpperCase()+name.substr(1),
		component: comps[i].default
	});
}