export function dasherize(s: string, separator:string = '-'): string {
	return s.replace(/\B([A-Z])/g, `${separator}$1`).toLowerCase();
};
export function camelize(s: string, separator:string = '-'): string {
	var index, word, words, _i, _len;
	words = s.split(separator);
	for (index = _i = 0, _len = words.length; _i < _len; index = ++_i) {
			word = words[index].charAt(0).toUpperCase();
			words[index] = word + words[index].substr(1);
	}
	return words.join('');
};
export function capitalizeFirstLetter(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export function capitalizeEachWord(s: string): string {
	var index, word, words, _i, _len;
	words = s.split(" ");
	for (index = _i = 0, _len = words.length; _i < _len; index = ++_i) {
			word = words[index].charAt(0).toUpperCase();
			words[index] = word + words[index].substr(1);
	}
	return words.join(" ");
};