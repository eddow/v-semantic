import * as Vue from 'vue'
import * as deep from 'lib/deep'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'

const emptyModel = Object.freeze({});

@Component
export class modelScoped extends Vue {
	// To be overriden
	buildScope(model) { throw new Error('Not implemented'); }
	destroyScope(scope) { throw new Error('Not implemented'); }

	scope(model) {
		if(!this.scopes.has(model||emptyModel)) {
			let scope: any = this.buildScope(model);
			this.scopes.set(model||emptyModel, scope);
		}
		return this.scopes.get(model||emptyModel);
	}
	scopes: WeakMap<any, any> = new WeakMap()	//model=> scope
	scopedModels: any[] = []
	invalidateScopes(models: any[]) {
		for(let model of this.scopedModels)
			if(!~models.indexOf(model) && this.scopes.has(model||emptyModel)) {
				this.destroyScope(this.scopes.get(model||emptyModel));
				this.scopes.delete(model||emptyModel);
			}
		this.scopedModels = [].concat(models);
	}
}

export function propertyScope(property, model, errScope) {
	return Object.create(property, {
		//Beware : these are property descriptors (like in Object.defineProperty)
		model: {value: model},
		errScope: {value: errScope},
		value: {
			set: function(value) {
				if(this.inputError) {
					let errors = errScope.specific,
						ndx = errors.indexOf(this.inputError);
					if(~ndx) errors.splice(ndx,1);
					delete this.inputError;
				}
				try {
					deep.set(model, this.path, this.moldInput(value));
				} catch(error) {
					errScope.specific.push(this.inputError = {
						message: error.message,
						params: error,
						dataPath: this.errorPath,
						keyword: 'input'
					});
				}
			},
			get: function() {
				return this.moldOutput(deep.get(model, this.path));
			}
		}
	});
}