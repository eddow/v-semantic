import * as Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Command from 'directives/command'
import * as deep from 'lib/deep'
import * as Ajv from 'ajv'
import {idSpace} from 'lib/utils'
import {renderWrap} from 'lib/render'
import {modelScoped, propertyScope} from './scope'

const genFieldName = idSpace('fld');

const slotNames = ['append', 'prepend', 'field', 'input'];

@Component({
	mixins: [renderWrap('initSlots'), modelScoped]
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
	get errorPath() {
		return this.path ? '.'+this.path : this.name;
	}
	errorsChanged(scope) {
		//validate & errors
		var errors;
		errors = scope.errScope.field;
		scope.errors.splice(0);
		for(let i = 0; i< errors.length;)
			if(this.errorPath == errors[i].dataPath)
				scope.errors.push(...errors.splice(i, 1));
			else ++i;
	}
	buildScope(model) {
		var scope = propertyScope(this, model, this.modeled.scope(model));
		
		Vue.util.defineReactive(scope, 'errors', []);

		scope.unwatch = this.$watch(
			()=> scope.errScope.total,
			errs=> this.errorsChanged(scope),
			{deep:true, immediate:true}
		);
		return scope;
	}
	destroyScope(scope) {
		scope.unwatch();
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
	get schema() {
		if(!this.modeled.schema) return {};	//this will be cached and can be modified outside
		var path = this.path.split('.'), rv = this.modeled.schema, prop;

		while(prop = path.shift()) {
			if('object'=== rv.type) rv = rv.properties[prop];
			else if('array'=== rv.type) rv = rv.items;
			else {
				console.error(`Error reading schema, ${prop} is expected to be ${rv.type}`);
			}
		}
		return rv;
	}
}