<template>
	<div :class="{ui:1, dropdown:1, iconOnly: false===text}">
		<slot name="bar">
			<div v-if="placeholder" class="default text">{{placeholder}}</div>
			<span v-if="text" class="text">{{text}}</span>
			<i v-if="icon" :class="[icon, 'icon']"></i>
		</slot>
		<div class="menu">
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
import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
import {$} from 'lib/shims'

@Component
export default class Select extends Vue {
	@Model('select') value
	@Prop({default: 'dropdown'}) icon: string
	@Prop() placeholder: string
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
		$(this.$el).dropdown(...args);
	}
//TODO: watch props
	init() {
		var config: any = {};
		for(let props of [
			'forceSelection', 'on', 'allowCategorySelection', 'direction', 'keepOnScreen', 'fullTextSearch',
			'showOnFocus', 'allowTab', 'action',
			'minCharacters', 'match',
			'onChange', 'onAdd', 'onRemove', 'onNoResults', 'onShow', 'onHide'
		])
			config[props] = this[props];
		if('command'=== config.action) config.action = this.onCommand;
		this.semantic(config);
	}
	@Watch('value') setValue(value) {
		this.semantic('set value', value);
	}

	hide(): void { this.semantic('hide'); }
	show(): void { this.semantic('show'); }
	visible(): boolean { return this.semantic('is visible'); }
	clear(): void { this.semantic('clear'); }
}
</script>