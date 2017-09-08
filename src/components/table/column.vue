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
import molded from '../data/molded'

@Component({
	components: {Ripper},
	mixins: [table.managedColumn, molded(['header', 'cell'])]
})
export default class Column extends Vue {
	@Prop() prop: string
	@Prop() header: string
	
	invalidateScopes
	@Watch('modeled.rows', {immediate:true, deep: true}) changeModel(rows) {
		this.invalidateScopes(rows);
	}
	get path() { return deep.path(this.prop); }
	value(row) {
		return deep.get(row, this.prop);
	}
}
</script>