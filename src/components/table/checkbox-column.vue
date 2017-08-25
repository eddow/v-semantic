<template>
	<column>
		<template slot="header">
			<slot name="header">
				<template v-if="header">{{header}}</template>
				<checkbox v-else v-model="allSelected" @input="selectAll" state3 />
			</slot>
		</template>
		<template scope="scope">
			<checkbox :checked="scope.row[property]" @checked="select(scope.row)" @unchecked="unselect(scope.row)" />
		</template>
	</column>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import column from './column.vue'
import checkbox from '../checkbox.vue'

@Component({components:{column, checkbox}})
export default class CheckboxColumn extends Vue {
	@Inject() table
	@Prop({default: 'selected'}) property: string
	@Prop() header: string
	
	allSelected: boolean = false
	@Model('selection-change',{type:[Boolean,Array]}) selection

	@Watch('selection') 
	setSelection(selection) {
		if(!selection || true=== selection)
			this.selectAll(this.allSelected = !!selection);
		else if(selection instanceof Array)
			for(let row in this.table.rows)
				Vue.set(row, this.property, !!~selection.indexOf(row));
		else throw new Error('Unexpected selection specification');
	}

	selectAll(checked?: boolean) {
		if('boolean'=== typeof checked) {
			for(let row of this.table.rows)
				Vue.set(row, this.property, checked);
			let selection = this.selection instanceof Array ? this.selection : [];
			selection.length = 0;
			if(checked) selection.push(...this.table.rows);
			this.$emit('selection-change', selection);
		}
	}	
	
	computeAll() {
		this.allSelected = 0=== this.selection.length ? false :
			this.table.rows.length === this.selection.length ?
				true : null;
		this.$emit('selection-change', this.selection);
	}

	select(row) {
		if(this.selection) console.assert(!~this.selection.indexOf(row), 'A row cannot be selected twice');
		if(this.$cancelable('select', row)) {
			Vue.set(row, this.property, true);
			if(this.selection) this.selection.push(row);
			this.computeAll();
		}
	}
	unselect(row) {
		var index = this.selection && this.selection.indexOf(row);
		if(this.selection) console.assert(!!~index, 'An unselected row cannot be unselected');
		
		if(this.$cancelable('unselect', row)) {
			Vue.set(row, this.property, true);
			if(this.selection) this.selection.splice(index, 1);
			this.computeAll();
		}
	}
	rowClick(row) {
		console.log('click!');
	}
}
</script>