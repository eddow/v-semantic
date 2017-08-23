<template>
	<div class="ui accordion">
		<slot />
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
import {$} from '../../shims'

@Component
export default class Accordion extends Vue {
	semantic(...args) {
		$(this.$el).dropdown(...args);
	}
	mounted() { this.init(); }
	init() {
		var config: any = {};
		/*for(let props of [
			'forceSelection', 'on', 'allowCategorySelection', 'direction', 'keepOnScreen', 'fullTextSearch',
			'showOnFocus', 'allowTab', 'action',
			'minCharacters', 'match',
			'onChange', 'onAdd', 'onRemove', 'onNoResults', 'onShow', 'onHide'
		])
			config[props] = this[props];*/
		this.semantic(config);
	}
}
</script>