<template>
	<div>
		<div class="title">
			<slot name="title">
				<i v-if="icon" :class="[icon, 'icon']"></i>
				{{title}}
			</slot>
		</div>
		<div class="content">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'

export default class Bellow extends Vue {
	@Prop({default: 'dropdown'}) icon: string
	@Prop() title: string
}
</script>