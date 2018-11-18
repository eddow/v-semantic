function compose(config, property, callback) {
	if(!callback) return;
	if(!config[property])
		config[property] = callback;
	else if(config[property].composed)
		config[property].composed.push(callback);
	else {
		function composed() {
			for(var cb of callee.composed)
				cb.apply(this, arguments);
		}
		composed.composed = [config[property], callback];
	}
}

module.exports = {compose};