<template>
	<div>
		<slot name="header" />
		<slot name="cell" :scope="row" v-if="row" />
	</div>
</template>

<script lang="ts">
// For internal use only : to be sure that slots are fulfilled even if `column` defaulted them
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
import table from './index.vue'

@Component
export default class ColumnSep extends Vue {
	@Inject() table: table
	updated() { this.table.updateColumn(this); }
}
</script>