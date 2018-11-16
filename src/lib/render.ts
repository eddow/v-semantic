import Vue, { VNode, RenderContext } from 'vue'

export const rendered = {
	props: {render: {required: true}},
	render(this: Vue, h: typeof Vue.prototype.$createElement, context: RenderContext): VNode {
		return (<any>this).render(h, context);
	}
};

// Call the original render with the arguments you wish or not - return `undefined` and the original renderer will be invoked
export function renderWrap(wrap: string | ((h: typeof Vue.prototype.$createElement, orgRender: (h: typeof Vue.prototype.$createElement)=> VNode)=> any)) {
	return {
		created() {
			var originalRender: (h: typeof Vue.prototype.$createElement)=> VNode,
			newRender = 'string'!== typeof wrap ? wrap : this[wrap],
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