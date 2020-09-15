<template>
	<div>
		<s-sidebar direction="left" v-model="shown">
			Lorem ipsum
		</s-sidebar>
		<div><s-checkbox label="visible" v-model="shown" /></div>
		
		<div><s-checkbox label="uncheckable" v-model="uncheckable" /></div>
		<div><s-checkbox label="checked" :uncheckable="uncheckable" /></div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class Sidebars extends Vue {
	shown: boolean = false
	uncheckable: boolean = true
}
</script>