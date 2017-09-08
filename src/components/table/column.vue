<template>
	<ripper>
		<template slot="header">
			<slot name="header">
				{{header}}
			</slot>
		</template>
		<template scope="itr">
			<slot :model="itr.row" :index="itr.index">
				<slot v-if="edition(row)" name="input" :model="itr.row" :index="itr.index">
					<s-input type="text" v-model="scope(itr.row).value" />
				</slot>
				<slot v-else name="display" :model="itr.row" :index="itr.index">
					{{moldRender(value(itr.row))}}
				</slot>
			</slot>
		</template>
	</ripper>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import {Ripper} from 'vue-ripper'
import * as deep from 'lib/deep'
import Table from './index.vue'
import molded from '../data/molded'

@Component({
	components: {Ripper},
	mixins: [Table.managedColumn, molded(['header', 'display', 'input'])]
})
export default class Column extends Vue {
	@Prop() prop: string
	@Prop() header: string
	@Prop() edit: boolean
	
	//inherited
	invalidateScopes
	modeled

	@Watch('modeled.rows', {immediate:true, deep: true}) changeModel(rows) {
		this.invalidateScopes(rows);
	}
	created() {
		/*TODO: assertion
		console.assert(this.modeled && 'Table'=== this.modeled.constructor.name,
			'Columns cannot be used outside of a Table');*/
	}
	edition(row) {
		return this.modeled.edition(row, this);
	}
	value(row) {
		return deep.get(row, this.prop);
	}
	scope
	setValue(row, value) {
		return deep.set(row, this.prop, value);
	}
}
</script>