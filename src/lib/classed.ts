import {Component} from 'vue-property-decorator'
import * as S from 'string'
import Vue, {ComponentOptions} from 'vue'

//<c-p src="vue.js">
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
function isDef (v) {
  return v !== undefined && v !== null
}
//---------
export function stringifyClass (value) {
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
  return ''
}

function stringifyArray (value) {
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

function stringifyObject (value) {
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
		return this.filter(x=>x).join(' ');
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
			cls() {
				var rv = ['ui'];
				if(classes) for(let cls in classes)
					if(this[cls]) {
						if('string'=== typeof this[cls])
							rv.push(this[cls]);
						rv.push(S(cls).dasherize().s.replace(/\-/g, ' '));
					}
				rv.push('function'=== typeof type?type.call(this):type);
				return stringifyArray(rv);
			}
		}
	};
}
export default function classed<V extends Vue>(type: string, classes: any = {}, options: ComponentOptions<V> = {}) {
	options = {mixins: [], ...options};
	options.mixins.push(mixin(type, classes));
	return Component(options);
}