# [Button](https://semantic-ui.com/elements/button.html)
## Examples
```html
	<s-button @click="whatever">
		<s-icon icon="save" slot="prepend" />
		button-l
	</s-button>
	<s-button icon="plus">
		button-i
	</s-button>
	<s-button>
		<s-icon icon="minus" slot="append" />
		button-r
	</s-button>
	<s-button>
		<s-icon icon="add circle" />
	</s-button>
	<s-button icon="add square" />
```
## Slots
Buttons have two slots (`prepend` and `append`) where an `icon` can be used.

## Properties
- `icon`: Specifying an icon here is a shortcut to introducing in the button `<icon type="given-value" slot="prepend" />`
- `native-type`: `<button :type="nativeType" ...`
### Forwarded as classes
- `attached: String`
- `basic: Boolean`
- `circular: Boolean`
- `compact: Boolean`
- `disabled: Boolean`
- `floated: String`
- `fluid: Boolean`
- `labeled: Boolean`
- `loading: Boolean`
- `negative: Boolean`
- `positive: Boolean`
- `primary: Boolean`
- `secondary: Boolean`
- `toggle: Boolean`
## Events
- `click`