import {idSpace} from 'lib/utils'
import * as Vue from 'vue'
import {renderWrap} from 'lib/render'

const genInputName = idSpace('inp');

export default {
	mixins: [renderWrap('importValue')],
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
		importValue() {
			var prop = this.constructor.options.model.prop,
				props = this.$options.propsData;
			if(!(prop in props))
				props[prop] = this.field.value;
		}
	},
	mounted() {
		if(this.field && this.field.form) {
			var model = this.constructor.options.model,
				form = this.field.form,
				name = this.field.name,
				unwatchModel = this.$watch('field.value', ()=> {
					this.$forceUpdate();
					//This is hacky, we know which property to upgrade,
					// and we know it was not bound : !(model.prop in this.$options.propsData)
					// Now, we have to find a way to modify the given property without Vue complaining that we modify a property directly
					/*
					var parent = this.$parent;	//This is a hack that disables the warning
					this.$parent = null;
					this[model.prop] = v;
					this.$parent = parent;*/
					//TODO: patch this on rendering; redirect rendering in "created" too,
					// or make a render-wrapper
					//this.$options.propsData[model.prop] = v;
					/*this.$parent.$forceUpdate();	//We update the parent twice with this, but it would badly update it after
					//this.$vnode.data.hook.prepatch(this.$vnode,this.$vnode);*/
				}),
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