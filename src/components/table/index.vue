<template>
	<!--
		[vue-language-server] The template root requires exactly one element.
		This error is due to the fact some thead/tbody don't contain tr and some tr don't contain
		td/th - the compiler thinks these elements will appear outside of the <table>
	-->
	<table :class="[cls, {'scroll-body': !!bodyHeight}]">
		<thead ref="columns" style="display: none;">
			<slot />
		</thead>
		<thead v-if="isMounted && $slots.header">
			<tr>
				<td colspan="{{columns.length}}">
					<slot name="header"/>
				</td>
			</tr>
		</thead>
		<thead v-if="isMounted">
			<tr>
				<theader v-for="column in columns" :column="column" :key="ckey(column)" />
			</tr>
		</thead>
		<tbody v-if="isMounted" :style="{height: bodyHeight?bodyHeight+ 'px':undefined}">
			<tr
				v-for="(row, index) in rows"
				:key="rowId(row)"
				:class="[
					rowClass(row, index),
					{current: current === row}
				]"
				@click="$emit('current-change', row)"
			>
				<tcell v-for="column in columns" :column="column" :row="row" :index="index" :key="ckey(column)" />
			</tr>
		</tbody>
		<tfoot v-if="isMounted && $slots.footer">
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
	width: calc( 100% - 1em )
}
table tr.current {
	color: #111;
	background-color: #E0E0E0;/*
TODO: use theming
@activeColor: @textColor;
@activeBackgroundColor: #E0E0E0;*/
}
</style>
<script lang="ts">
//TODO: automatic __table_row_id generation when no ID is given
import * as Vue from 'vue'
import {Provide, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/classed'
import {idSpace} from 'lib/utils'

const tcell = {
	props: ['column', 'row'],
	render(h) {
		var clmn = this.column, data = clmn.data, style = data.staticStyle||{}, inst = clmn.componentInstance;
		if(inst.width) style.width = inst.width+'px';
		return h(
			'td', {class: data.staticClass, style},
			inst.$children[0].$scopedSlots.default({row: this.row, index: this.index})
		);
	}
}, theader = {
	props: ['column'],
	render(h) {
		var clmn = this.column, data = clmn.data, style = data.staticStyle||{}, inst = clmn.componentInstance;
		if(inst.width) style.width = inst.width+'px';
		return h(
			'th', {class: data.staticClass, style},
			inst.$children[0].$slots.header
		);
	}
};

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
	compact: Boolean,
}, {
	components: {tcell, theader}
})
export default class Table extends Vue {
	@Model('current-change') @Prop() current
	@Provide() table = this
	@Prop() rows: any[]
	@Prop() idProperty: string
	@Prop({default: ()=> ''}) rowClass : (any, number)=> string
	isMounted = false
	mounted() { this.isMounted = true; }
	private generateColumnId = idSpace('cn')
	@Prop({type: [Number, String]}) bodyHeight: number|string

	ckey(column) {
		return column._genUid || (column._genUid = this.generateColumnId())
	}
	get columns() {
		var rv = this.$slots.default
			.filter(x=>x.componentOptions)
			;	//filter columns only
		return rv;
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
}
</script>