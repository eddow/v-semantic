# [Input](https://semantic-ui.com/elements/input.html)

## Slots
Buttons have two slots (`prepend` and `append`) where an `icon`, a `button` or something with the class `label` can be used.

The `input` slot can also be given to replace the `<input type="text">` used by default.

## Properties
The `v-model` is the value and raises the `input` event on change.
- `placeholder: string`
- `name` is the native input name (if none is given, one will be generated)
### Forwarded as semantic class
- `loading: boolean`
- `disabled: boolean`
- `error: boolean`
- `transparent: boolean`
- `fluid: boolean`