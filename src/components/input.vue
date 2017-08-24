<template>
	<div :class="cls">
		<slot name="prepend" />
		<input type="text" :placeholder="placeholder" :value="value" @input="input" />
		<slot name="append" />
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/classed'
import icon from './icon.vue'
import button from './button.vue'

@Semantic('input', {
	loading: Boolean,
	disabled: Boolean,
	error: Boolean,
	transparent: Boolean,
	fluid: Boolean
})
export default class Input extends Vue {
	@Model('input')
	value: string
	@Prop() placeholder: string

	change(x) {
		console.log
	}
	input($event) { this.$emit('input', $event.target.value); }
	get dynCls() {
		var rv = [];
		var searchType = function(slots, types) {
			if(slots) for(let slot of slots)
				if(slot.componentOptions && ~types.indexOf(slot.componentOptions.Ctor))
					return true;
		}
		var searchLabel = function(slots) {
			if(slots) for(let slot of slots)
				if(~(' '+slot.data.staticClass+' ').indexOf(' label '))
					return true;
		}
		if(searchType(this.$slots.prepend, [icon]))
			rv.push('left icon');
		else if(searchType(this.$slots.append, [icon]))
			rv.push('icon');
		if(searchType(this.$slots.prepend, [button]))
			rv.push('left action');
		else if(searchType(this.$slots.append, [button]))
			rv.push('action');
		if(searchLabel(this.$slots.append))
			rv.push('right labeled');
		else if(searchLabel(this.$slots.prepend))
			rv.push('labeled');
		return rv.css();
	}
}
</script>