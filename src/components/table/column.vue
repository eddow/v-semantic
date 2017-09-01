<template>
	<ripper>
		<template slot="header">
			<slot name="header">
				{{header}}
			</slot>
		</template>
		<template scope="scope">
			<slot :row="scope.row" :index="scope.index" :value="value(scope.row)" :input="value=> input(scope.row, value)">
				{{value(scope.row)}}
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

@Component({
	components: {Ripper},
	mixins: [table.managedColumn]
})
export default class Column extends Vue {
	@Prop() render: (value: any)=> string
	@Prop() extract: (row: any)=> string
	@Prop() property: string
	@Prop() header: string
	
	input(row, value) {
		if(!deep.set(row, this.property, value))
			throw new Error('Unable to bind back the given value.');
	}
	get path() { return deep.path(this.property); }
	value(row) {
		return this.extract ?
			this.extract(row) :
			this.render ?
			this.render(deep.get(row, this.property)) :
			deep.get(row, this.property);
	}
}
</script>