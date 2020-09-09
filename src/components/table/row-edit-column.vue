<template>
	<ripper>
		<template v-slot:header>
			<slot name="header">
				<template v-if="header">{{header}}</template>
			</slot>
		</template>
		<template slot-scope="scope">
			<slot :row="scope.row"
				:edit="()=> editRow(scope.row)"
				:remove="()=> removeRow(scope.row)"
				:save="()=> saveRow(scope.row)"
				:cancel="()=> cancelRow(scope.row)"
				:editing="editing(scope.row)"
			>
				<slot name="editing" v-if="editing(scope.row)" :row="scope.row"
					:save="()=> saveRow(scope.row)"
					:cancel="()=> cancelRow(scope.row)"
				>
					<s-button :icon="saveIcon" :disabled="unsavable(scope.row)" positive @click="saveRow(scope.row)" />
					<s-button :icon="cancelIcon" class="orange" @click="cancelRow(scope.row)" />
				</slot>
				<slot name="displaying" v-else :row="scope.row"
					:edit="()=> editRow(scope.row)"
					:remove="()=> removeRow(scope.row)"
				>
					<s-button :icon="editIcon" class="blue" @click="editRow(scope.row)" />
					<s-button :icon="removeIcon" negative @click="removeRow(scope.row)" />
				</slot>
			</slot>
		</template>
	</ripper>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Inject, Prop, Watch} from 'vue-property-decorator'
import sButton from '../button.vue'
import {Ripper} from 'vue-ripper'
import table from './index.vue'
import { VueSemantic } from 'lib/module'

@Component({
	components: {Ripper, sButton},
	mixins: [table.managedColumn]
})
export default class RowEditColumn extends VueSemantic {
	@Inject() modeled
	@Prop() header: string
	@Prop() prop: string
	@Prop({type:[Number, String], default: 90}) width
	@Prop({type: Function}) hasChanges: (row: any)=> boolean

	@Prop({default: 'checkmark'}) saveIcon: string
	@Prop({default: 'remove'}) cancelIcon: string
	@Prop({default: 'edit'}) editIcon: string
	@Prop({default: 'trash'}) removeIcon: string

	@Prop({type: Array, default: ()=>[]}) editingRows
	savedState = []
	
	setEditing(row, editing) {
		if(this.prop) {
			var hideProp = !(this.prop in row);
			Vue.util.defineReactive(row, this.prop, editing);
			if(hideProp)
				Object.defineProperty(row, this.prop, {
					...Object.getOwnPropertyDescriptor(row, this.prop),
					enumerable: false
				});
		}
	}

	@Watch('modeled.rows', {deep: true})
	rowsChanged(rows) {
		for(let i=0; i<this.editingRows.length;) {
			let ndx = rows.indexOf(this.editingRows[i]);
			if(~ndx) ++i;
			else {
				this.$emit('cancel', this.editingRows[i], this.savedState[i]);
				this.setEditing(this.editingRows[i], true);
				this.editingRows.splice(i, 1);
				this.savedState.splice(i, 1);
			}
		}
	}

	mounted() {
		console.assert(this.modeled.editionManagers,
			"Edit-columns must be inside a Table");
		this.modeled.editionManagers.push(this.isEdited);
	}
	destroyed() {
		var ndx = this.modeled.editionManagers.indexOf(this.isEdited);
		if(~ndx) this.modeled.editionManagers.splice(ndx, 1);
	}
	isEdited(row, field, e) {
		return e && ~this.editingRows.indexOf(row);
	}
	cancelableAction(name: string, params: any[], action: ()=> void) {
		if(this.$cancelable(name, ...params, action))
			action();
	}
	editRow(row) {
		var stateSave = Object.create(row.constructor.prototype);
		this.cancelableAction('edit', [row, stateSave], ()=> {
			this.setEditing(row, true);
			this.editingRows.push(row);
			this.savedState.push(stateSave);
		});
	}
	saveRow(row) {
		var ndx = this.editingRows.indexOf(row);
		console.assert(!!~ndx, 'Saved row is edited');
		this.cancelableAction('save', [row, this.savedState[ndx]], ()=> {
			this.setEditing(row, false);
			this.editingRows.splice(ndx, 1);
			this.savedState.splice(ndx, 1);
		});
	}
	cancelRow(row) {
		var ndx = this.editingRows.indexOf(row);
		console.assert(!!~ndx, 'Canceled row is edited');
		this.cancelableAction('cancel', [row, this.savedState[ndx]], ()=> {
			this.setEditing(row, false);
			this.editingRows.splice(ndx, 1);
			this.savedState.splice(ndx, 1);
		});
	}
	removeRow(row) {
		var ndx = this.modeled.rows.indexOf(row);
		console.assert(!!~ndx, 'Removed row is in the table rows');
		this.cancelableAction('remove', [row], ()=> {
			this.modeled.rows.splice(ndx, 1);
		});
	}
	editing(row) {
		return !!~this.editingRows.indexOf(row);
	}
	unsavable(row) {
		//TODO: manage validation
		return this.hasChanges && !this.hasChanges(row);
	}
}
</script>