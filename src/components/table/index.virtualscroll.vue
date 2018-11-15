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
			ref="body"
			@scroll="scrolled"
			:style="bodyStyle"
			v-resize="computeRowHeight"
		>
			<tr v-if="heightKeeper" :style="heightKeeper.before" class="vued filler"></tr>
			<tr
				ref="displayedRows"
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
			<tr v-if="heightKeeper" :style="heightKeeper.after" class="vued filler"></tr>
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
tr.vued.filler {
	padding: 0 !important;
	border: 0 !important;
	margin: 0 !important;
}
</style>
<script lang="ts">
import Vue from 'vue'
import {Provide, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/classed'
import {idSpace} from 'lib/utils'
import {Pimp, Ripped} from 'vue-ripper'
import Modeled from '../data/modeled'
import * as resize from 'vue-resize-directive'

const generateRowId = idSpace('rw'), defaultRowHeight = 42;

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
	mixins: [(<any>Modeled).extendOptions],
	directives: {resize}
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
	displayedRows = 10
	computedRowHeight = null
	computeRowHeight() {
		if(this.rowHeight) return;
	//TODO: call this on resize
		var calc = this.rowPos();
		if(!calc) return;
		var {pos, top, last, bottom} = calc;
		var newRowHeight = Math.round((bottom-top)/pos.length);
		if(this.computedRowHeight !== newRowHeight) {
			//The average row-height is re-calculated, so the fillers (before and after will be resized),
			// so the scroll-top has to be re-specified to remain on the first displayed row
			var log = {
				scroll: this.bodyScrollTop,
				avgRowHeight:this.avgRowHeight};
			/*this.forceBodyScrollTop = this.bodyScrollTop =
				Math.round(((this.bodyScrollTop + top) * newRowHeight/(this.computedRowHeight||defaultRowHeight))-top);*/
			this.computedRowHeight = newRowHeight;
			
			console.log(top, log, {
				scroll: this.bodyScrollTop,
				avgRowHeight:this.avgRowHeight})
			
		}
		return this.computedRowHeight;
	}
	get avgRowHeight() : number {
		return Number(this.rowHeight) || this.computedRowHeight || this.computeRowHeight() || defaultRowHeight;
	}
	get bodyStyle() {
		if(this.bodyHeight) {
			return {
				height: this.bodyHeight+ 'px'
			}
		}
	}
	get heightKeeper() {
		if(this.bodyHeight) console.log(
			this.avgRowHeight*this.visibleIndexes.from + 'px',
			this.avgRowHeight*Math.max(0, this.rows.length-this.visibleIndexes.to) + 'px'
		);
		return this.bodyHeight ? {
			before: {height: this.avgRowHeight*this.visibleIndexes.from + 'px'},
			after: {height: this.avgRowHeight*Math.max(0, this.rows.length-this.visibleIndexes.to) + 'px'}
		} : null;
	}
	mounted() {
		this.computeDisplayedRows();
		var x = this.$refs.body;
	}
	updated() {
		//console.log('width', $(this.$refs.body).width());
		if('forceBodyScrollTop' in this) {
			console.log('force', this.forceBodyScrollTop);
			$(this.$refs.body).scrollTop(this.bodyScrollTop = this.forceBodyScrollTop);
			delete this.forceBodyScrollTop;
		}
		this.computeDisplayedRows();
	}
	rowPos() {
		var rows = <HTMLTableRowElement[]>this.$refs.displayedRows;
		if(!this.bodyHeight || !rows || !rows.length || !this.$refs.body)
			return;
		var bodyTop = $(this.$refs.body).position().top,
			pos = rows.map(x=> {
				var el = $(x);
				return {
					top: el.position().top-bodyTop,
					height: el.height()
				}
			});
		if(1>= pos[0].height) return;	//So small, it just means it is not displayed
		pos.sort((x,y)=>x.top-y.top);
		var top = pos[0].top, last = pos[pos.length-1], bottom = last.top + last.height;
		if(top > this.bodyHeight || bottom < 0) return;	//It just got updated half : further updates are coming
		return {pos, top, last, bottom};
	}
	computeDisplayedRows() {
		var calc = this.rowPos();
		if(!calc) return;
		var {pos, top, last, bottom} = calc;
		
		//remove rows after the bottom
		while(last.top > this.bodyHeight) {
			pos.pop();
			last = pos[pos.length-1];
		}
		//re-init displayed-rows (diminished or not, this is useful for both cases)
		this.displayedRows = pos.length;
		//add rows if there is an empty gap
		var emptyGap = Number(this.bodyHeight) - (last.top+last.height);
		if(0< emptyGap)
			this.displayedRows += Math.ceil(emptyGap/this.avgRowHeight);

	}
	forceBodyScrollTop
	scrolled() {
		this.bodyScrollTop = $(this.$refs.body).scrollTop();
		console.log('scroll', this.bodyScrollTop);
		this.computeDisplayedRows();
	}
	bodyScrollTop = 0
	get visibleIndexes() {
		if(this.bodyHeight) {
			var from = //Math.min(
				this.avgRowHeight && Math.floor(this.bodyScrollTop/this.avgRowHeight) || 0/*,
				this.$refs.displayedRows ? this.$refs.displayedRows.length-this.displayedRows+1 : 0
			);*/
			console.log('indexes', from, from+this.displayedRows);
			return {from, to: from+this.displayedRows};
		}
		return {from: 0, to: this.rows.length};
	}
	get visibleRows() {
		return this.visibleIndexes ? 
			this.rows.slice(this.visibleIndexes.from, this.visibleIndexes.to) :
			this.rows;
	}
	get widthClass() {
		return ['vued', this.bodyHeight ? 'paddingSBright' : ''];
	}
}
//TODO: `v-resize="computeRowHeight"` creates a `div` in the `tbody`... :-/
</script>