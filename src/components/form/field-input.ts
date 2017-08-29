export default {
	inject: ['field'],
	props: {tag: {type: String, default: 'span'}},
	render(h) {
		return h(this.tag, this.field.$slots.input || this.$slots.default)
	}
}