import * as Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Command from 'directives/command'
import * as deep from 'lib/deep'
import * as Ajv from 'ajv'
import {idSpace} from 'lib/utils'
import {renderWrap} from 'lib/render'

const genFieldName = idSpace('fld');
//true/false indicate if the slot has a scope (in which scope.model)

const slotNames = ['append', 'prepend', 'field', 'input'];

@Component({
	mixins: [renderWrap('initSlots')]
})
export default class Property extends Vue {
	@Inject() modeled
	@Inject() group
	@Prop() prop: string
	@Prop({default: null}) info: string
	@Prop() type: string

	get path() { return deep.path(this.prop); }
	
	@Watch('prop', {immediate: true}) setFieldProperty(prop, oldv) {
		if(this.modeled) {
			this.undo(oldv);
			if(prop) {
				console.assert(!this.modeled.fields[prop], `Field ${prop} appears once in its form`);
				this.modeled.fields[prop] = this;
			}
		}
	}
	undo(prop) {
		if(this.modeled && prop) {
			delete this.modeled.fields[prop];
		}
	}
	destroyed() {
		this.undo(this.prop);
	}
	gendName = null;
	get name() {
		return this.prop || this.gendName || (this.gendName = genFieldName());
	}

	scope(model) {
		var that = this;
		return Object.create(this, model ? {
			model/*: {
				value: model
			}*/,
			value: {
				set(value) {
					deep.set(model, that.path, value);
				},
				get() {
					return deep.get(model, that.path);
				}
			}
		} : {});
	}
	
	initSlot(name: string, scoped?: boolean) {
		if(this.$scopedSlots[name]) return this.$scopedSlots[name];
		for(let mold of this.modeled.molds) {
			let slot = mold.$scopedSlots[name];
			if(slot && (
				!mold.select ||
				('function'=== typeof mold.select && mold.select(this)) ||
				mold.select === this.type)
			) {
				
				//return this.$slots[name] = slot(this.scope(this.modeled.model))||[];	//we keep [] for empty vnodes
				
				//if(scoped)
					return this.$scopedSlots[name] = ({model})=>
						slot(this.scope(model))||[];
				/*else Object.defineProperty(this.$slots, name, {
					configurable: true,
					enumerable: true,
					get: ()=> {
						const rv = slot(this)||[];	//we keep [] for empty vnodes
						Object.defineProperty(this.$slots, name, {
							enumerable: true,
							value: rv
						});
						return rv;
					}
				});
				return;*/
			}
		}
	}
	initSlots() {
		if(this.modeled) {
			var ss = {};
			for(let name of slotNames) {
				let thisSs = this.initSlot(name);
				if(thisSs) ss[name] = thisSs;
			}
			var data = this.$options._parentVnode.data;
			data.scopedSlots = __assign(ss, data.scopedSlots);
		}
	}
}