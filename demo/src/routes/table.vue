<template>
	<div>
		<s-table
			celled
			selectable
			v-model="my_row"
			:rows="my_rows"
			very-basic
			:body-height="500"
		>
			<mold3 />
			<template v-slot:header>
				<div>
					In-table header
				</div>
			</template>
			<s-checkbox-column v-model="my_selection" />
			<s-column prop="a" width="300" header="a" edit />
			<s-column header="A">
				<template v-slot:cell="scope">
					a{{scope.model.a}}-b{{scope.model.b}}
				</template>
			</s-column>
			<s-column prop="b">
				<template v-slot:header>
					B sum={{sum_b}}
				</template>
			</s-column>
			<s-column prop="deep.reason" header="Q?" edit />
			<s-column prop="light" header="" edit type="3clr" />
			<s-row-edit-column
				@edit="(row, state)=> copy(row, state)"
				@cancel="(row, state)=> copy(state, row)"
			/>
		</s-table>
		<div>
			<p><h3>current-row</h3> {{my_row}} </p>
			<p><h3>selection</h3> {{my_selection}} </p>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {copy} from 'js-object-ext'
import mold3 from '../3clr/mold.vue'

var rows = (new Array(20)).fill(null).map((x,i)=> ({
	a: ''+i*2,
	b:i*2+1,
	light: '',
	deep: {reason: 42}
}));
@Component({components:{mold3}})
export default class Table extends Vue {
	copy = copy
	my_row = null
	my_rows = rows
	my_selection = []
	get sum_b() {
		return this.my_rows.reduce((acc, row)=> acc + row.b, 0);
	}
}
</script>