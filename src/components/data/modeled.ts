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
	mixins: [modelScoped]
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
				return this.field = this.specific.concat(this.schema);
			}
		};
		Vue.set(scope, 'schema', []);
		Vue.set(scope, 'specific', []);
		scope.unwatch = this.$watch(
			()=> model,
			value=> this.validate(scope, value),
			{deep:true, immediate:true}
		)
		return scope;
	}
	destroyScope(scope) {
		scope.unwatch();
	}
	
	validate(errScope, model) {
		if(!this.validation) return;
		var valid = this.validation(model)
		errScope.schema.splice(0);
		if(!valid) errScope.schema.push(...this.validation.errors);
		this.$emit('validated', model);
	}

	validation
	@Watch('schema', {immediate: true})
	compileSchema(schema) {
		if(schema) this.validation = this.ajv.compile(schema);
	}
}