<template>
	<!--
		[vue-language-server] The template root requires exactly one element.
		This error is due to the fact some thead/tbody don't contain tr and some tr don't contain
		td/th - the compiler thinks these elements will appear outside of the <table>
	-->
	<table :class="[cls, 'vued', {'scroll-body': !!bodyHeight}]">
		<pimp tag="thead" v-model="columns">
			<slot />
		</pimp>
		<thead v-if="$slots.header">
			<tr>
				<td colspan="{{columns.length}}">
					<slot name="header"/>
				</td>
			</tr>
		</thead>
		<thead>
			<tr>
				<ripped v-for="(column, uid) in columns" :key="uid"
					tag="th"
					:style="{width: column.width?column.width+'px':undefined}"
					template="header"
					:ripper="column"
				/>
			</tr>
		</thead>
		<tbody :style="{height: bodyHeight?bodyHeight+ 'px':undefined}">
			<tr
				v-for="(row, index) in rows"
				:key="rowId(row)"
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
				<td colspan="{{columns.length}}">
					<slot name="foot"/>
				</td>
			</tr>
		</tfoot>
	</table>
</template>
<style>
table.scroll-body tbody {
	display: block;
	overflow-y: scroll;
}
table.scroll-body thead, table.scroll-body tbody tr {
	display: table;
	width: 100%;
	table-layout: fixed;
}
table.scroll-body thead {
	width: calc( 100% - 0.71em )	/*TODO: real width management engine*/
}

table.ui.table.vued tbody tr {
	border: 1px solid transparent;
}
table.ui.table.vued tbody tr.current {
	border-color: #111;
	/*background-color: #E0E0E0;/*
TODO: use theming
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