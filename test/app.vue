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
			<s-button @click="blurred = !blurred">
				<s-icon icon="save" slot="prepend" />
				blurr
			</s-button>
			<s-button icon="plus" @click="loading = !loading">
				loading
			</s-button>
			<s-button @click="loading = !loading && 'loading!'">
				<s-icon icon="minus" slot="append" />
				loading text
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
			<s-checkbox label="Yes!" v-model="tchk" />
			--{{tchk}}--
		</div>
		<div>
			<s-dimmable blurring v-model="blurred" icon="heart" message="Dimmed Message!">
				<s-table
					celled
					selectable
					v-model="row"
					:rows="rows"
					very-basic
					:body-height="180"
				>
					<div slot="header">
						qwe
					</div>
					<s-column header="A">
						<template scope="scope">
							a{{scope.row.a}} <s-button>Tyup</s-button>
						</template>
					</s-column>
					<s-checkbox-column :selection="selection" width="55" />
					<s-column property="a" width="150">
						<template slot="header">
							B
						</template>
					</s-column>
				</s-table>
					--{{row}}::{{selection}}--
			</s-dimmable>
		</div>
		<div>
			<s-accordion styled v-loading.indeterminate="loading">
				<s-panel title="What is a dog?">
					<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
				</s-panel>
				<s-panel title="What kinds of dogs are there?">
					<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
				</s-panel>
			</s-accordion>
		</div>
		<div>
			<s-tabs position="top">
				<s-panel title="What is a dog?">
					<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
				</s-panel>
				<s-panel title="What kinds of dogs are there?">
					<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
				</s-panel>
				<s-panel title="And...">
					<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
				</s-panel>
			</s-tabs>
			<s-tabs position="bottom">
				<s-panel title="What is a dog?">
					<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
				</s-panel>
				<s-panel title="What kinds of dogs are there?">
					<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
				</s-panel>
				<s-panel title="And...">
					<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
				</s-panel>
			</s-tabs>
			<s-tabs position="left">
				<s-panel title="What is a dog?">
					<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
				</s-panel>
				<s-panel title="What kinds of dogs are there?">
					<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
				</s-panel>
				<s-panel title="And...">
					<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
				</s-panel>
			</s-tabs>
			<s-tabs position="right">
				<s-panel title="What is a dog?">
					<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
				</s-panel>
				<s-panel title="What kinds of dogs are there?">
					<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
				</s-panel>
				<s-panel title="And...">
					<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
				</s-panel>
			</s-tabs>
		</div>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

@Component
export default class App extends Vue {
	ddn = ''
	row = null
	rows = [{a:1},{a:3},{a:5}]
	selection = []
	tchk: boolean = true
	blurred: boolean = false
	loading: boolean = false
	testme() {
		console.log('test');
	}
}
</script>