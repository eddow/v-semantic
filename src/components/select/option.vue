<template>
	<div class="item" :data-value="value" :data-text="text">
		<template v-if="description">
			<span class="description">{{description}}</span>
			<span class="text"><slot>{{text || value}}</slot></span>
		</template>
		<template v-else>
			<span class="description"><slot name="description" /></span>
			<span class="text"><slot>{{text || value}}</slot></span>
		</template>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

@Component
export default class Option extends Vue {
	@Prop() value: string
	@Prop() text: string
	@Prop() description: string
}
</script>