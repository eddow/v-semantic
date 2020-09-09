<template>
	<ripper>
		<template v-slot:header>
			<slot name="header">
				{{header}}
			</slot>
		</template>
		<template slot-scope="itr">
			<slot name="cell" :model="itr.row" :index="itr.index" :field="scope(itr.row)" :edition="edition(itr.row)">
				<slot v-if="edition(itr.row)" name="cell-input" :model="itr.row" :index="itr.index" :field="scope(itr.row)">
					<slot name="input" :model="itr.row" :index="itr.index" :field="scope(itr.row)">
						<s-input type="text" v-model="scope(itr.row).value" />
					</slot>
				</slot>
				<slot v-else name="cell-display" :model="itr.row" :index="itr.index">
					<slot name="display" :model="itr.row" :index="itr.index">
						{{moldRender(value(itr.row))}}
					</slot>
				</slot>
			</slot>
		</template>
	</ripper>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Watch} from 'vue-property-decorator'
import {Ripper} from 'vue-ripper'
import * as deep from 'lib/deep'
import Table from './index.vue'
import molded from '../data/molded'

@Component({
	components: {Ripper},
	mixins: [Table.managedColumn, molded(['header', 'display', 'input', 'cell', 'cell-input', 'cell-display'])]
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