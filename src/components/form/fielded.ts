import {idSpace} from 'lib/utils'
import * as Vue from 'vue'
import {renderWrap} from 'lib/render'

const genInputName = idSpace('inp');

export default {
	mixins: [renderWrap(function() {
		if(this.field) this.setModel(this.field.value);
	})],
	props: {
		name: {type: String}
	},
	data: ()=> ({
		field: null
	}),
	computed: {
		internalName() {
			return this.name ||
				(this.field && this.field.internalName) ||
				this.gendName ||
				(this.gendName = genInputName());
		}
	},
	// <patch url="https://github.com/vuejs/vue/issues/6097">
	//inject: ['field'],
	created() {
		var p = this;
		while(p && !(p._provided && p._provided.field)) p = p.$parent;
		if(p) this.field = p._provided.field;
	},
	// </patch>
	methods: {
		setModel(value) {
			if(this.field) {
				var prop = this.constructor.options.model.prop,
					parent = this.$parent;	//This is a hack that disables the warning
					
				if(!(prop in this.$options.propsData)) {
					this.$parent = null;
					this[prop] = value;
					this.$parent = parent;
				}
			}
		}
	},
	mounted() {
		var model = this.constructor.options.model,
			form = this.field && this.field.form,
			unwatchModel, forward2form;
		if(form && !(model.prop in this.$options.propsData)) {
			unwatchModel = this.$watch('field.value', this.setModel);
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