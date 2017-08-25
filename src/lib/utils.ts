export function idSpace(pfx = '_') {
	var cpt = 0;
	return function() {
		cpt = (1+cpt) % (Number.MAX_SAFE_INTEGER-1);
		return pfx+cpt.toString(36)+Math.random().toString(36).substr(1);
	}
}