<template>
	<ripper>
		<template slot="header">
			<slot name="header">
				{{header}}
			</slot>
		</template>
		<template slot="cell" scope="row">
			<slot name="cell" :row="row">
				{{value(row, property)}}
			</slot>
		</template>
	</ripper>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

@Component({components:{ripper: { render(h) { return h(); } }}})
export default class Column extends Vue {
	@Prop() render: (value: any)=> string
	@Prop() extract: (row: any)=> string
	@Prop({type:[Number, String]}) width: number|string
	@Prop() property: string
	@Prop() header: string
	value(row, property) {
		return this.extract ?
			this.extract(row) :
			this.render ?
			this.render(row[property]) :
			row[property];
	}
}
</script>