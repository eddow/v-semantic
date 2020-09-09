<template>
	<i :class="[country, 'flag']"></i>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class Flag extends Vue {
	@Prop({required: true}) country: string
}
</script>