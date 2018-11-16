import { VueSemantic } from 'lib/module'
import Vue, { VNode, VNodeDirective } from 'vue'

abstract class Commanded extends VueSemantic {
	abstract command(name: string, params: any);
}

declare module 'vue/types/vnode' {
	interface VNode {
		mouseIn: boolean;	//this is for dimm-parts : separating them makes dts-bundle bug
		commandClick: ()=> void;
	}
}

export default {
	bind(el: HTMLElement, binding: VNodeDirective, vnode: VNode, oldVnode: VNode) {
		//TODO: if no instance, bind to the `click` event of `el`
		//TODO: Find a btter cast than <any>
		var inst = vnode.componentInstance, originalClick = (<any>inst).click,
			component = inst.$parent;
		if(!originalClick) throw new Error('v-command directive applies only on component exposing events.');
		while(component && !(component instanceof Commanded))
			component = component.$parent;
		var commanded = <Commanded>component;
		if(!commanded) throw new Error('v-command directive applies only inside an Commanded component.');
		inst.$on('click', vnode.commandClick = function() {
			var value = binding.value;
			if('function'=== typeof value) value = value();
			if(false!== value)
				commanded.command(binding.arg, true=== value?undefined:value);
		});
	},
	unbind(el: HTMLElement, binding: VNodeDirective, vnode: VNode, oldVnode: VNode) {
		vnode.componentInstance!.$off('click', oldVnode.commandClick);
	},
	Commanded
};
