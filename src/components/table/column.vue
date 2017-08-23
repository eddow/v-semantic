<template>
	<rc>
		<template slot="header">
			<slot name="header">
				{{header}}
			</slot>
		</template>
		<template slot="cell" scope="row">
			<slot name="cell" :row="row">
				{{value(row, property)}}
			</slot>
		</template>
	</rc>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
import rc from './column-sep.vue'

@Component({components:{rc}})
export default class Column extends Vue {
	@Prop() property: string
	@Prop() header: string
	value(row, property) {
		return row[property];
	}
}
</script>