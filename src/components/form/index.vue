<template>
	<form class="ui form">
		<slot v-if="model" />
	</form>
</template>

<script lang="ts">
//TODO: manage labels as we manage icons
import * as Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Command from 'directives/command'

@Component
export default class Form extends Command.Commanded {
	@Provide() form
	beforeCreate() { this.form = this; }
	
	@Prop() labelWidth: number
	@Prop() model: any
	get labelStyle() {
		return this.labelWidth?{width: this.labelWidth+'px'}:{};
	}
	command(command: string, params?: any) {
		this.$emit(command, params);
	}
}
</script>