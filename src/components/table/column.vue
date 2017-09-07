<template>
	<ripper>
		<template slot="header">
			<slot name="header">
				{{header}}
			</slot>
		</template>
		<template scope="scope">
			<slot :model="scope.row" :index="scope.index">
				{{moldRender(value(scope.row))}}
			</slot>
		</template>
	</ripper>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import {Ripper} from 'vue-ripper'
import * as deep from 'lib/deep'
import table from './index.vue'
import Property from '../data/property'

@Component({
	components: {Ripper},
	mixins: [table.managedColumn, Property]
})
export default class Column extends Vue {
	@Prop() render: (value: any)=> string
	@Prop() extract: (row: any)=> string
	@Prop() prop: string
	@Prop() header: string
	
	get path() { return deep.path(this.prop); }
	value(row) {
		return this.extract ?
			this.extract(row) :
			this.render ?
			this.render(deep.get(row, this.prop)) :
			deep.get(row, this.prop);
	}
}
</script>