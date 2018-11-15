<template>
	<form class="ui form">
		<template v-if="model">
			<div class="ui attached message" v-if="header || $slots.header">
				<slot name="header">
					<div class="header">
						{{header}}
					</div>
				</slot>
			</div>
			<slot class="ui form attached fluid segment" :model="model" />
			<div v-if="displayErrors && displayedErrors.length"
				class="ui ui bottom attached error message"
			>
				<div v-for="error in displayedErrors" :key="error.schemaPath">
					{{error.dataPath}}: {{error.message}}
				</div>
			</div>
		</template>
		<slot v-else name="empty">
			No data to show
		</slot>
	</form>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Modeled from '../data/modeled'
import Command from 'directives/command'

@Component({
	mixins: [(<any>Modeled).extendOptions]
})
export default class Form extends Command.Commanded {
	@Prop({type: [String, Number]}) labelWidth: number|string
	@Prop() model: any
	@Prop() displayErrors: boolean
	@Prop() inline: boolean
	@Prop({type: String, default: 'fields'}) errorPanel: 'all'|'fields'

	get displayedErrors() {
		return {
			fields: this.fieldErrors,
			all: this.errors
		}[this.errorPanel];
	}
	@Prop({default: ()=>[]}) errors: any[]
	@Prop({default: ()=>[]}) fieldErrors: any[]
	invalidateScopes
	@Watch('model', {immediate: true}) changeModel(model) {
		this.invalidateScopes([model]);
	}
	get labelStyle() {
		return this.labelWidth?{width: this.labelWidth}:{};
	}
	command(command: string, params?: any) {
		this.$emit(command, params);
	}
}
</script>