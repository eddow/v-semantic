<template>
	<div :class="[cls, {fitted: !label}]">
		<input
			ref="input"
			:name="name"
			type="checkbox"
			:checked="checked"
		>
		<label :for="name"><slot>{{label}}</slot></label>
	</div>
</template>

<script lang="ts">
import {Model, Prop, Watch} from 'vue-property-decorator'
import Semantic, { VueSemantic } from 'lib/module'

@Semantic('checkbox', {
	disabled: Boolean,
	readOnly: Boolean,
	toggle: Boolean,
	slider: Boolean
}, {
	uncheckable: Boolean,
	fireOnInit: Boolean
}, [
	'change',
	'determinate',
	'before-checked',
	'before-indeterminate',
	'before-determinate',
	'before-unchecked',
	'enable',
	'disable'
])
export default class Checkbox extends VueSemantic {
	@Prop() label: string
	@Prop() state3: boolean
	@Prop() name: string
	@Model('input') checked: boolean
	@Watch('checked')
	apply(checked) {
		if(!this.state3) checked = !!checked;
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
	configure(config) {
		var cancelable = (name)=> {
			config[name] = ()=> this.$cancelable(name);
		};
		config.onChecked = ()=> {
			this.$emit('input', true);
			this.$emit('checked');
		}
		config.onUnchecked = ()=> {
			this.$emit('input', false);
			this.$emit('unchecked');
		}
		config.onIndeterminate = ()=> {
			this.$emit('input', null);
			this.$emit('indeterminate');
		}
		for(let cb of ['beforeChecked', 'beforeIndeterminate', 'beforeDeterminate', 'beforeUnchecked'])
			cancelable(cb);
	}
}
</script>