<template>
	<div :class="[cls, dynCls, {field: !!form}]">
		<slot name="prepend" />
		<slot name="input" :input="_self">
			<input :type="type"
				ref="input"
				:name="name"
				:placeholder="placeholder"
				v-model="model"
			/>
		</slot>
		<slot name="append" />
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic, {stringifyClass} from 'lib/classed'
import icon from './icon.vue'
import button from './button.vue'
import {$} from 'lib/shims'

@Semantic('input', {
	loading: Boolean,
	disabled: Boolean,
	error: Boolean,
	transparent: Boolean,
	fluid: Boolean
})
export default class Input extends Vue {
	@Model('input', {type: [String, Number]}) value: string|number
	@Prop() placeholder: string
	@Prop() name: string
	@Prop({default: 'text'}) type: string
	@Emit() input(value) {}
	model = null

	@Prop() dimmPost: boolean
	
	@Watch('model')
	modelChanged(value) {
		this.input(value);
	}
	@Watch('value', {immediate: true})
	valueChanged(value) {
		this.model = value;
	}
	get dynCls() {
		var rv = [];
		var searchType = function(slots, types) {
			if(slots) for(let slot of slots)
				if(slot.componentOptions && ~types.indexOf(slot.componentOptions.Ctor))
					return true;
		}
		var searchLabel = function(slots) {
			if(slots) for(let slot of slots)
				if(slot.data && ~(' '+slot.data.staticClass+' ').indexOf(' label '))
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
		return stringifyClass(rv);
	}
}
</script>