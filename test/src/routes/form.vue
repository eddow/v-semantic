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
				<label slot="prepend" slot-scope="field" :style="field.labelStyle" />
				<s-checkbox slot="input" slot-scope="field" :label="field.label" v-model="field.value" />
			</s-data-mold>
			<s-data-mold>
				<label slot="prepend" slot-scope="field"
						:for="field.name" class="ui label" :style="field.labelStyle">
					<h3>{{field.label}}</h3>
				</label>
				<s-input slot="input" slot-scope="field" :name="field.name" v-model="field.value">
					<s-icon slot="prepend" :icon="field.info || ''" />
				</s-input>
			</s-data-mold>
			<s-field inline prop="big" label="Big" type="bool" />
			<s-field prop="firstName" label="First name" info="hand pointer" />
			<s-field prop="lastName" label="Last name" info="signal" />
			<s-field prop="deep.reason" label="Deep reason"
				:input="checkNumber"
				:output="x=> ''+ x"
			/>
			<s-field prop="deep.thinking" label="Deep thinking">
				<s-select
					slot-scope="field"
					v-model="field.value"
					:options="['Too much'].concat(field.schema.enum)" />
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
import Vue from 'vue'
import { Component, Inject, Model, Prop, Watch, Emit } from 'vue-property-decorator'
import { Model as DataModel, Property, Integer, Enum, MinLength } from'ts-json-schema-decorator'

@DataModel()
class Deep {
	@Property() reason: number
	@Enum('Yes', 'No') thinking: string
}
@DataModel()
class Person {
	@Property() big: boolean
	@MinLength() firstName: string
	@Property() lastName: string
	@Property() deep: Deep
}

@Component
export default class Form extends Vue {
	created() { this.reInit(); }
	checkNumber(string) {
		var rv = Number(string);
		if(isNaN(rv)) throw new Error('Bad number');
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
	model: Person = null
	schema = (<any>Person).schema
}
</script>