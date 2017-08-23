<template>
	<i :class="[Country, 'flag']"></i>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'

@Component
export default class Flag extends Vue {
	@Prop({required: true}) Country: string
}
</script>