<template>
	<label class="ui label">
		<slot />
	</label>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
//TODO: label should become a directive
@Component
export default class Label extends Vue {
}
</script>