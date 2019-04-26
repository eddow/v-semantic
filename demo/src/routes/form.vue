<template>
	<div class="ui segments">
		<s-form :model="model"
			:schema="schema"
			display-errors
			label-width="200px"
			inline
			class="ui segment"
		>
			<mold3 />
			<s-data-mold select="bool">
				<template v-slot:prepend="field">
					<label :style="field.labelStyle" />
				</template>
				<s-checkbox v-slot:input="field" :label="field.label" v-model="field.value" />
			</s-data-mold>
			<s-data-mold>
				<template v-slot:prepend="field">
					<label :for="field.name" class="ui label" :style="field.labelStyle">
						<h3>{{field.label}}</h3>
					</label>
				</template>
				<s-input v-slot:input="field" :name="field.name" v-model="field.value">
					<s-icon v-slot:prepend :icon="field.info || ''" />
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
				<s-select v-slot;input="field"
					v-model="field.value"
					:options="['Too much'].concat(field.schema.enum)" />
			</s-field>
			<s-field prop="light" label="Light" type="3clr" />
			<s-field prop="light" label="[repeated]" type="3clr" :edit="false" />
		</s-form>
		<div class="ui segment">
			<h1>Out of the form</h1>
			<div>
				<s-checkbox style="display: block;" v-model="model.big" label="model.big" />
				<s-input style="display: block;" v-model="model.firstName" />
				<s-select v-model="model.light" :options="['red', 'orange', 'green']" />
			</div>
			{{model}}
			<s-button style="display: block;" @click="reInit">Re-init</s-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Inject, Model, Prop, Watch, Emit } from 'vue-property-decorator'
import { Model as DataModel, Property, Integer, Enum, MinLength } from'ts-json-schema-decorator'
import mold3 from '../3clr/mold.vue'

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
	@Enum('red', 'orange', 'green') light: string
	@Property() deep: Deep
}

@Component({components:{mold3}})
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
			light: "",
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