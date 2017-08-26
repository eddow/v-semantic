# [checkbox](https://semantic-ui.com/modules/checkbox.html)
## Examples
```html
	<s-checkbox label="Yes!" v-model="tchk" />
```
## Slots
The content is reported in the checkbox' label.

## Properties
- `label`: Text to display beside the checkbox
- `native-type`: `<button :type="nativeType" ...`
### Forwarded as classes
- `disabled: Boolean`
- `readOnly: Boolean`
- `toggle: Boolean`
- `slider: Boolean`
## Events
- `enable`
- `disable`
- `input(value: boolean)`
- `checked`
- `unchecked`
- `indeterminate`
These are cancelable events :
- `before-checked`
- `before-indeterminate`
- `before-determinate`
- `before-unchecked`
