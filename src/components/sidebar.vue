<template>
	<div :class="cls">
		<slot />
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/module'

@Semantic('sidebar',
{
	direction: {type: String, required: true}
}, {
	//context
	exclusive: Boolean,
	closable: Boolean,
	dimPage: Boolean,
	scrollLock: Boolean,
	returnScroll: Boolean,
	delaySetup: Boolean,
	transition: String
}, [
	'show',
	'hide'
])
export default class Modal extends Vue {
	@Model('change') visible: boolean
	@Watch('visible') setVisible(v: boolean) {
		this.semantic(v?'show': 'hide');
	}
	configure(config) {
		config.context = this.$el.parentElement;
		config.onVisible = ()=> {
			this.$emit('change', true);
			this.$emit('visible');
		}
		config.onHidden = ()=> {
			this.$emit('change', false);
			this.$emit('hidden');
		}
	}
}
</script>