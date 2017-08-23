<template>
	<div>
		<div ref="columns" style="display: none;">
			<slot />
		</div>
		<table v-if="isMounted">
			<thead>
				<tr>
					<theader v-for="(column, ndx) in columns" :column="column" :key="ndx" />
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in rows" :key="getId(row)">
					<!-- column.componentInstance._uid -->
					<tcell v-for="(column, ndx) in columns" :column="column" :row="row" :key="ndx" />
				</tr>
			</tbody>
			<tfoot>
				<slot name="foot"/>
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

@Component({components:{tcell, theader}})
export default class Table extends Vue {
	@Provide() table = this
	@Prop()
	rows: any[]
	@Prop({default: null}) idOf: (any)=> string
	@Prop({default: '_id'})
	idProperty: string
	
	isMounted = false
	mounted() { this.isMounted = true; }
	getId(row) {
		return this.idOf ? this.idOf(row) : row[this.idProperty];
	}
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