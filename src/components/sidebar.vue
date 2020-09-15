<template>
	<div :class="cls">
		<slot />
	</div>
</template>

<script lang="ts">
import {Model, Watch} from 'vue-property-decorator'
import Semantic, {VueSemantic} from 'lib/module'

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
export default class Sidebar extends VueSemantic {
	@Model('change') visible: boolean
	@Watch('visible') setVisible(v: boolean) {
		this.semantic(v?'show': 'hide');
	}
	mounted() {
		// Note: with this system, the transition of showing is displayed on page-
		//	load if visible is true. Perhaps this should be avoided.
		if(this.visible)
			this.semantic('show');
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