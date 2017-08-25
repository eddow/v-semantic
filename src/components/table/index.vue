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
				:key="row[this.idProperty]"
				:class="[
					rowClass(row, index),
					{current: current === row}
				]"
				@click="$emit('current-change', row)"
			>
				<tcell v-for="column in columns" :column="column" :row="row" :key="ckey(column)" />
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
//TODO: automatic _table_row_id generation when no ID is given
import * as Vue from 'vue'
import {Provide, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/classed'

const tcell = {
	props: ['column', 'row'],
	render(h) {
		return h('td', this.column.componentInstance.$children[0].$scopedSlots.cell(this.row));
	}
}, theader = {
	props: ['column'],
	render(h) {
		return h('th', this.column.componentInstance.$children[0].$slots.header);
	}
};

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
	@Prop({default: '_id'}) idProperty: string
	@Prop({default: ()=> ''}) rowClass : (any, number)=> string
	isMounted = false
	mounted() { this.isMounted = true; }
	private columnCtr: number = 0
	@Prop({type: [Number, String]}) bodyHeight: number|string

	ckey(column) {
		return column._genUid || (column._genUid = ++this.columnCtr)
	}
	get columns() {
		var rv = this.$slots.default
			.filter(x=>x.componentOptions)
			;	//filter columns only
		return rv;
	}
}
</script>