import {Component} from 'vue-property-decorator'
import * as classed from './classed'
import {$} from 'lib/shims'

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
			try {
				scope.$emit(evt, ...args);
			} catch(x) {
				if(x!== 'cancel') throw x;
				return false;
			}
		};
	}
	var rv: any = classed.mixin(type, classes);
	for(let i in inits)
		if('function'=== typeof inits[i] || inits[i] instanceof Array)
			inits[i] = {typ: inits[i], default: null}
	rv.props = {...rv.props, ...inits};
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

export default function(
	type: string,
	classes: any = {},
	inits: any = {},
	events: string[] = [],
	options: ComponentOptions = {}
) {
	options = {mixins: [], ...options};
	options.mixins.push(mixin(type, classes, inits, events));
	return Component(options);
}