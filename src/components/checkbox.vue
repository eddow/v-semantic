<template>
	<div :class="[cls, {fitted: !label}]">
		<input
			:name="internalName"
			type="checkbox"
		>
		<label :for="internalName">{{label}}</label>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/module'
import {idSpace} from 'lib/utils'

const genInputName = idSpace('cbx');

@Semantic('checkbox', {
	disabled: Boolean,
	readOnly: Boolean,
	toggle: Boolean,
	slider: Boolean
}, {
	uncheckable: Boolean
}, [
	'checked',
	'indeterminate',
	'determinate',
	'unchecked',
	'enable',
	'disable'
])
export default class Checkbox extends Vue {
	@Prop() label: string
	@Model('input') checked?: boolean
	@Prop() name: string
	@Watch('checked', {immediate: true})
	apply(checked) {
		this.semantic(
			checked?
				'set checked':
			false=== checked?
				'set unchecked':
				'set indeterminate');
	}
	mounted() {
		this.apply(this.checked);
	}
	gendName = null;
	configure(config) {
		var cancelable = (name)=> {
			config[name] = ()=> {
				try {
					this.$emit(name);
				} catch(x) {
					if('cancel'!== x) throw x;
					return false;
				}
			};
		};
		config.onChecked = ()=> this.$emit('input', true);
		config.onUnchecked = ()=> this.$emit('input', false);
		config.indeterminate = ()=> this.$emit('input', null);
		for(let cb of ['beforeChecked', 'beforeIndeterminate', 'beforeDeterminate', 'beforeUnchecked'])
			cancelable(cb);
	}
	get internalName() {
		return this.name || this.gendName || (this.gendName = genInputName())
	}
}
</script>