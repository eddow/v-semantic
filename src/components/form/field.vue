<template>
	<div :class="['field', {error: errors.length, inline: isInline}]">
		<slot name="field">
			<slot name="prepend">
				<label v-if="label" :for="name" class="label" :style="labelStyle">
					{{label}}
				</label>
			</slot>
			<slot>
				<input type="text" v-model="value" />
			</slot>
			<slot name="append">
				<div :class="['ui', inline&&'left', 'pointing red basic error label']" v-if="errors.length">
					<div class="" v-for="error in errors" :key="error.schemaPath">
						{{error.message}}
					</div>
				</div>
			</slot>
		<slot>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import {idSpace} from 'lib/utils'
import {renderWrap} from 'lib/render'
import sInput from '../input.vue'

const genFieldName = idSpace('fld');
function patchRender(h) {
	this.$parent.importSlots();
	return h('div', {class: 'field'}, this.$slots.default);
}
@Component({
	components: {sInput},
	mixins: [renderWrap('initSlots')],	
  provide() { return {field: this}; }
})
export default class Field extends Vue {
	@Inject() form
	@Inject() group	//TODO: use `group` where we can and then create `field-group`
	//TODO: make recursive get - for `inline`, `labelWidth`, etc. and the slots
	@Prop() label: string
	@Prop() name: string
	@Prop() info: string
	@Prop({default: null}) inline: boolean
	get isInline() {
		return null=== this.inline && this.form ? 
			this.form.inline : this.inline;
	}
	@Prop() type: string
	errors = []

	value = null
	unwatch
	path
	@Watch('name', {immediate: true}) setFieldName(name, oldv) {
		var keys = [];
		for(let key of name.split('.')) {
			let subs = /^(.*?)(\[.*\])?$/.exec(key);
			keys.push(subs[1]);
			if(subs[2]) keys.push(...subs[2].split(']['));
		}
		this.path = keys.join('.');
		if(this.form) {
			this.undo(oldv);
			this.unwatch = this.$watch('form.model.'+name, function(value) {
				this.value = value;
			});
			console.assert(!this.form.fields[name],
				`Field ${name} appears once in its form`);
			this.form.fields[name] = this;
		}
	}
	undo(name) {
		if(this.form) {
			delete this.form.fields[name];
			if(this.unwatch) this.unwatch();
		}
	}
	@Watch('form.errors', {immediate: true})
	validated() {
		var errors = this.form.fieldErrors;
		this.errors.splice(0);
		for(let i = 0; i< errors.length;)
			if(errors[i].dataPath === '.'+this.path)
				this.errors.push(...errors.splice(i, 1));
			else ++i;
	}
	destroyed() {
		this.undo(this.name);
	}
	@Watch('value')
	setNewValue(value) {
		if(!this.form || !this.form.model) return;
		var obj = this.form.model,
			keys = this.path.split('.'), lvalue;
		lvalue = keys.pop();
		for(let key in keys) if(!(obj = obj[key])) return;
		obj[lvalue] = value;
	}

	initSlot(toSlot: string, fromSlot: string = toSlot) {
		let slots = this.form.$scopedSlots;
		if(this.$slots[toSlot]) return;
		let slot = (this.type && slots[fromSlot+'.'+this.type]) || slots[fromSlot];
		if(slot) this.$slots[toSlot] = slot(this);
	}
	initSlots() {
		if(this.form) {
			this.initSlot('append');
			this.initSlot('prepend');
			this.initSlot('field');
			this.initSlot('input');

			if(!this.$slots.field)
				this.$slots.default = this.$slots.input;
			else if(this.$slots.default) {
				this.$slots.input = this.$slots.default;
				delete this.$slots.default;
			}
		}
	}
	get labelStyle() {
		return this.form && this.form.labelStyle;
	}
	gendName = null;
	get internalName() {
		return this.name || this.gendName || (this.gendName = genFieldName());
	}
}
import Fielded from './fielded'
Field.Input = Fielded;
</script>