export const rendered = {
	props: {render: {required: true}},
	render(h) { return this.render(h); }
};

export function renderWrap(wrap: string | ((h, orgRender)=> any)) {
	return {
		created() {
			var originalRender, newRender = 'string'!== typeof wrap ? wrap : this[wrap];
			originalRender = this._render;
			this._render = function(h) {
				return newRender.call(this, h, originalRender) || originalRender.call(this, h);
			};
		}
	}
}