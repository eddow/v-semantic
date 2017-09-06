import * as Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Command from 'directives/command'
import * as Ajv from 'ajv'

@Component({
	provide() {
		return {
			modeled: this,
			group: this
		};
	}
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
	validation
	@Watch('schema', {immediate: true})
	compileSchema(schema) {
		if(schema) this.validation = this.ajv.compile(schema);
	}
}