import {Component} from 'vue-property-decorator'
import {camelize} from 'lib/string'
import * as classed from './classed'
import Vue, {ComponentOptions} from 'vue'

function onEvent(evt: string) {
	return 'on'+camelize(evt);
}

export function mixin(
	type: string,
	classes: any = {},
	inits: any = {},
	events: string[] = []
) {
	function forwarder(scope: Vue, evt: string) {
		return function(...args: any[]) {
			return scope.$cancelable(evt, ...args);
		};
	}
	function watcher(prop: string) {
		return function(this: VueSemantic, value: any) {
			this.semantic('setting', prop, value);
		};
	}
	var rv: any = classed.mixin(type, classes);
	for(let i in inits)
		if('function'=== typeof inits[i] || inits[i] instanceof Array)
			inits[i] = {type: inits[i], default: null}
	rv.props = {...rv.props, ...inits};
	if(!rv.watch) rv.watch = {};
	for(let i in inits)
		rv.watch[i] = watcher(i);
	rv.methods = {
		semantic(...args: any[]) { return $(this.$el)[type](...args); },
		configure(config: any) {},
		init() {
			var config: any = {};
			for(let props in inits)
				if(null!== this[props])
					config[props] = this[props];
			for(let event of events)
				config[onEvent(event)] = forwarder(this, event);
			this.configure(config);
			this.semantic(config);
		}
	}
	rv.mounted = function() { this.init(); };
	return rv;
}

export default function<V extends Vue>(
	type: string,
	classes: any = {},
	inits: any = {},
	events: string[] = [],
	options: ComponentOptions<V> = {}
) {
	options = {mixins: [], ...options};
	options.mixins!.push(mixin(type, classes, inits, events));
	return Component(options);
}

export class VueSemantic extends Vue {
	semantic(...args: any[]):any|string|boolean|number { throw "Not implemented in a mixin"; }
}