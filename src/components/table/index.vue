<template>
	<table :class="[cls, 'vued', {'scroll-body': !!bodyHeight}]">
		<caption is="pimp" v-model="pimped">
			<slot />
		</caption>
		<caption v-if="$slots.header" :class="widthClass">
			<slot name="header"/>
		</caption>
		<thead :class="widthClass">
			<tr class="vued">
				<th is="ripped" v-for="(column, uid) in columns" :key="uid"
					class="vued"
					:style="{width: column.width?column.width+'px':undefined}"
					template="header"
					:ripper="column"
				/>
			</tr>
		</thead>
		<tbody class="vued"
			@scroll="bodyScrollTop = $event.target.scrollTop"
			:style="{height: bodyHeight?bodyHeight+ 'px':undefined}"
		>
			<tr v-if="heightKeeper()" :style="heightKeeper(true)">
			</tr>
			<tr
				v-for="(row, index) in visibleRows"
				:key="rowId(row)"
				class="vued"
				:class="[
					rowClass(row, index+visibleIndexes.from),
					{current: current === row}
				]"
				@click="rowClick(row)"
			>
				<td is="ripped" v-for="(column, uid) in columns" :key="uid"
					:style="{width: column.width?column.width+'px':undefined}"
					:ripper="column"
					:scope="{row, index: index+visibleIndexes.from}"
					:render="renderCell"
				/>
			</tr>
			<tr v-if="heightKeeper()" :style="heightKeeper(false)">
			</tr>
		</tbody>
		<tfoot v-if="$slots.footer" :class="widthClass">
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
	mixins: [Modeled.extendOptions]
})
export default class Table extends Vue {
	@Model('row-click') @Prop() current
	@Prop() rows: any[]
	@Prop() idProperty: string
	@Prop({default: ()=> ''}) rowClass : (any, number)=> string
	editionManagers = []
	edition(row: any, field: any) {
		var e = field.edit;
		for(let em of this.editionManagers)
			e = em(row, field, e);
		return e;
	}
	pimped = null
	get columns() {
		// In order for tables to be molded, data-molds are added in the default slot.
		// These data-mold need to be filtered out to gather only the columns to display 
		var rv = Object.create({}, {
			length: {
				value: 0,
				writable: true
			}
		}), pimped = this.pimped;
		if(!pimped || !pimped.length) return pimped;
		for(let i in pimped)
			if(pimped[i].isColumn) {
				rv[i] = pimped[i];
				++rv.length;
			}
		return rv;
	}
	@Prop({type: [Number, String]}) bodyHeight: number|string
	@Prop({type: [Number, String]}) rowHeight: number|string
	renderCell(h, slot) {
		var classes = ['vued'], compound = false, browser = slot;
		while(!compound && browser instanceof Array) {
			if(1!== browser.length) compound = true;
			browser = browser[0];
		}
		if(compound || (browser && browser.tag))
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
		if(this.current && !~rows.indexOf(this.current)) {
			var newSelect = null;
			if(this.idProperty) {
				let selId = this.current[this.idProperty];
				newSelect = rows.find(x=> x[this.idProperty] === selId) || null;
			}
			this.$emit('row-click', newSelect);
		}
	}
	heightKeeper(pos?) {
		if(this.rowHeight && this.bodyHeight)
			return {
				height: pos?
					Number(this.rowHeight)*this.visibleIndexes.from + 'px' :
					Number(this.rowHeight)*Math.max(0, this.rows.length-this.visibleIndexes.to) + 'px'
			};
	}
	bodyScrollTop = 0
	visibleIndexes = {from: 0, to: 0}
	get visibleRows() {
		if(this.rowHeight && this.bodyHeight) {
			this.visibleIndexes = {
				from: Math.floor(this.bodyScrollTop/Number(this.rowHeight)),
				to: Math.ceil((this.bodyScrollTop+Number(this.bodyHeight))/Number(this.rowHeight))
			};
			//console.log(indexes.from, indexes.to);
			return this.rows.slice(this.visibleIndexes.from, this.visibleIndexes.to);
		}
		return this.rows;
	}
	get widthClass() {
		return ['vued', this.bodyHeight ? 'paddingSBright' : ''];
	}
}

//This has to be available from v-semantic users => we cannot export from this file
Table.managedColumn = {
	props: {
		width: {type:[Number, String]},
		flex: {type:[Number, String]}	//TODO: use flex and make a real column-width management engine
	},
	data: ()=> ({isColumn: true})
};
</script>