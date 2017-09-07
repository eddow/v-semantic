<template>
	<div :class="['field', {error: errors.length, inline: isInline}]">
		<slot name="field">
			<slot name="field" :model="modeled.model">
				<slot name="prepend">
					<slot name="prepend" :model="modeled.model">
						<label v-if="label" :for="name" class="label" :style="labelStyle">
							{{label}}
						</label>
					</slot>
				</slot>
				<slot>
					<slot name="input":model="modeled.model">
						<input type="text" v-model="scope(modeled.model).value" />
					</slot>
				</slot>
				<slot name="append">
					<slot name="append" :model="modeled.model">
						<div v-if="errors.length && modeled.displayErrors && 'fields'=== this.modeled.errorPanel"
							:class="['ui', isInline&&'left', 'pointing red basic error label']"
						>
							<div v-for="error in errors" :key="error.schemaPath">
								{{error.message}}
							</div>
						</div>
					</slot>
				</slot>
			</slot>
		</slot>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import {idSpace} from 'lib/utils'
import * as deep from 'lib/deep'
import Property from '../data/property'

@Component({mixins: [Property]})
export default class Field extends Vue {
	//from Property
	modeled
	prop
	//TODO: use `group` where we can and then create `field-group`
	//TODO: make recursive get - for `inline`, `labelWidth`, etc. and the slots
	//TODO: allow validation specifications that will add into the schema
	@Prop() label: string
	@Prop({default: null}) inline: boolean
	get isInline() {
		return null=== this.inline && this.modeled ? 
			this.modeled.inline : this.inline;
	}
	created() {
		/*TODO: assertion
		console.assert(this.modeled && 'Form'=== this.modeled.constructor.name,
			'Fields cannot be used outside of a Form');*/
	}
	errors = []

	@Watch('modeled.model') changeModel(model) {
		this.invalidateScopes([model]);
	}
	/*
	@Watch('modeled.errors', {immediate: true})
	validated() {
		var errors = this.modeled.fieldErrors;
		this.errors.splice(0);
		for(let i = 0; i< errors.length;)
			if(errors[i].dataPath === '.'+this.path)
				this.errors.push(...errors.splice(i, 1));
			else ++i;
		if(!this.errors.length) this.$emit('validated', this.value);
	}*/

	get labelStyle() {
		return this.modeled && this.modeled.labelStyle;
	}
}
</script>