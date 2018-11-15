module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:vue/essential'
	],
	env: {
		es6: true,
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 7,
		sourceType: 'module',
		ecmaFeatures: {
			experimentalObjectRestSpread: true
		}
	},
	rules: {
		'no-unused-vars': 1
	}
};