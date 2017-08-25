//unused file with procedures that might end up useful one day
import * as onResize from 'resize-event'
import {$} from 'lib/shims'

function css2nbr(el, cls) {
	return /^(\w*)px$/.exec(el.css(cls))[1];	//On bad value: /watch?v=VLJf_Mp03to
}
function outerWidth(el) {
	return +
		css2nbr(el, 'margin-right')+
		css2nbr(el, 'margin-left')+
		css2nbr(el, 'border-right-width')+
		css2nbr(el, 'border-left-width');
}
function innerWidth(el) {
	return +
		css2nbr(el, 'padding-right')+
		css2nbr(el, 'padding-left');
}