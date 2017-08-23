<template>
	<div>
		<slot name="header" />
		<slot name="cell" :scope="row" v-if="row" />
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
import table from './index.vue'

@Component
export default class Column extends Vue {
	@Inject() table: table
	updated() { this.table.updateColumn(this); }
}
</script>