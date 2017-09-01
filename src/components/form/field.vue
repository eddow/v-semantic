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
				<div v-if="errors.length && modeled.displayErrors && 'fields'=== this.modeled.errorPanel"
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
	@Inject() modeled
	@Inject() group	//TODO: use `group` where we can and then create `field-group`
	//TODO: make recursive get - for `inline`, `labelWidth`, etc. and the slots
	//TODO: finish the 'type' system and why not generalise something with table-cell editors
	//TODO: allow validation specifications that will add into the schema
	@Prop() label: string
	@Prop() property: string
	@Prop({default: null}) info: string
	@Prop({default: null}) inline: boolean
	get isInline() {
		return null=== this.inline && this.modeled ? 
			this.modeled.inline : this.inline;
	}
	@Prop() type: string
	errors = []

	get path() { return deep.path(this.property); }
	value = null
	unwatch
	@Watch('property', {immediate: true}) setFieldProperty(property, oldv) {
		if(this.modeled) {
			this.undo(oldv);
			this.unwatch = this.$watch('modeled.model.'+property, function(value) {
				this.value = value;
				this.$forceUpdate();
			}, {immediate: true});
			console.assert(!this.modeled.fields[property],
				`Field ${property} appears once in its form`);
			this.modeled.fields[property] = this;
		}
	}
	undo(property) {
		if(this.modeled) {
			delete this.modeled.fields[property];
			if(this.unwatch) this.unwatch();
		}
	}
	@Watch('modeled.errors', {immediate: true})
	validated() {
		var errors = this.modeled.fieldErrors;
		this.errors.splice(0);
		for(let i = 0; i< errors.length;)
			if(errors[i].dataPath === '.'+this.path)
				this.errors.push(...errors.splice(i, 1));
			else ++i;
		if(!this.errors.length) this.$emit('validated', this.value);
	}
	destroyed() {
		this.undo(this.property);
	}
	@Watch('value')
	@Emit() change(value) {
		console.log('value :'+ value);
		deep.set(this.modeled && this.modeled.model, this.path, value);
	}

	originalSlots
	initSlot(name: string) {
		if(this.originalSlots[name]) return;
		for(let mold of this.modeled.molds) {
			let slot = mold.$scopedSlots[name];
			if(slot && mold.select(this)) {
				return this.$slots[name] = slot(this)||[];	//we keep [] for empty vnodes
			}
		}
	}
	childUpdate() {
		this.$forceUpdate();
	}
	initSlots() {
		if(this.modeled) {
			if(!this.originalSlots)
				this.originalSlots = {...this.$slots};
			this.initSlot('append');
			this.initSlot('prepend');
			this.initSlot('field');
			this.initSlot('input');
			//When defined in the field, it is not the `input` slot that is used but the default one
			let slots = this.$slots;
			if(!slots.field && !this.originalSlots.default && slots.input) {
				slots.default = slots.input;
				delete slots.input;
			} else if(slots.field && slots.default) {
				slots.input = slots.default;
				delete slots.default;
			}
		}
	}
	get labelStyle() {
		return this.modeled && this.modeled.labelStyle;
	}
	gendName = null;
	get name() {
		return this.property || this.gendName || (this.gendName = genFieldName());
	}
}
</script>