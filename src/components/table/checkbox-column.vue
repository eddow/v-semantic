<template>
	<ripper>
		<template slot="header">
			<slot name="header" :allSelected="allSelected" :setSelection="setSelection">
				<template v-if="header">{{header}}</template>
				<checkbox v-else v-model="allSelected" @input="selectAll" state3 />
			</slot>
		</template>
		<template slot-scope="scope">
			<slot :model="scope.row" :checked="scope.row[prop]" :select="select" :unselect="unselect" :toggle="toggle">
				<checkbox :checked="scope.row[prop]" @checked="select(scope.row)" @unchecked="unselect(scope.row)" />
			</slot>
		</template>
	</ripper>
</template>

<script lang="ts">
import Vue from 'vue'
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
	@Inject() modeled
	@Prop({default: 'selected'}) prop: string
	@Prop() header: string
	@Prop({type:[Number, String], default: 29}) width
	defaultv: boolean = null
	
	allSelected: boolean = false
	@Model('selection-change',{type:[Boolean,Array]}) selection

	setRow(row, checked) {
		var hideProp = !(this.prop in row);
		Vue.set(row, this.prop, checked);
		if(hideProp)
			Object.defineProperty(row, this.prop, {
				...Object.getOwnPropertyDescriptor(row, this.prop),
				enumerable: false
			});
	}

	@Watch('modeled.rows', {deep: true/*, immediate: true*/})
	//We don't use `immediate` because the `selection` will be initiated (by `:selection` or `v-model`)
	rowsChanged(rows) {
		this.setSelection(rows.filter(x=> {
			if(null!== this.defaultv && !(this.prop in x))
				this.setRow(x, this.defaultv);
			return x[this.prop];
		}));
	}

	@Watch('selection', {immediate: true}) 
	setSelection(selection) {
		if(!selection || true=== selection) {
			this.selectAll(this.defaultv = this.allSelected = !!selection);
		} else if(selection instanceof Array) {
			if(selection === this.modeled.rows) {
				this.defaultv = true;
				this.$emit('selection-change', [].concat(selection));
			}
			else if(selection !== this.selection)
				//this case happens when `setSelection` is called from the header slot or from `rowsChanged`
				this.$emit('selection-change', selection);
			for(let row of this.modeled.rows)
				this.setRow(row, !!~selection.indexOf(row));
			this.computeAll();
		}
		else throw new Error('Unexpected selection specification');
	}

	selectAll(checked?: boolean) {
		if('boolean'=== typeof checked) {
			for(let row of this.modeled.rows)
				this.setRow(row, checked);
			let selection = this.selection;
			if(!(selection instanceof Array))
				this.$emit('selection-change', selection = []);
			selection.splice(0, selection.length, ...(checked?this.modeled.rows:[]));
		}
	}	
	
	computeAll() {
		this.allSelected =
			0=== this.modeled.rows.length ? this.defaultv :
			0=== this.selection.length ? false :
			this.modeled.rows.length === this.selection.length ?
				true : null;
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
		return row[this.prop] ? this.unselect(row) : this.select(row);
	}
	rowClick(row) {
		console.log('click!');
	}
}
</script>