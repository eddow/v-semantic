<template>
	<div class="ui breadcrumb">
		<template v-for="(crumb, index) in crumbs">
			<i v-if="0!== index" :class="[iconString, 'icon', 'divider']"></i>
			<span v-if="last(index)" class="active section">{{crumb.text || crumb.name}}</span>
			<router-link v-else :to="crumb" class="section">{{crumb.text || crumb.name}}</router-link>
		</template>
	</div>
</template>
<script lang="ts">
/// <reference types="vue-router" />
import Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic, {stringifyClass} from 'lib/classed'

class Crumb extends Location {
	text?: string
}

@Semantic('breadcrumb')
export default class Breadcrumb extends Vue {
	//TODO: `icon` becomes like class : string|any|array
	@Prop({default: 'right angle', type: [String, Array, Object]}) separator: string|string[]
	get iconString() {
		return stringifyClass(this.separator);
	}
	@Prop({required: true}) crumbs: Crumb[]
	last(index: number): boolean {
		return index=== this.crumbs.length-1;
	}
}
</script>