<template>
	<div class="ui segments">
		<s-form :model="model"
			:schema="schema"
			display-errors
			label-width="200px"
			inline
			class="ui segment"
		>
			<template slot="prepend" scope="field">
				<label :for="field.internalName" class="ui label" :style="field.labelStyle">
					<h3>{{field.label}}</h3>
				</label>
			</template>
			<template slot="input" scope="field">
				<s-input>
					<s-icon slot="prepend" :icon="field.info || ''" />
				</s-input>
			</template>
			
			<s-field inline name="big" label="Big">
				<s-checkbox label="big" />
				<s-checkbox label="Other" v-model="other" />
			</s-field>
			<s-field name="firstName" label="First name" info="hand pointer" />
			<s-field name="lastName" label="Last name" info="signal" />
			<s-field name="deep.reason" label="Deep reason" />
		</s-form>
		<div class="ui segment">
			<h1>Out of the form</h1>
			<s-checkbox style="display: block;" v-model="model.big" label="model.big" />
			<s-checkbox style="display: block;" v-model="other" label="other" />
			<s-input style="display: block;" v-model="model.firstName" />
			{{model}}
		</div>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

@Component
export default class Form extends Vue {
	other: boolean = null
	model = {
		firstName: "",
		lastName: "",
		big: false,
		deep: {reason: '42'}
	}
	schema = {
		"title": "Person",
		"type": "object",
		"properties": {
			"firstName": {
				"type": "string",
				"minLength": 1
			},
			"lastName": {
				"description": "Familly name",
				"type": "string"
			},
			"deep": {
				"description": "Deep property",
				"type": "object",
				"properties": {
					"reason": {
						"type": "number"
					}
				}
			}
		},
		"required": ["firstName", "lastName"]
	}
}
</script>