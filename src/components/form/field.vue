<template>
	<div class="field">
		<slot name="prepend">
			<label v-if="label" :for="name" class="label" :style="form.labelStyle">
				{{label}}
			</label>
		</slot>
		<slot>
			<s-input type="text" :name="name" />
		</slot>
		<slot name="append" />
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
	mixins: [renderWrap('initSlots')]
})
export default class Field extends Vue {
	@Inject() form
	@Provide() field = this
	@Prop() label: string
	@Prop() name: string
	errors = []

	value = null
	unwatch
	@Watch('name', {immediate: true}) setFieldName(name) {
		if(this.unwatch) this.unwatch();
		this.unwatch = this.$watch('form.model.'+name, function(value) {
			this.value = value;
		});
	}
	destroyed() {
		if(this.unwatch) this.unwatch();
	}
	@Watch('value') setNewValue(value) {
		if(!this.form || !this.form.model) return;
		var obj = this.form.model,
			keys = this.name.split('.'),
			key = keys.pop();
		for(let k in keys) if(!(obj = obj[k])) return;
		obj[key] = value;
	}

	initSlots() {
		if(this.form) {
			let slots = this.form.$scopedSlots;
			if(slots.prepend && !this.$slots.prepend)
				this.$slots.prepend = slots.prepend(this);
			if(slots.append && !this.$slots.append)
				this.$slots.append = slots.append(this);
		}
	}
	gendName = null;
	get internalName() {
		return this.name || this.gendName || (this.gendName = genFieldName());
	}
}
import Fielded from './fielded'
Field.Input = Fielded;
</script>