export function path(name) {
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