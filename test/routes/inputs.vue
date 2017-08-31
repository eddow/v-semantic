<template>
	<div>
		<s-input>
			<s-icon slot="prepend" circular link icon="search" @click="testme" />
			<s-select class="label" slot="append" v-model="ddn" text="Gender" on="hover">
				<s-option value="M">Male</s-option>
				<s-option value="F">Female</s-option>
			</s-select>
		</s-input>
		<div>
			<label>Drop down:</label>
			{{ddn}}
		</div>
		<s-select style="display: block;" inline action="select" v-model="ddn" text="Gender" on="hover">
			<s-option value="M">Male</s-option>
			<s-option value="F">Female</s-option>
		</s-select>
		<s-checkbox label="Yes!" v-model="tchk" />
		<div>
			<label>Checked:</label>
			{{tchk}}
		</div>
	</div>
</template>
<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

@Component
export default class Inputs extends Vue {
	ddn = ''
	tchk: boolean = true
	testme() {
		console.log('icon click');
	}
}
</script>