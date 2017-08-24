<template>
	<div :class="cls">
		<slot />
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch} from 'vue-property-decorator'
import Component from 'lib/module'
import {$} from 'lib/shims'

@Component('accordion', {
	styled: Boolean,
	fluid: Boolean
}, {
	exclusive: Boolean,
	on: String,
	animateChildren: Boolean,
	closeNested: Boolean,
	collapsible: Boolean,
	duration: Number
}, [
'opening',
'open',
'closing',
'close',
'change'
])
export default class Accordion extends Vue {

}
</script>