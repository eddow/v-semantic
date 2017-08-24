<template>
	<div>
		<div>
			<s-modal v-model="modal1" closable header="">
				Blah Blah
				<s-button v-modal:cancel>Cancel</s-button>
				<s-button v-modal:ok>Ok</s-button>
			</s-modal>
			<s-button @click="modal1()">
				modal
			</s-button>
			<s-button>
				<s-icon icon="save" slot="prepend" />
				button-l
			</s-button>
			<s-button icon="plus">
				button-i
			</s-button>
			<s-button>
				<s-icon icon="minus" slot="append" />
				button-r
			</s-button>
			<s-button>
				<s-icon icon="add circle" />
			</s-button>
			<s-button icon="add square" />
		</div>
		<div>
			<s-input>
				<s-icon slot="prepend" circular link icon="search" @click="testme" />
				<s-select class="label" slot="append" v-model="ddn" text="Gender" on="hover">
					<s-option value="M">Male</s-option>
					<s-option value="F">Female</s-option>
				</s-select>
			</s-input>
			--{{ddn}}--
			<s-select inline action="select" v-model="ddn" text="Gender" on="hover">
				<s-option value="M">Male</s-option>
				<s-option value="F">Female</s-option>
			</s-select>
	</div>
	<div>
		<s-table :rows="rows" very-basic>
			<div slot="header">
				qwe
			</div>
			<s-column header="A">
				<template slot="cell" scope="scope">
					a{{scope.row.a}}
				</template>
			</s-column>
			<s-column property="a">
				<template slot="header">
					B
				</template>
			</s-column>
		</s-table>
		<s-accordion styled>
			<s-bellow title="What is a dog?">
    		<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
			</s-bellow>

			<s-bellow title="What kinds of dogs are there?">
		    <p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
			</s-bellow>
		</s-accordion>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

@Component
export default class App extends Vue {
	ddn = ''
	rows = [{a:1},{a:3},{a:5}]
	testme() {
		console.log('test');
	}
}
</script>