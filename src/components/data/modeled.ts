import * as Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Command from 'directives/command'
import * as Ajv from 'ajv'
import {modelScoped} from './scope'

@Component({
	provide() {
		return {
			modeled: this,
			group: this
		};
	},
	mixins: [modelScoped.extendOptions]
})
export default class Modeled extends Vue {
	@Prop({default: ()=> ({})}) schema
	molds = []
	fields = {}
	ajv
	beforeCreate() {
		//TODO: add ajv options
		this.ajv = new Ajv({
			allErrors: true
		});
	}
	
	buildScope(model) {
		var scope: any = {
			get total() {
				return this.specific.concat(this.schema);
			}
		};
		Vue.util.defineReactive(scope, 'schema', []);
		Vue.util.defineReactive(scope, 'specific', []);
		scope.unwatch = [this.$watch(
			()=> model,
			value=> this.validate(scope, value),
			{deep:true, immediate:true}
		), this.$watch(
			()=> scope.total,
			errs=> scope.field = [].concat(errs),
			{deep:true, immediate:true}
		)];
		return scope;
	}
	destroyScope(scope) {
		for(let unwatch of scope.unwatch) unwatch();
	}
	
	validate(errScope, model) {
		if(!this.validation) return;
		var valid = this.validation(model)
		errScope.schema.splice(0);
		if(!valid) errScope.schema.push(...this.validation.errors);
		errScope.field = [].concat(errScope.schema);
		this.$emit('validated', model);
	}

	validation
	@Watch('schema', {immediate: true})
	compileSchema(schema) {
		if(schema) this.validation = this.ajv.compile(schema);
	}
}