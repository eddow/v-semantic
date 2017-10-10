<template>
	<div :class="[cls]">
		<slot />
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/module'

@Semantic('dimmer', {
	variation: {default: '', type: String},
	page: Boolean
}, {
	closable: [String, Boolean],
	on: String,
	duration: Object,
	transition: String
}, [
], {
})
export default class Dimm extends Vue {
	@Model('change') visible: boolean

	configure(config) {
		config.onShow = ()=> {
			this.$emit('show');
			this.$emit('change', true);
		}
		config.onHide = ()=> {
			this.$emit('hide');
			this.$emit('change', false);
		}
	}
	@Watch('visible') show(v) {
		this.semantic(v?'show':'hide');
	}
}
</script>