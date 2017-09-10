//unused file with procedures that might end up useful for table-column width mgt
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

import * as Vue from 'vue'

var scrollDiv = document.createElement('div'), sbWidth, sbHeight;
__assign(scrollDiv.style, {
	width: '100px',
	height: '100px',
	overflow: 'scroll',
	position: 'absolute',
	top: '-200px'
});

document.body.appendChild(scrollDiv);
//TODO: set this reactive with a 'on-resize' ?
Vue.set(Vue.prototype, '$scrollBarSize', {
	width: sbWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth,
	height: sbHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight
});

var head = document.head || document.getElementsByTagName('head')[0],
	style = document.createElement('style'),
	css = `/* Generated */
	.width100lessSB { width: calc( 100% - ${sbWidth}px ) !important; }
	.height100lessSB { height: calc( 100% - ${sbHeight}px ) !important; }
	.paddingSBright { padding-right: ${sbWidth}px !important; }
	.paddingSBbottom { padding-bottom: ${sbHeight}px !important; }`;
style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);