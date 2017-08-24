<template>
	<i :class="[icon, cls]" @click="click"></i>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/classed'

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
	@Prop({required: true}) icon: string
	@Emit() click() {}
}
</script>