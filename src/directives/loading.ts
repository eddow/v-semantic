import $ from 'jquery'

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
		$(el).data('dimmel')
			.addClass('text')
			.text('string'=== typeof binding.value ? binding.value : '');
		$(el).dimmer(binding.value?'show':'hide');
	}
};
