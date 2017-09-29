<template>
	<div>
		<s-sidebar direction="left" v-model="shown">
			Lorem ipsum
		</s-sidebar>
		<div class="pusher">
			<s-checkbox label="visible" v-model="shown" />
		</div>
	</div>
</template>
<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

@Component
export default class Sidebars extends Vue {
	shown: boolean = false	//TODO: it fails when initialised at true for now
}
</script>