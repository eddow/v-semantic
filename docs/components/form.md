# [Form](https://semantic-ui.com/collections/form.html)

Forms use a bit of semantic for shaping and much internal management. For examlpe, the validation occurs through [json-schema](http://json-schema.org/) validation. and the error display is completely customizable.

There is a whole [concept](../concepts/form.md) to read about it to understand the API docs.
## Internal management

As `form` is [commanded](../concepts/commanded.md). Its commands will just be emitted as events (the `params` beeing the only argument).

### Fields
Forms come with their component `field` that automatise a big deal of model/field management. For instance, each field can specify a `prepend` and `append` slots. If a field has no `append` (or `prepend`) slot, it will use the `form`' `append` (or `prepend`) slot. If there is none,
- the `append` slot will display the label of the field.
- the `prepend` slot will display the errors of the field.

When described in the form, the `append` and `prepend` slot have a scope : the field `VueComponent`.

### v-model
Another behaviour of `Field.Input` is to attach its model to the field if none is specified. Here are two equivalent codes:
```html
<s-form :model="model">
	<s-field name="propX" label="A property">
		<s-input />
```

```html
<s-form :model="model">
	<s-field name="propX" label="A property">
		<s-input v-model="model.propX" />
```


#TODO:DOC
## Slots

- The `default` slot is the one displayed.
- The `prepend` and `append` will be used for each field until expressed otherwise.

## Properties
- `model: any`
- `schema: any` should be a valid json-schema.
- `display-errors: boolean`