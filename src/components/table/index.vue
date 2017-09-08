<template>
	<table :class="[cls, 'vued', {'scroll-body': !!bodyHeight}]">
		<caption is="pimp" v-model="columns">
			<slot />
		</caption>
		<caption v-if="$slots.header">
			<slot name="header"/>
		</caption>
		<thead class="vued">
			<tr class="vued">
				<th is="ripped" v-for="(column, uid) in columns" :key="uid"
					class="vued"
					:style="{width: column.width?column.width+'px':undefined}"
					template="header"
					:ripper="column"
				/>
			</tr>
		</thead>
		<tbody class="vued" :style="{height: bodyHeight?bodyHeight+ 'px':undefined}">
			<tr
				v-for="(row, index) in rows"
				:key="rowId(row)"
				class="vued"
				:class="[
					rowClass(row, index),
					{current: current === row}
				]"
				@click="rowClick(row)"
			>
				<td is="ripped" v-for="(column, uid) in columns" :key="uid"
					:style="{width: column.width?column.width+'px':undefined}"
					:ripper="column"
					:scope="{row, index}"
					:render="renderCell"
				/>
			</tr>
		</tbody>
		<tfoot v-if="$slots.footer" class="vued">
			<tr class="vued">
				<td :colspan="columns && columns.length" class="vued">
					<slot name="footer"/>
				</td>
			</tr>
		</tfoot>
	</table>
</template>
<style>
table.scroll-body tbody.vued {
	display: block;
	overflow-y: scroll;
}
table.scroll-body thead.vued, table.scroll-body tbody.vued tr.vued {
	display: table;
	width: 100%;
	table-layout: fixed;
}
table.scroll-body > thead.vued {
	width: calc( 100% - 0.71em );	/*TODO: real width management engine*/
}
table.ui.table.vued tbody.vued tr.vued.current > td {
	background: rgba(192,192,192,0.2);
/*TODO: use theming
@activeColor: @textColor;
@activeBackgroundColor: #E0E0E0;*/
}
tfoot.vued td.vued {
	padding: 0;
}
.ui.table tbody.vued td.vued.compound {
	padding: 0;
}
.ui.table tbody.vued td.vued.compound .ui.input {
	width: 100%;
}
.ui.table tbody.vued td.vued.compound .ui.input input {
	border: 0;
	background: transparent;
}
</style>
<script lang="ts">
import * as Vue from 'vue'
import {Provide, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/classed'
import {idSpace} from 'lib/utils'
import {Pimp, Ripped} from 'vue-ripper'
import Modeled from '../data/modeled'

const generateRowId = idSpace('rw');

//TODO: cell(th/td) css classes + selecteable cell + top/bottom/left/right/center aligned
@Semantic('table', {
	celled: Boolean,
	padded: Boolean,
	striped: Boolean,
	definition: Boolean,
	structured: Boolean,
	basic: Boolean,
	veryBasic: Boolean,
	collapsing: Boolean,
	singleLine: Boolean,
	fixed: Boolean,
	stackable: Boolean,
	unstackable: Boolean,
	selectable: Boolean,
	sortable: Boolean,
	compact: Boolean
}, {
	components: {Pimp, Ripped},
	mixins: [Modeled]
})
export default class Table extends Vue {
	@Model('row-click') @Prop() current
	@Provide() table = this
	@Prop() rows: any[]
	@Prop() idProperty: string
	@Prop({default: ()=> ''}) rowClass : (any, number)=> string
	@Prop({
		type: Function,
		default: (row, field)=> field.edit
	}) edition: (row: any, field: any)=> boolean
	columns = null
	@Prop({type: [Number, String]}) bodyHeight: number|string
	renderCell(h, slot) {
		var classes = ['vued'], compound = false, browser = slot;
		while(!compound && browser instanceof Array) {
			if(1!== browser.length) compound = true;
			browser = browser[0];
		}
		if(compound || browser.tag)
			classes.push('compound')
		return h('td', {class:classes}, slot);
	}
	rowId(row) {
		if(this.idProperty) {
			console.assert(
				row[this.idProperty],
				'Rows have initialised IDs when `idProperty` is given'
			)
			return row[this.idProperty];
		}
		if(!row.__table_row_id)
			Object.defineProperty(row, '__table_row_id', {
				value: generateRowId()
			});
		return row.__table_row_id;
	}
	@Emit('row-click') rowClick(row) {}
	invalidateScopes
	@Watch('rows', {deep: true}) rowsUpdate(rows) {
		this.invalidateScopes(rows);
		if(!~rows.indexOf(this.current))
			this.$emit('row-click', null);
	}
}

//This has to be available from v-semantic users => we cannot export from this file
Table.managedColumn = {
	props: {
		width: {type:[Number, String]},
		flex: {type:[Number, String]}	//TODO: use flex and make a real column-width management engine
	}
};
</script>