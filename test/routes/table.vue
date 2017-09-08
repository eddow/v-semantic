<template>
	<div>
		<s-table
			celled
			selectable
			v-model="my_row"
			:rows="my_rows"
			very-basic
			:body-height="150"
		>
			<div slot="header">
				In-table header
			</div>
			<s-checkbox-column :selection="my_selection" width="29" />
			<s-column prop="a" width="300" header="a">
				<template scope="scope">
					<s-input v-model="scope.model.a" />
				</template>
			</s-column>
			<s-column header="A">
				<template scope="scope">
					a{{scope.model.a}}-b{{scope.model.b}}
				</template>
			</s-column>
			<s-column prop="b">
				<template slot="header">
					B sum={{sum_b}}
				</template>
			</s-column>
			<s-column prop="deep.reason" header="Q?" />
		</s-table>
		<div>
			<p><h3>current-row</h3> {{my_row}}</p>
			<p><h3>selection</h3> {{my_selection}}</p>
		</div>
	</div>
</template>
<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

var rows = (new Array(10)).fill().map((x,i)=> ({
	a: ''+i*2,
	b:i*2+1,
	deep: {reason: 42}
}));
@Component
export default class Accordion extends Vue {
	my_row = null
	my_rows = rows
	my_selection = []
	get sum_b() {
		return this.my_rows.reduce((acc, row)=> acc + row.b, 0);
	}
}
</script>