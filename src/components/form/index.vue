<template>
	<form class="ui form">
		<template v-if="model">
			<slot />
			<div v-if="displayErrors && fieldErrors.length"
				class="ui pointing red basic error label"
			>
					<div v-for="error in fieldErrors" :key="error.schemaPath">
						{{error.message}}
					</div>
				</div>
			</div>
		</template>
		<slot v-else name="empty">
			No data to show
		</slot>
	</form>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Command from 'directives/command'
import * as Ajv from 'ajv'

@Component({
	provide() { return {
		form: this,
		group: this
	}; }
})
export default class Form extends Command.Commanded {
	
	@Prop({type: [String, Number]}) labelWidth: number|string
	@Prop() model: any
	@Prop({default: {}}) schema
	@Prop() displayErrors: boolean
	@Prop() inline: boolean
	@Prop({type: String, default: 'fields'}) errorPanel: 'all'|'fields'
	fields = {}
	ajv
	beforeCreate() {
		//TODO: add ajv options
		this.ajv = new Ajv({
			allErrors: true
		});
	}
	validation
	@Watch('schema', {immediate: true})
	compileSchema(schema) {
		this.validation = this.ajv.compile(schema);
	}
	@Prop({default: ()=>[]}) errors: any[]
	@Prop({default: ()=>[]}) fieldErrors: any[]
	@Watch('model', {immediate: true, deep: true})
	validate(model) {
		var valid = this.validation(model)
		this.errors.splice(0);
		if(!valid) this.errors.push(...this.validation.errors);
		this.fieldErrors.splice(0, this.fieldErrors.length, ...this.errors);
		this.$emit('validated');
	}
	get labelStyle() {
		return this.labelWidth?{width: this.labelWidth+'px'}:{};
	}
	command(command: string, params?: any) {
		this.$emit(command, params);
	}
}
</script>