export function path(name) {
	if(!name) return;
	var keys = [];
	for(let key of name.split('.')) {
		let subs = /^(.*?)(\[.*\])?$/.exec(key);
		keys.push(subs[1]);
		if(subs[2]) keys.push(...subs[2].split(']['));
	}
	return keys.join('.');
}

function recur(obj, path) {
	if(!obj || !path) return;
	var keys = path.split('.'), lvalue;
	lvalue = keys.pop();
	for(let key of keys) if(!(obj = obj[key])) return;
	return {obj, key: lvalue};
}

export function set(obj, path, value) {
	var lv = recur(obj, path);
	if(!lv) return false;
	if(undefined=== value) delete lv.obj[lv.key];
	else lv.obj[lv.key] = value;
	return true;
}
export function get(obj, path) {
	var lv = recur(obj, path);
	return lv && lv.obj[lv.key];
}
// https://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects/16788517#16788517
export function equals(x, y) {
	if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
	// after this just checking type of one would be enough
	if (x.constructor !== y.constructor) { return false; }
	// if they are functions, they should exactly refer to same one (because of closures)
	if (x instanceof Function) { return x === y; }
	// if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
	if (x instanceof RegExp) { return x === y; }
	if (x === y || x.valueOf() === y.valueOf()) { return true; }
	if (Array.isArray(x) && x.length !== y.length) { return false; }

	// if they are dates, they must had equal valueOf
	if (x instanceof Date) { return false; }

	// if they are strictly equal, they both need to be object at least
	if (!(x instanceof Object)) { return false; }
	if (!(y instanceof Object)) { return false; }

	// recursive object equality check
	var p = Object.keys(x);
	return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
			p.every(function (i) { return equals(x[i], y[i]); });
}

//Can be used for deep cloning
export function copy(src: any, dst?) {
	if(src instanceof Array)
		return [].concat(src).map(x=> copy(x));
	if(!src || !src.constructor || Object!== src.constructor)
		return src;
	if(!dst || !dst.constructor || Object!== dst.constructor)
		dst = {};
	for(let key in src) {
		dst[key] = copy(src[key], dst[key]);
	}
	return dst;
}