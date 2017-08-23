<template>
	<div class="item" :data-value="value" :data-text="text">
		<slot>{{text}}</slot>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'

@Component
export default class Option extends Vue {
	@Prop() value: string
	@Prop() text: string
}
</script>