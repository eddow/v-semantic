import {Component} from 'vue-property-decorator'
import * as S from 'string'
Array.prototype.css = function() {
	return this.filter(x=>x).join(' ');
}
//TODO? size, colored
export function mixin(type: string, classes: {[prop: string]: ()=> void} = {}) {
	classes = {
		inverted: Boolean,
		//floating: Boolean,	//TODO: this should be specific to some components, not generic
		...classes
	}
	return {
		props: classes,
		computed: {
			dynCls() { return ''; },
			cls() {
				var rv = ['ui'];
				if(classes) for(let cls in classes)
					if(this[cls]) {
						if('string'=== typeof this[cls])
							rv.push(this[cls]);
						rv.push(S(cls).dasherize().s.replace(/\-/g, ' '));
					}
				rv.push(type, this.dynCls);
				return rv.css();
			}
		}
	};
}
export default function classed(type: string, classes: {[prop: string]: ()=> void} = {}, options: ComponentOptions = {}) {
	options = {mixins: [], ...options};
	options.mixins.push(mixin(type, classes));
	return Component(options);
}