import {$} from 'lib/shims'

export default {
	bind(el, binding, vnode, oldVnode) {
		var modifiers = Object.keys(binding.modifiers).join(' '),
			dimmer = $(`<div class="ui ${modifiers} loader">ldng</div>`),
			dimmable = $(el)
				.addClass('dimmable')
				.data('dimmel', dimmer)
				.dimmer('add content', dimmer)
				.dimmer('create');
			if(binding.modifiers.blurring) dimmable.addClass('blurring');
	},
	update(el, binding, vnode, oldVnode) {
		if('string'=== typeof binding.value)
			$(el).data('dimmel')
				.addClass('text')
				.text(binding.value);
		else
			$(el).data('dimmel')
				.removeClass('text')
				.text('');
		$(el).dimmer(binding.value?'show':'hide');
	}
};
