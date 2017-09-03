<template>
	<!--
		[vue-language-server] The template root requires exactly one element.
		This error is due to the fact some thead/tbody don't contain tr and some tr don't contain
		td/th - the compiler thinks these elements will appear outside of the <table>
	-->
	<table :class="[cls, 'vued', {'scroll-body': !!bodyHeight}]">
		<pimp tag="caption" v-model="columns">
			<slot />
		</pimp>
		<caption v-if="$slots.header">
			<slot name="header"/>
		</caption>
		<thead class="vued">
			<tr class="vued">
				<ripped v-for="(column, uid) in columns" :key="uid"
					tag="th"
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
				<ripped v-for="(column, uid) in columns" :key="uid"
					tag="td"
					:style="{width: column.width?column.width+'px':undefined}"
					:ripper="column"
					:scope="{row, index}"
				/>
			</tr>
		</tbody>
		<tfoot v-if="$slots.footer">
			<tr>
				<td :colspan="columns && columns.length">
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
	display: ta
}
table.ui.table.vued tbody.vued tr.vued.current td {
	background: linear-gradient(rgba(151,91,51,0.5), rgba(0,0,0,0.1), rgba(0,0,0,0.1), rgba(151,91,51,0.5));
/*TODO: use theming
@activeColor: @textColor;
@activeBackgroundColor: #E0E0E0;*/
}
</style>
<script lang="ts">
import * as Vue from 'vue'
import {Provide, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/classed'
import {idSpace} from 'lib/utils'
import {Pimp, Ripped} from 'vue-ripper'

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
	components: {Pimp, Ripped}
})
export default class Table extends Vue {
	@Model('row-click') @Prop() current
	@Provide() table = this
	@Prop() rows: any[]
	@Prop() idProperty: string
	@Prop({default: ()=> ''}) rowClass : (any, number)=> string
	columns = null
	@Prop({type: [Number, String]}) bodyHeight: number|string
//TODO: templates and lists in columns like in fields
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
	@Watch('rows', {deep: true}) rowsUpdate(rows) {
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