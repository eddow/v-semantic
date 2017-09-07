import * as Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Command from 'directives/command'
import * as deep from 'lib/deep'
import * as Ajv from 'ajv'
import {idSpace} from 'lib/utils'
import {renderWrap} from 'lib/render'

const genFieldName = idSpace('fld');

const slotNames = ['append', 'prepend', 'field', 'input'],
	emptyModel = {};

@Component({
	mixins: [renderWrap('initSlots')]
})
export default class Property extends Vue {
	@Inject() modeled
	@Inject() group
	@Prop() prop: string
	@Prop({default: null}) info: string
	@Prop() type: string

	@Prop({type: Function}) render
	get moldRender() { return this.moldProp('render') || (x=>x); }
	@Prop({type: Function}) input
	get moldInput() { return this.moldProp('input') || (x=>x); }
	@Prop({type: Function}) output
	get moldOutput() { return this.moldProp('output') || (x=>x); }

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
	scopes: WeakMap<any, any> = new WeakMap()	//model=> scope
	scopedModels: any[] = []
	invalidateScopes(models: any[]) {
		for(let model of this.scopedModels)
			if(!~models.indexOf(model) && this.scopes.has(model||emptyModel)) {
				this.scopes.get(model||emptyModel).unwatch();
				this.scopes.delete(model||emptyModel);
			}
		this.scopedModels = [].concat(models);
	}
	modelChanged(scope, value) {
		//validate & errors
		var errors = this.modeled.getFieldErrors(scope.model);
		scope.errors.splice(0);
		for(let i = 0; i< errors.length;)
			if(errors[i].dataPath === '.'+this.path)
				scope.errors.push(...errors.splice(i, 1));
			else ++i;
	}
	scope(model) {
		if(!this.scopes.has(model||emptyModel)) {
			let scope: any = Object.create(this, {
				//Beware : these are property descriptors (like in Object.defineProperty)
				model: {
					value: model
				},
				value: {
					set: (value)=> deep.set(model, this.path, this.moldInput(value))
					/*{
						try { deep.set(model, this.path, this.moldInput(scope, value)); }
						catch(x) { error = x; }
						finally {
							if(error) scope.errors.input = error;
							else scope.errors.input;
						}
					}*/,
					get: ()=> this.moldOutput(deep.get(model, this.path))
				},
				errors: {
					value: []
				}
			});
			scope.unwatch = this.$watch(
				()=> this.modeled.getErrors(model),
				value=> this.modelChanged(scope, value),
				{deep:true, immediate:true}
			);
			this.scopes.set(model||emptyModel, scope);
		}
		return this.scopes.get(model||emptyModel);
	}
	moldProp(name) {
		if(this[name]) return this[name];
		for(let mold of this.modeled.molds)
			if(mold[name])
				return mold[name];
	}
	initSlot(name: string) {
		if(this.$scopedSlots[name]) return this.$scopedSlots[name];
		for(let mold of this.modeled.molds) {
			let slot = mold.$scopedSlots[name];
			if(slot && (
				!mold.select ||
				('function'=== typeof mold.select && mold.select(this)) ||
				mold.select === this.type)
			)
				//return this.$slots[name] = slot(this.scope(this.modeled.model))||[];
				return this.$scopedSlots[name] = (params)=> 
					slot(__assign(this.scope(params.model), params))||[];	//we keep [] for empty vnodes
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