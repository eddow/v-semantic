import {Component} from 'vue-property-decorator'
Array.prototype.css = function() {
	return this.filter(x=>x).join(' ');
}
//TODO? size, colored
export function mixin(type: string, classes: {[prop: string]: ()=> void} = {}) {
	return {
		props: classes,
		computed: {
			dynCss() { return ''; },
			css() {
				var rv = ['ui']
				if(classes) for(let cls in classes)
					if(this[cls]) {
						if('string'=== typeof this[cls])
							rv.push(this[cls]);
						rv.push(cls);
					}
				rv.push(type, ...this.dynCss);
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