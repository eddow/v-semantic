/// Transforms `a.b[2].c` into a.b.2.c
export function path(name: string): string|void {
	if(!name) return;
	var keys = [];
	for(let key of name.split('.')) {
		let subs = /^(.*?)(\[.*\])?$/.exec(key);
		keys.push(subs![1]);
		if(subs![2]) keys.push(...subs![2].split(']['));
	}
	return keys.join('.');
}

function recur(obj: any, path: string): any {
	if(!obj || !path) return;
	var keys = path.split('.'), lvalue;
	lvalue = keys.pop();
	for(let key of keys) if(!(obj = obj[key])) return;
	return {obj, key: lvalue};
}

/// Set a value of an object considering its path - return true in case of successful affectation
export function set(obj: any, path: string, value: any): boolean {
	var lv = recur(obj, path);
	if(!lv) return false;
	lv.obj[lv.key] = value;
	return true;
}

/// Delete a value of an object considering its path - return true in case of successful affectation
export function del(obj: any, path: string): boolean {
	var lv = recur(obj, path);
	if(!lv) return false;
	delete lv.obj[lv.key];
	return true;
}

/// Get a value of an object considering its path - return `undefined` if a property was missing along the path
export function get(obj: any, path: string): any {
	var lv = recur(obj, path);
	return lv && lv.obj[lv.key];
}

/// Deeply compare `Objects` even if their references are different
export function equals(x: any, y: any): boolean {
	if(x===y) return true;
	if(!x || !y || 'object'!== typeof x || 'object'!== typeof y ||
		x.constructor !== y.constructor ||
		x instanceof Function || y instanceof Function ||
		x instanceof RegExp || y instanceof RegExp ||
		((Array.isArray(x) || Array.isArray(y)) && x.length !== y.length)
	)
		return false;

	if(x instanceof Date || y instanceof Date)
		return x instanceof Date && y instanceof Date && x.valueOf() == y.valueOf();

	var p = Object.keys(x);
	return Object.keys(y).every(function (i) { return !~p.indexOf(i); }) &&
			p.every(function (i) { return equals(x[i], y[i]); });
}

//Can be used for deep cloning
export function copy(src: any|any[], dst?: any|any[]): any {
	if(src instanceof Array)
		return [].concat(<any>src).map((x: any)=> copy(x));
	if(!src || !src.constructor || Object!== src.constructor)
		return src;
	if(!dst || !dst.constructor || Object!== dst.constructor)
		dst = {};
	for(let key in src) {
		dst[key] = copy(src[key], dst[key]);
	}
	return dst;
}