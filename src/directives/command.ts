import * as Vue from 'vue'

abstract class Commanded extends Vue {
	abstract command(name: string, params: any);
}

export default {
	bind(el, binding, vnode, oldVnode) {
		var inst = vnode.componentInstance, originalClick = inst.click, commanded = inst.$parent;
		if(!originalClick) throw new Error('v-command directive applies only on component exposing events.');
		while(commanded && !(commanded instanceof Commanded))
			commanded = commanded.$parent;
		if(!commanded) throw new Error('v-command directive applies only inside an Commanded component.');
		inst.$on('click', vnode.commandClick = function() {
			commanded.command(binding.arg, binding.value);
		});
	},
	unbind(el, binding, vnode, oldVnode) {
		vnode.componentInstance.$off('click', oldVnode.commandClick);
	},
	Commanded
};
