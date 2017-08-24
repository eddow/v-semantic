<template>
	<i :class="css" @click="click"></i>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch} from 'vue-property-decorator'
import Component from 'lib/classed'

@Component('icon', {
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
	@Prop({required: true}) icon: string

	get dynCss() {
		return this.icon;
	}
	click() { this.$emit('click'); }
}
</script>