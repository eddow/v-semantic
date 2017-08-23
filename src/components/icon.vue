<template>
	<i :class="[icon, 'icon']" @click="click"></i>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'

@Component
export default class Icon extends Vue {
	@Prop({required: true}) icon: string

	click() { this.$emit('click'); }
}
</script>