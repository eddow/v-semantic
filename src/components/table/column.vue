<template>
	<ripper>
		<template slot="header">
			<slot name="header">
				{{header}}
			</slot>
		</template>
		<template scope="scope">
			<slot :row="scope.row" :index="scope.index">
				{{value(scope.row, property)}}
			</slot>
		</template>
	</ripper>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import {Ripper} from 'vue-ripper'
import table from './index.vue'

@Component({
	components: {Ripper},
	mixins: [table.managedColumn]
})
export default class Column extends Vue {
	@Prop() render: (value: any)=> string
	@Prop() extract: (row: any)=> string
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