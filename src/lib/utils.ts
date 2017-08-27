
import * as S from 'string'
import * as Vue from 'vue'

var base37 = 'abcdefghijklmnopqrstuvwxyz0123456789_';
//Little-Endian Base37
function nextLEB37(s) {
	var rv = '', tval = 0;
	while(0=== tval && ''!== s) {
		rv += base37[tval = (1+base37.indexOf(s[0])) % 37];
		s = s.substr(1);
	}
	if(0=== tval) return rv+base37[0];
	return rv+s;
}
export function idSpace(pfx = '_') {	
	var cpt = '';
	return function() {
		return pfx+(cpt = nextLEB37(cpt));
	}
}

var CancelError = new Error('Canceled event');
Vue.mixin({
	methods: {
		$cancelEvent() {
			throw CancelError;
		},
		$cancelable(event, ...args) {
			try {
				this.$emit(S(event).dasherize().s, ...args);
				return true;
			} catch(x) {
				if(CancelError!== x) throw x;
				return false;
			}
		}
	}
});