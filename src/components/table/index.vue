<template>
	<div>
		<div ref="columns" style="display: none;">
			<slot />
		</div>
		<table v-if="isMounted" class="ui celled table">
			<thead v-if="$slots.header">
				<tr>
					<td colspan="{{columns.length}}">
						<slot name="header"/>
					</td>
				</tr>
			</thead>
			<thead>
				<tr>
					<theader v-for="column in columns" :column="column" :key="ckey(column)" />
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in rows" :key="getId(row)" :class="rowClass(row)">
					<!-- column.componentInstance._uid -->
					<tcell v-for="column in columns" :column="column" :row="row" :key="ckey(column)" />
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
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Provide, Inject, Model, Prop, Watch} from 'vue-property-decorator'

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


//TODO: cell(th/td) css classes
@Component({components:{tcell, theader}})
export default class Table extends Vue {
	@Provide() table = this
	@Prop()
	rows: any[]
	@Prop({default: null}) idOf: (any)=> string
	@Prop({default: '_id'})
	idProperty: string
	@Prop({default: ()=> ''}) rowClass : (any)=> string
	isMounted = false
	mounted() { this.isMounted = true; }
	getId(row) {
		return this.idOf ? this.idOf(row) : row[this.idProperty];
	}
	ckey(column) {
		return column._genUid || (column._genUid = ++this.columnCtr)
	}
	columnCtr: number = 0
	get columns() {
		var rv = this.$slots.default
			.filter(x=>x.componentOptions)
			;	//filter columns only
		return rv;
	}
	updateColumn(column) {
		//debugger;
	}
}
</script>