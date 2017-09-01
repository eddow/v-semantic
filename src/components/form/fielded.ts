import {idSpace} from 'lib/utils'
import * as Vue from 'vue'

const genInputName = idSpace('inp');
export default {
	props: {
		name: {type: String}
	},
	computed: {
		internalName() {
			return this.name ||
				(this.formBound && this.field && this.field.internalName) ||
				this.gendName ||
				(this.gendName = genInputName());
		}
	},
	// <patch url="https://github.com/vuejs/vue/issues/6097">
	//inject: ['field'],
	beforeCreate() {
		var p = this;
		while(p && !(p._provided && p._provided.field)) p = p.$parent;
		if(p) this.field = p._provided.field;
	// </patch>
		// In order to push the value of the field to the model, the `default` of model prop is rewritten
		// ...once, that's why we use `this.constructor.fielded`
		// It is rewritten to a function that gets the field value of the default value if there is no field
		if(!this.constructor.fielded) {
			this.constructor.fielded = true;
			let model = this.constructor.options.model,
				props = this.constructor.options.props,
				dft = props[model.prop].default;
			props[model.prop].default = function() {
				this.formBound = true;
				return this.field?this.field.value:dft;
			}
		}
	},
	created() {
		var model = this.constructor.options.model,
			form = this.field && this.field.form,
			unwatchModel, forward2form;
		if(form && this.formBound) {
			unwatchModel = this.$watch('field.value', (value)=> {
				//This is hacky, we know which property to upgrade,
				// and we know it was not bound : `form && this.formBound`
				// Now, we have to find a way to modify the given property without Vue complaining that we modify a property directly
				var parent = this.$parent;	//This is a hack that disables the warning
				this.$parent = null;
				this[model.prop] = value;
				this.$parent = parent;
			});
			forward2form = value=> this.field.value = value;
			this.$on(model.event, forward2form);
			this.unFielded = ()=> {
				if(unwatchModel) unwatchModel();
				this.$off(model.event, forward2form);
			}
		}
	},
	destroyed() {
		if(this.unFielded) this.unFielded();
	}

};