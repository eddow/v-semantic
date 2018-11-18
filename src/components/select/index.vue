<template>
	<div :class="[cls, {iconOnly: false=== this.text}]" :multiple="multiple">
		<input type="hidden"
			ref="input"
			:name="name"
			:value="value"
			@input="$event=> change($event.target.value)"
		/>
		<slot name="bar">
			<div v-if="placeholder" class="default text">{{placeholder}}</div>
			<span v-if="!placeholder && false!== text" class="text">{{text}}</span>
			<i v-if="icon" :class="[icon, 'icon']"></i>
		</slot>
		<div :class="['left'=== menu && 'left', 'menu']" v-if="!options">
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
import Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic, { VueSemantic } from 'lib/module'
import {idSpace} from 'lib/utils'
import {equals} from 'lib/deep'

const genInputName = idSpace('slct');

//TODO: clearable
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
	action: [String, Function],	//'activate'|'select'|'combo'|'nothing'|'hide'|'command'
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
export default class Select extends VueSemantic {
	@Model('change') @Prop() value: string
	@Prop({default: 'dropdown'}) icon: string
	@Prop() placeholder: string
	@Prop({default: 'right'}) menu: 'right'|'left'
	@Prop({default: '', type: [String, Boolean]}) text: string|false
	@Prop() options: any[]
	@Prop() name: string
	get mappedValues() {
		return this.options.map(x=> 'string'=== typeof x ? {
			name: x,
			text: x,
			value: x
		} : x).map(x=> ({
			...x,
			selected: x.value === this.value
		}));
	}
	@Watch('options', {deep: true}) changeValues(options, oldv) {
		if(!equals(options, oldv))
			this.semantic('change values', this.mappedValues);
	}
	mounted() {
		//this.semantic('set selected', this.value);
	}
	@Emit('command') onCommand(text, value, element) {}
	configure(config) {
		config.selected = this.value;
		if('command'=== config.action) config.action = this.onCommand;
		if(this.options) config.values = this.mappedValues;
		else {
			//TODO: we need to set the class 'selected' to the option item that has `item.value === this.value`
		}
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