import * as Vue from 'vue'
var ignoreWarnings = 0;
Vue.config.warnHandler = function(msg, vm, trace) {
	console.assert(0<ignoreWarnings, '[Vue warn]: '+msg+trace)
}
Vue.warnIgnore = cb=> {
	++ignoreWarnings;
	try { return cb(); }
	finally { --ignoreWarnings; }
}