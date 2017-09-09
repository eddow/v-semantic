import {Ripper} from 'vue-ripper'

export const DataMold = {
	mixins: [Ripper],
	inject: ['modeled'],
	props: {
		select: {type: [Function, String]},
		render: Function,
		input: Function,
		output: Function
	},
	created: function() {
		this.modeled.molds.push(this);
	},
	destroyed: function() {
		var lst = this.modeled.molds,
			ndx = lst.indexOf(this);
		if(~ndx) lst.splice(ndx, 1);
	}
};

export const FieldInput = {
	inject: ['field'],
	props: {tag: {type: String, default: 'span'}},
	render(h) {
		return h(this.tag, this.field.$slots.input || this.$slots.default)
	}
}