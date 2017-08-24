import {Component} from 'vue-property-decorator'
Array.prototype.css = function() {
	return this.filter(x=>x).map(x=> x.replace(/\-/g, ' ')).join(' ');
}
//TODO? size, colored
export function mixin(type: string, classes: {[prop: string]: ()=> void} = {}) {
	classes = {
		inverted: Boolean,
		inline: Boolean,
		floating: Boolean,	//TODO: floating right/left?
		...classes
	}
	return {
		props: classes,
		computed: {
			dynCls() { return ''; },
			cls() {
				var rv = ['ui']
				if(classes) for(let cls in classes)
					if(this[cls]) {
						if('string'=== typeof this[cls])
							rv.push(this[cls]);
						rv.push(cls);
					}
				rv.push(type, ...this.dynCls);
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