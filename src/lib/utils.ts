import Vue from 'vue'
import {dasherize} from 'lib/string'
export * from './utils.js'

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
/**
 * Create a new idSpace: a function that produces a different id each time it is called
 * @param {string} pfx The prefix to add before the IDs
 * @return {(postfix: string)=> string} generates a unique id for this prefix. The postfix is optional and for debug purpose only.
 */
export function idSpace(pfx = '_') {	
	var cpt = '';
	return function(post = '') {
		return pfx+(cpt = nextLEB37(cpt))+post;
	}
}

declare module 'vue/types/vue' {
	interface Vue {
		$cancelable(event: string, ...args: any[]): this;
	}
}

Object.assign(Vue.prototype, {
	$cancelable(event, ...args) {
		var rv = true;
		this.$emit(dasherize(event), ...args, (v = false)=> rv = v);
		return rv;
	}
});