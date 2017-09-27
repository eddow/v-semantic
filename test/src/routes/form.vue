<template>
	<div class="ui segments">
		<s-form :model="model"
			:schema="schema"
			display-errors
			label-width="200px"
			inline
			class="ui segment"
		>
			<s-data-mold select="bool">
				<template slot="prepend" scope="field">
					<label :style="field.labelStyle" />
				</template>
				<template slot="input" scope="field">
					<s-checkbox :label="field.label" v-model="field.value" />
				</template>
			</s-data-mold>
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
			<s-field inline prop="big" label="Big" type="bool" />
			<s-field prop="firstName" label="First name" info="hand pointer" />
			<s-field prop="lastName" label="Last name" info="signal" />
			<s-field prop="deep.reason" label="Deep reason"
				:input="number"
				:output="x=> ''+ x"
			/>
			<s-field prop="deep.thinking" label="Deep thinking">
				<s-select v-model="model.deep.thinking" :options="['Too much', 'Yes', 'No']" />
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
	created() { this.reInit(); }
	number(string) {
		var rv = Number(string);
		if(isNaN(rv)) throw new Error('bad number');
		return rv;
	}
	reInit() {
		this.model = {
			firstName: "",
			lastName: "",
			big: false,
			deep: {
				reason: 42,
				thinking: 'Yes'
			}
		}
	}
	model = null
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