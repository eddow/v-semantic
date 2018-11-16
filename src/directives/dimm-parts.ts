/// <reference types="jquery" />
import {VNode, VNodeDirective} from 'vue'

declare module 'vue/types/vnode' {
	interface VNode {
		mouseIn: boolean;
	}
}

export default function(elm: HTMLElement, binding: VNodeDirective, vnode: VNode, oldVnode: VNode) {
	if(!('mouseIn' in (<any>vnode))) vnode.mouseIn = !!(oldVnode.mouseIn);
	var el = $(elm);
	if(!el.data('dimmPart_'+(binding.arg||''))) {
		el.mouseenter(()=> dimm(true));
		el.mouseleave(()=> dimm(false));
		el.data('dimmPart_'+(binding.arg||''), true);
	}

	var selector = 'dimmed-part'+(binding.arg?'="'+binding.arg+'"':''),
		els = el.find(`*[${selector}]:not(.dimmable)`);
	//first, modify the new ones
	els.addClass('ui dimmable dimmed');
	els.dimmer({
		variation: 'visible active '+(binding.modifiers.inverted?'inverted':'')
	});
	els = el.find(`*[${selector}]`)
	//setTimeout(dimm);
	function dimm(show) {
		if(vnode.mouseIn !== show) {
			if(undefined!== show) vnode.mouseIn = show;
			if(vnode.mouseIn) els.dimmer('hide');	//TODO: ternary operator w/ typescript
			else els.dimmer('show');
		}
	}
};
