import {Component} from 'vue-property-decorator'
import {dasherize} from 'lib/string'
import Vue, {ComponentOptions} from 'vue'

//<c-p src="vue.js">
function isObject (obj: any) {
  return obj !== null && typeof obj === 'object'
}
function isDef (v: any) {
  return v !== undefined && v !== null
}
//---------
export function stringifyClass (value: any|any[]|string): string {
  if (Array.isArray(value)) {
	return stringifyArray(value)
  }
  if (isObject(value)) {
	return stringifyObject(value)
  }
  if (typeof value === 'string') {
	return value
  }
  /* istanbul ignore next */
  return '';
}

function stringifyArray (value: any[]) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
	if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
	  if (res) { res += ' '; }
	  res += stringified;
	}
  }
  return res
}

function stringifyObject (value: any) {
  var res = '';
  for (var key in value) {
	if (value[key]) {
	  if (res) { res += ' '; }
	  res += key;
	}
  }
  return res
}
//</c-p>
Object.defineProperty(Array.prototype, 'css', {
	value: function() {
		return this.filter((x: any)=>!!x).join(' ');
	}
});
//TODO? size, colored
export function mixin(type: string|(()=> string), classes: any = {}) {
	classes = {
		//generic classes that all semantic-ui-classed share
		inverted: Boolean,
		//floating: Boolean,	//TODO: this should be specific to some components, not generic
		...classes
	}
	return {
		props: classes,
		computed: {
			cls(this: Vue): string {
				var rv = ['ui'];
				if(classes) for(let cls in classes)
					if(!!(this[cls] as any)) {
						if('string'=== typeof this[cls])
							rv.push(this[cls]);
						rv.push(dasherize(cls).replace(/\-/g, ' '));
					}
				rv.push('function'=== typeof type?type.call(this):type);
				return stringifyArray(rv);
			}
		}
	};
}
export default function classed<V extends Vue>(type: string, classes: any = {}, options: ComponentOptions<V> = {}) {
	options = {mixins: [], ...options};
	options.mixins!.push(mixin(type, classes));
	return Component(options);
}