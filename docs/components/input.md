# [Input](https://semantic-ui.com/elements/input.html)

## Slots
Buttons have two slots (`prepend` and `append`) where an `icon`, a `button` or something with the class `label` can be used.

The `input` slot can also be given, it is defaulted to a simple text input. Its scope is composed of :
- `internalName` basically `<input name="...">` the name to give to the input 
- `placeholder`
- `value`
- `input` is a callback with one argument (the new value) as `value` is given and changing it won't emit anything
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