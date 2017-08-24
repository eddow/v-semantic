<template>
	<div :class="[cls, {iconOnly: false=== this.text}]" :multiple="multiple">
		<slot name="bar">
			<div v-if="placeholder" class="default text">{{placeholder}}</div>
			<span v-if="text" class="text">{{text}}</span>
			<i v-if="icon" :class="[icon, 'icon']"></i>
		</slot>
		<div :class="{menu:1, left: 'left'=== menu}">
			<slot />
		</div>
	</div>
</template>

<style>
.ui.dropdown.iconOnly > .dropdown.icon {
  margin: 0;
}
</style>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/module'

//TODO: manage messages (ex errors, ...)
@Semantic('dropdown', {
	selection: Boolean,
	searchSelection: Boolean,
	multiple: Boolean,
	simple: Boolean,
	pointing: String,
	loading: Boolean,
	error: Boolean,
	disabled: Boolean,
	scrolling: Boolean,
	fluid: Boolean,
	compact: Boolean,
	inline: Boolean
}, {
	on: String,
	forceSelection: Boolean,
	allowCategorySelection: Boolean,
	direction: String,	//'auto'|'upward'|'downward'
	keepOnScreen: Boolean,
	fullTextSearch: [Boolean, String],//boolean|'exact',
	showOnFocus: Boolean,
	allowTab: Boolean,
	transition: String, //'auto'|'slide down'|'slide up'
	duration: Number,
	minCharacters: Number,
	match: String,	//'both'|'text'|'value'
	action: String,	//'activate'|'select'|'combo'|'nothing'|'hide'|'command'
	preserveHTML: Boolean
}, [
	'change',
	'add',
	'remove',
	'noResult',
	'show',
	'hide'
])
//TODO: finish and test `multiple`
export default class Select extends Vue {
	@Model('change') @Prop() value: string
	@Prop({default: 'dropdown'}) icon: string
	@Prop() placeholder: string
	@Prop({default: 'right'}) menu: 'right'|'left'
	@Prop({default: '', type: [String, Boolean]}) text: string|false

	@Emit('command') onCommand(text, value, element) {}
	configure(config) {
		if('command'=== config.action) config.action = this.onCommand;
	}
	@Watch('value') setValue(value) {
		this.semantic('set selected', value);
	}

	hide(): void { this.semantic('hide'); }
	show(): void { this.semantic('show'); }
	visible(): boolean { return this.semantic('is visible'); }
	clear(): void { this.semantic('clear'); }
}
</script>