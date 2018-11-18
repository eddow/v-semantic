<template>
	<div class="progress-test">
		<s-breadcrumbs :crumbs="crumbs" />
		<s-progress :percent="percent" v-model="status" />
		<s-progress :value="value" :total="total" indicating ratio v-model="status">
			indicating ratio
		</s-progress>
		<div class="ui inverted segment">
			<s-progress :percent="percent" inverted v-model="status"
				progress-text="!{percent}!"
				error-text="Error!"
				warning-text="Warning!"
				active-text="{left}% to go..."
				success-text="{percent}% done"
			/>
			<s-progress inverted indicating :value="value" :total="total" ratio v-model="status"
				progress-text="!{value}/{total}!"
				error-text="Error!"
				warning-text="Warning!"
				active-text="{left} to go..."
				success-text="{value} done"
			/>
		</div>

		<s-select v-model="status" placeholder="status">
			<s-option value="active" />
			<s-option value="warning" />
			<s-option value="success" />
			<s-option value="error" />
		</s-select>
		<div @mousedown="md">
			Click here :
			<div class="command" style="background: black;" @mousemove="mm({offsetX: 0})">
				&nbsp;
			</div>
			<div class="command" style="background: grey; width: 400px;" @mousemove="mm">
				{{setValue}}/{{total}} -- {{setPercent}}%
			</div>
			<div class="command" style="background: green;" @mousemove="mm({offsetX: 400})">
				&nbsp;
			</div>
		</div>
	</div>
</template>
<style>
.progress-test div.command {
	width: 32px;
	height: 32px;
	display: inline-block;
}
</style>
<script lang="ts">
import Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

@Component
export default class Progress extends Vue {
	crumbs = [{
		text: 'Accordion',
		name: 'accordion'
	}, {
		text: 'Buttons',
		name: 'buttons'
	}, {
		text: 'Form',
		name: 'form'
	}, {
		text: 'Inputs',
		name: 'inputs'
	}, {
		text: 'Progress',
		name: 'progress'
	}]
	percent = 0
	value = 0
	total = 23
	setValue = 0
	setPercent = 0
	status = null
	mounted() {

	}
	mm($event) {
		this.setValue = Math.round($event.offsetX*23/400);
		this.setPercent = Math.round($event.offsetX/8);
	}
	md($event) {
		this.percent = this.setPercent;
		this.value = this.setValue;
	}
}
</script>