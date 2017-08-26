
import * as S from 'string'
import * as Vue from 'vue'

var base63 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
//Little-Endian Base63
function nextLEB63(s) {
	var rv = '', tval = 0;
	while(0=== tval && ''!== s) {
		rv += base63[tval = (1+base63.indexOf(s[0])) % 63];
		s = s.substr(1);
	}
	if(0=== tval) return rv+base63[0];
	return rv+s;
}
export function idSpace(pfx = '_') {	
	var cpt = '';
	return function() {
		return pfx+(cpt = nextLEB63(cpt));
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