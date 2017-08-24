<template>
	<div :class="cls" :multiple="multiple">
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
import {Inject, Model, Prop, Watch} from 'vue-property-decorator'
import Component from 'lib/classed'
import {$} from 'lib/shims'
//TODO: manage messages (ex errors, ...)
@Component('dropdown', {
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
})
//TODO: finish and test `multiple`
export default class Select extends Vue {
	@Model('select')
	@Prop()
	value: string
	@Prop({default: 'dropdown'}) icon: string
	@Prop() placeholder: string
	@Prop({default: 'right'}) menu: 'right'|'left'
	@Prop({default: '', type: [String, Boolean]}) text: string|false
	@Prop({default: 'click'}) on: string
	@Prop({default: true}) forceSelection: boolean
	@Prop({default: false}) allowCategorySelection: boolean
	@Prop({default: 'auto'}) direction: 'auto'|'upward'|'downward'
	@Prop({default: true}) keepOnScreen: boolean
	@Prop({default: false, type: [Boolean, String]}) fullTextSearch: boolean|'exact'
	
	@Prop({default: true}) showOnFocus: boolean
	@Prop({default: true}) allowTab: boolean

	@Prop({default: 'auto'}) transition: 'auto'|'slide down'|'slide up'
	@Prop({default: 200}) duration: number

	@Prop({default: 'activate'}) action: 'activate'|'select'|'combo'|'nothing'|'hide'|'command'

	//search
	@Prop({default: 1}) minCharacters: number
	@Prop({default: 'both'}) match: 'both'|'text'|'value'
	@Prop({default: true}) preserveHTML: boolean

	mounted() { this.init(); }

	onChange(value, text, element) { this.$emit('select', value, text, element); }
	onAdd(value, text, element) { this.$emit('add', value, text, element); }
	onRemove(value, text, element) { this.$emit('remove', value, text, element); }
	onNoResults(searchValue) { this.$emit('noResult', searchValue); }
	cancelable(event) {
		var rv = {cancel: false};
		this.$emit(event, rv);
		return !rv.cancel;
	}
	onShow() { return this.cancelable('show'); }
	onHide() { return this.cancelable('hide'); }

	onCommand(text, value, element) { this.$emit('command', value, text, element); }
	semantic(...args) {
		return $(this.$el).dropdown(...args);
	}
	get dynCls() {
		return false=== this.text?'iconOnly':'';
	}
//TODO: watch props
	init() {
		var config: any = {};
		for(let props of [
			'forceSelection', 'on', 'allowCategorySelection', 'direction', 'keepOnScreen', 'fullTextSearch',
			'showOnFocus', 'allowTab', 'action', 'preserveHTML',
			'minCharacters', 'match',
			'onChange', 'onAdd', 'onRemove', 'onNoResults', 'onShow', 'onHide'
		])
			config[props] = this[props];
		if('command'=== config.action) config.action = this.onCommand;
		this.semantic(config);
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