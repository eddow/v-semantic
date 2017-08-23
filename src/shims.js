var $;
if('undefined'!== typeof jQuery) $ = jQuery;
else {
	var jq = require('jquery');
	if('undefined'!== typeof jQuery) $ = jQuery;
	else {
		$ = jq.default || jq;
	}
}
exports.$ = $;
