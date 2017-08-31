<template>
	<div :class="['field', {error: errors.length, inline: isInline}]">
		<slot name="field">
			<slot name="prepend">
				<label v-if="label" :for="internalName" class="label" :style="labelStyle">
					{{label}}
				</label>
			</slot>
			<slot>
				<input type="text" v-model="value" />
			</slot>
			<slot name="append">
				<div v-if="errors.length && form.displayErrors && 'fields'=== this.form.errorPanel"
					:class="['ui', isInline&&'left', 'pointing red basic error label']"
				>
					<div v-for="error in errors" :key="error.schemaPath">
						{{error.message}}
					</div>
				</div>
			</slot>
		</slot>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import {idSpace} from 'lib/utils'
import * as deep from 'lib/deep'
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
	//TODO: finish the 'type' system and why not generalise something with table-cell editors
	//TODO: allow validation specifications that will add into the schema
	@Prop() label: string
	@Prop() name: string
	@Prop({default: null}) info: string
	@Prop({default: null}) inline: boolean
	get isInline() {
		return null=== this.inline && this.form ? 
			this.form.inline : this.inline;
	}
	@Prop() type: string
	errors = []

	get path() { return deep.path(this.name); }
	value = null
	unwatch
	@Watch('name', {immediate: true}) setFieldName(name, oldv) {
		if(this.form) {
			this.undo(oldv);
			this.unwatch = this.$watch('form.model.'+name, function(value) {
				this.value = value;
			}, {immediate: true});
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
		if(!this.errors.length) this.$emit('validated', this.value);
	}
	destroyed() {
		this.undo(this.name);
	}
	@Watch('value')
	@Emit() change(value) {
		deep.set(this.form && this.form.model, this.path, value);
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
			let slots = this.$slots;
			if(!slots.field && !slots.default && slots.input) {
				slots.default = slots.input;
				delete slots.input;
			} else if(slots.field && slots.default) {
				slots.input = slots.default;
				delete slots.default;
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