/// <reference types="jquery" />

export default function(el, binding, vnode, oldVnode) {
	if(!('mouseIn' in vnode)) vnode.mouseIn = !!oldVnode.mouseIn;
	el = $(el);
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
			els.dimmer(vnode.mouseIn?'hide':'show');
		}
	}
};
