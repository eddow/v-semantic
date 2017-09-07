# [Form](https://semantic-ui.com/collections/form.html)

Forms use a bit of semantic for shaping and much internal management. For examlpe, the validation occurs through [json-schema](http://json-schema.org/) validation. and the error display is completely customizable.

There is a whole [concept](../concepts/form.md) to read about it to understand the API docs. There is much more complexity than what expressed here but here is the standard usage - that can be redundant but fast to grab without learning slope.
## Internal management

As `form` is [commanded](../concepts/commanded.md). Its commands will just be emitted as events (the `params` beeing the only argument).

### Fields
Forms come with their component `field` that automatise a big deal of model/field management. For instance, each field can specify a `prepend` and `append` slots. If a field has no `append` (or `prepend`) slot,
- the `append` slot will display the label of the field.
- the `prepend` slot will display the errors of the field.

The default slot just gives the input part of the field (so that the user can override the input keeping the label and error management) but one can override the whole providing a `field` slot.

All these slots can be scope-less or can be provided using a scope containing only `scope.model` that will be the *form*' model. This can be useful when the form' model is complex and can raise errors while computing.
```html
<s-form :model="selected && selected.somthing && selected.something.model">
	<s-field>
		<template for="input" scope="scope">
			<s-input :value="scope.model.computeStuff()">
```
This won't be displayed and raise no error, and is far shorter than :
```html
			<s-input :value="selected && selected.somthing && selected.something.model && selected.something.model.computeStuff()">
```

As noticed here, when scoped, the `input` slot is used instead of the default one.

#TODO:DOC
## Slots

- The default slot is the one displayed.
- The `empty` slot is displayed when no model is available

## Properties
- `model: any`
- `schema: any` should be a valid json-schema.