<template>
	<div>
		<div>
			<su-button>
				<su-icon icon="save" slot="prepend" />
				button-l
			</su-button>
			<su-button icon="plus">
				button-i
			</su-button>
			<su-button>
				<su-icon icon="minus" slot="append" />
				button-r
			</su-button>
			<su-button>
				<su-icon icon="add circle" />
			</su-button>
			<su-button icon="add square" />
		</div>
		<div>
			<su-input>
				<su-icon slot="prepend" circular link icon="search" @click="testme" />
				<su-select action="nothing" class="label" slot="prepend" v-model="ddn" text="Gender" on="hover">
					<su-option value="M">Male</su-option>
					<su-option value="F">Female</su-option>
				</su-select>
			</su-input>
			--{{ddn}}--
	</div>
	<div>
		<su-table :rows="rows">
			<div slot="header">
				qwe
			</div>
			<su-column header="A">
				<template slot="cell" scope="scope">
					a{{a(scope.row)}}
				</template>
			</su-column>
			<su-column property="a">
				<template slot="header">
					B
				</template>
			</su-column>
		</su-table>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'

@Component
export default class App extends Vue {
	ddn = ''
	rows = [{a:1},{a:3},{a:5}]
	a(row) {
		return row.a;
	}
	testme() {
		console.log('test');
	}
}
</script>