import * as Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Command from 'directives/command'
import * as deep from 'lib/deep'
import * as Ajv from 'ajv'
import {idSpace} from 'lib/utils'

const genFieldName = idSpace('fld');

@Component
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
			console.assert(!this.modeled.fields[prop],
				`Field ${prop} appears once in its form`);
			this.modeled.fields[prop] = this;
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
		return Object.create(this, {
			model: {
				value: model
			},
			value: {
				set(value) {
					deep.set(model, that.path, value);
				},
				get() {
					return deep.get(model, that.path);
				}
			}
		});
	}
}