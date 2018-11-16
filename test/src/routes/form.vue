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
				<template slot="prepend" slot-scope="field">
					<label :style="field.labelStyle" />
				</template>
				<template slot="input" slot-scope="field">
					<s-checkbox :label="field.label" v-model="field.value" />
				</template>
			</s-data-mold>
			<s-data-mold>
				<template slot="prepend" slot-scope="field">
					<label :for="field.name" class="ui label" :style="field.labelStyle">
						<h3>{{field.label}}</h3>
					</label>
				</template>
				<template slot="input" slot-scope="field">
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
	@MinLength() firstName: string
	@Property() lastName: string
	@Property() deep: Deep
}

@Component
export default class Form extends Vue {
	created() { this.reInit(); }
	number(string) {
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
	model = null
	schema = (<any>Person).schema
}
</script>