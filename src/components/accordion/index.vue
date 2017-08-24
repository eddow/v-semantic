<template>
	<div class="cls">
		<slot />
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch} from 'vue-property-decorator'
import Component from 'lib/classed'
import {$} from 'lib/shims'

@Component('accordion', {
	styled: Boolean,
	fluid: Boolean
})
export default class Accordion extends Vue {
	onOpening() { this.$emit('opening'); }
	onOpen() { this.$emit('open'); }
	onClosing() { this.$emit('closing'); }
	onClose() { this.$emit('close'); }
	onChange() { this.$emit('change'); }

	@Prop({default: true}) exclusive: boolean
	@Prop({default: 'click'}) on: string
	@Prop({default: true}) animateChildren: boolean
	@Prop({default: true}) closeNested: boolean
	@Prop({default: true}) collapsible: boolean
	@Prop({default: 500}) duration: number

	semantic(...args) {
		return $(this.$el).accordion(...args);
	}
	mounted() { this.init(); }
	init() {
		var config: any = {};
		for(let props of [
			'exclusive', 'on', 'animateChildren', 'closeNested', 'collapsible', 'duration',
			'onOpening', 'onOpen', 'onClosing', 'onClose', 'onChange'
		])
			config[props] = this[props];
		this.semantic(config);
	}
}
</script>