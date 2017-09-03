<template>
	<i :class="iconAnalysis?[iconAnalysis.group, 'icons']:[single, cls]" @click="click">
		<i v-for="icon in iconAnalysis.icons" :key="icon" :class="[icon, 'icon']"></i>
	</i>
</template>
<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic, {stringifyClass} from 'lib/classed'

@Semantic('icon', {
	loading: Boolean,
	disabled: Boolean,
	fitted: Boolean,
	link: Boolean,
	flipped: Boolean,
	rotated: Boolean,
	circular: Boolean,
	bordered: Boolean,
	corner: String
})
export default class Icon extends Vue {
	//TODO: `icon` becomes like class : string|any|array
	@Prop({required: true, type: [String, Array, Object]}) icon: string|string[]|any[]|any
	@Emit() click() {}
	get iconString() {
		return stringifyClass(this.icon);
	}
	get iconAnalysis() {
		var str = this.iconString;
		if(~str.indexOf('+')) {
			str = str.split('+');
			return {
				group: str.shift(),
				icons: str.filter(x=>!!x)
			};
		}
		return false;
	}
	get single() {
		return !this.iconAnalysis && this.iconString;
	}
}
</script>