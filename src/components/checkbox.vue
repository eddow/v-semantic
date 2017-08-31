<template>
	<div :class="[cls, {fitted: !label}]">
		<input
			ref="input"
			:name="internalName"
			type="checkbox"
			:checked="checked"
		>
		<label :for="internalName"><slot>{{label}}</slot></label>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/module'
import Fielded from './form/fielded'

@Semantic('checkbox', {
	disabled: Boolean,
	readOnly: Boolean,
	toggle: Boolean,
	slider: Boolean
}, {
	//uncheckable: Boolean
}, [
	'enable',
	'disable'
], {
	mixins: [Fielded]
})
export default class Checkbox extends Vue {
	@Prop() label: string
	@Prop() state3: boolean
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