let cacheElement: HTMLElement = null;
function getElement() {
	if(!cacheElement) {
		cacheElement = document.createElement('div');
		cacheElement.setAttribute('style', 'width:0; height:0; top:0; left:0; position:absolute;');
		document.body.prepend(cacheElement);
	}
	return cacheElement;
}

export function backgroundCssCache(...csss: string[]) {
	let cacheElement = getElement();
	for(let cs of csss) {
		let spec = cs.split(':');
		console.assert(spec.length <= 2, 'Css specification for cache is "[tag:]class1.class2"')
		let [tagSpec, cssSpec] = spec.length === 1 ?
				['div', spec[0]] : spec,
			elm = document.createElement('tagSpec');
		elm.setAttribute('class', cssSpec.replace(/\./g, ' '));
		cacheElement.appendChild(elm);
	}
}