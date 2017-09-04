<template>
	<div :class="cls">
		<div class="bar">
			<div class="progress"></div>
		</div>
		<div class="label"><slot>{{label}}</slot></div>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/module'

const texts = ['active', 'error', 'success', 'warning', 'percent', 'ratio'],
	stati = ['active', 'warning', 'success', 'error'];

@Semantic('progress', {
	active: Boolean,
	'bottom-attached': Boolean,
	disabled: Boolean,
	indicating: Boolean,
	inverted: Boolean,
	'top-attached': Boolean
}, {
	autoSuccess: Boolean,
	showActivity: Boolean,
	precision: Number
}, [
	'change'
], {
	props: texts.reduce((acc, value)=> {
		acc[value+'Text'] = String;
		return acc;
	}, {})
})
export default class Progress extends Vue {
	@Prop() label: string
	@Watch('label') changeLabel(v) { this.semantic('set label', v); }
	/*@Prop() barLabel: string
	@Watch('barLabel') changeBarLabel(v) { this.semantic('set bar label', v); }*/
	@Prop() total: number
	@Watch('total') changeTotal(v) { this.semantic('set total', v); }
	@Prop() value: number
	@Watch('value') changeValue(v) { this.semantic('set progress', v); }
	@Prop() percent: number
	@Watch('percent') changePercent(v) { this.semantic('set percent', v); }
	
	@Model('status', {validator: x=> !x || !!~stati.indexOf(x)})
	status: string
	@Watch('status') changeStatus(v) { this.semantic('set '+v); }

	@Prop() progressText: string
	
	@Prop() ratio: boolean
	mounted() {
		if(this.status) this.changeStatus(this.status);
	}
	configure(config) {
		var text = {ratio: this.progressText||'{value}/{total}'}, that = this;
		for(let k of stati)
			if(this[k+'Text'])
				text[k] = this[k+'Text'];
		if(this.progressText) text.percent = this.progressText;
		config.text = text;
		if(this.ratio) config.label = 'ratio';
		if(undefined!== this.value) config.value = this.value;
		if(undefined!== this.total) config.total = this.total;
		function emitter(status) {
			return ()=> that.$emit('status', status);
		}
		for(let status of stati)
			config['on'+status.substr(0,1).toUpperCase()+status.substr(1)] = emitter(status);
	}
}
</script>