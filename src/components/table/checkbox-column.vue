<template>
	<ripper>
		<template slot="header">
			<slot name="header" :allSelected="allSelected" :setSelection="setSelection">
				<template v-if="header">{{header}}</template>
				<checkbox v-else v-model="allSelected" @input="selectAll" state3 />
			</slot>
		</template>
		<template scope="scope">
			<slot :row="scope.row" :checked="scope.row[property]" :select="select" :unselect="unselect" :toggle="toggle">
				<checkbox :checked="scope.row[property]" @checked="select(scope.row)" @unchecked="unselect(scope.row)" />
			</slot>
		</template>
	</ripper>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import column from './column.vue'
import checkbox from '../checkbox.vue'
import {Ripper} from 'vue-ripper'
import table from './index.vue'

@Component({
	components: {Ripper, checkbox},
	mixins: [table.managedColumn]
})
export default class CheckboxColumn extends Vue {
	@Inject() table
	@Prop({default: 'selected'}) property: string
	@Prop() header: string
	defaultv: boolean = null
	
	allSelected: boolean = false
	@Model('selection-change',{type:[Boolean,Array]}) selection

	setRow(row, checked) {
		var hideProp = !(this.property in row);
		Vue.set(row, this.property, checked);
		if(hideProp)
			Object.defineProperty(row, this.property, {
				...Object.getOwnPropertyDescriptor(row, this.property),
				enumerable: false
			});
	}

	@Watch('table.rows', {deep: true/*, immediate: true*/})
	//We don't use `immediate` because the `selection` will be initiated (by `:selection` or `v-model`)
	rowsChanged(rows) {
		this.setSelection(rows.filter(x=> {
			if(null!== this.defaultv && !(this.property in x))
				this.setRow(x, this.defaultv);
			return x[this.property];
		}));
	}

	@Watch('selection', {immediate: true}) 
	setSelection(selection) {
		if(!selection || true=== selection) {
			this.selectAll(this.defaultv = this.allSelected = !!selection);
		} else if(selection instanceof Array) {
			if(selection === this.table.rows) {
				this.defaultv = true;
				this.$emit('selection-change', [].concat(selection));
			}
			else if(selection !== this.selection)
				//this case happens when `setSelection` is called from the header slot or from `rowsChanged`
				this.$emit('selection-change', selection);
			for(let row of this.table.rows)
				this.setRow(row, !!~selection.indexOf(row));
		}
		else throw new Error('Unexpected selection specification');
	}

	selectAll(checked?: boolean) {
		if('boolean'=== typeof checked) {
			for(let row of this.table.rows)
				this.setRow(row, checked);
			let selection = this.selection;
			if(!(selection instanceof Array))
				this.$emit('selection-change', selection = []);
			selection.splice(0, selection.length, ...(checked?this.table.rows:[]));
		}
	}	
	
	computeAll() {
		this.allSelected =
			0=== this.table.rows.length ? this.defaultv :
			0=== this.selection.length ? false :
			this.table.rows.length === this.selection.length ?
				true : null;
		this.$emit('selection-change', this.selection);
	}

	select(row) {
		if(this.selection) console.assert(!~this.selection.indexOf(row), 'A row cannot be selected twice');
		if(this.$cancelable('select', row)) {
			this.setRow(row, true);
			if(this.selection) this.selection.push(row);
			this.computeAll();
		}
	}
	unselect(row) {
		var index = this.selection && this.selection.indexOf(row);
		if(this.selection) console.assert(!!~index, 'An unselected row cannot be unselected');
		
		if(this.$cancelable('unselect', row)) {
			this.setRow(row, true);
			if(this.selection) this.selection.splice(index, 1);
			this.computeAll();
		}
	}
	toggle(row) {
		return row[this.property] ? this.unselect(row) : this.select(row);
	}
	rowClick(row) {
		console.log('click!');
	}
}
</script>