<template>
	<div class="ui segments">
		<s-form :model="model"
			:schema="schema"
			display-errors
			label-width="200px"
			inline
			class="ui segment"
		>
			<s-data-mold>
				<template slot="prepend" scope="field">
					<label :for="field.name" class="ui label" :style="field.labelStyle">
						<h3>{{field.label}}</h3>
					</label>
				</template>
				<template slot="input" scope="field">
					<s-input :name="field.name" v-model="field.value">
						<s-icon slot="prepend" :icon="field.info || ''" />
					</s-input>
				</template>
			</s-data-mold>
			<s-data-mold select="bool">
				<template slot="prepend" scope="field">
					<label :style="field.labelStyle" />
				</template>
				<template slot="input" scope="field">
					<s-checkbox :label="field.label" v-model="field.value" />
				</template>
			</s-data-mold>
			<s-field inline property="big" label="Big" type="bool" />
			<s-field property="firstName" label="First name" info="hand pointer" />
			<s-field property="lastName" label="Last name" info="signal" />
			<s-field property="deep.reason" label="Deep reason" />
			<s-field property="kindness" label="Kindness">
				<s-select v-model="model.kindness" :values="['Too much', 'Yes', 'No']" />
			</s-field>
		</s-form>
		<div class="ui segment">
			<h1>Out of the form</h1>
			<s-checkbox style="display: block;" v-model="model.big" label="model.big" />
			<s-input style="display: block;" v-model="model.firstName" />
			{{model}}
			<s-button style="display: block;" @click="reInit">Re-init</s-button>
		</div>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

@Component
export default class Form extends Vue {
	getValue(field) {
		return field.value;
	}
	reInit() {
		this.model = {
			firstName: "",
			lastName: "",
			big: false,
			deep: {reason: '42'},
			kindness: 'Yes'
		}
	}
	model = {
		firstName: "",
		lastName: "",
		big: false,
		deep: {reason: '42'},
		kindness: 'Yes'
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