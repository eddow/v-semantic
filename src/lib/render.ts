export const rendered = {
	props: {render: {required: true}},
	render(h) { return this.render(h); }
};

// Call the original render with the arguments you wish or not - return `undefined` and the original renderer will be invoked
export function renderWrap(wrap: string | ((h, orgRender)=> any)) {
	return {
		created() {
			var originalRender, newRender = 'string'!== typeof wrap ? wrap : this[wrap],
				that = this;
			originalRender = this._render;
			this._render = function(h) {
				return newRender.call(that, h, function() {
					return originalRender.apply(that, arguments);
				}) || originalRender.call(that, h);
			};
		}
	}
}

// Call the original update with no arguments - just do!
export function updateWrap(wrap: string | ((orgupdate, rendered)=> any)) {
	return {
		created() {
			var originalUpdate, newUpdate = 'string'!== typeof wrap ? wrap : this[wrap],
				that = this;
			originalUpdate = this._update;
			this._update = function(rendered, hydrating) {
				return newUpdate.call(that, function(specRendered) {
					originalUpdate.call(that, specRendered || rendered, hydrating);
				}, rendered);
			};
		}
	}
}