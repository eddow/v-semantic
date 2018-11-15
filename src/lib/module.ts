import {Component} from 'vue-property-decorator'
import * as classed from './classed'
import {$} from 'lib/shims'
import Vue, {ComponentOptions} from 'vue'
import * as S from 'string'

function onEvent(evt) {
	return 'on'+evt[0].toUpperCase()+evt.substr(1);
}

export function mixin(
	type: string,
	classes: any = {},
	inits: any = {},
	events: string[] = []
) {
	function forwarder(scope, evt) {
		return function(...args) {
			return scope.$cancelable(evt, ...args);
		};
	}
	function watcher(prop) {
		//TODO: test property change
		return function(value) {
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
		semantic(...args) { return $(this.$el)[type](...args); },
		configure(config) {},
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
	options.mixins.push(mixin(type, classes, inits, events));
	return Component(options);
}

export class VueSemantic extends Vue {
	$cancelable(event, ...args) {
		var rv = true;
		this.$emit(S(event).dasherize().s, ...args, (v = false)=> rv = v);
		return rv;
	}
	semantic(...args: any[]):any|string|boolean|number { throw "Not implemented in a mixin"; }
}