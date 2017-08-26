<template>
	<div :class="[cls, {fitted: !label}]">
		<input
			:name="internalName"
			type="checkbox"
		>
		<label :for="internalName"><slot>{{label}}</slot></label>
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
	//uncheckable: Boolean
}, [
	'enable',
	'disable'
])
export default class Checkbox extends Vue {
	@Prop() label: string
	@Prop() state3: boolean
	@Model('input') checked: boolean
	@Prop() name: string
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
	gendName = null;
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
	get internalName() {
		return this.name || this.gendName || (this.gendName = genInputName())
	}
}
</script>