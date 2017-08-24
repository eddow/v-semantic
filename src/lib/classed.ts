import {Component} from 'vue-property-decorator'
import * as S from 'string'
Object.defineProperty(Array.prototype, 'css', {
	value: function() {
		return this.filter(x=>x).join(' ');
	}
});
//TODO? size, colored
export function mixin(type: string, classes: any = {}) {
	classes = {
		inverted: Boolean,
		//floating: Boolean,	//TODO: this should be specific to some components, not generic
		...classes
	}
	return {
		props: classes,
		computed: {
			cls() {
				var rv = ['ui'];
				if(classes) for(let cls in classes)
					if(this[cls]) {
						if('string'=== typeof this[cls])
							rv.push(this[cls]);
						rv.push(S(cls).dasherize().s.replace(/\-/g, ' '));
					}
				rv.push(type);
				return rv.css();
			}
		}
	};
}
export default function classed(type: string, classes: any = {}, options: ComponentOptions = {}) {
	options = {mixins: [], ...options};
	options.mixins.push(mixin(type, classes));
	return Component(options);
}