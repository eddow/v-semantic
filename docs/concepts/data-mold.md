# Data mold

Let's imagine that an application deals several times with some specific numbers (card, id, serial, ...) and wish to enhance their edition - using a specific mask in each `<input type="text">`, or even displaying (the string `"123-45678-9"` instead of the value `"123456789"`) or allow at each edition a drop-down (with flags for country-code for instance).

This would be a `"MySpecificSomethingNumber"` that has to be edited and showed each time the same. Should it be in a form or in a table for instance. (Note that all the following can apply for any even complex data that should fit in a table-column or be edited by one field in forms)

It is desirable therefore to write once for all the `data-mold` for that `"MySpecificSomethingNumber"` that will specify how to render it, how to edit it, if it needs something in its form label, etc.

A `data-mold` can even be written as a user-component, as it just needs to be included in a `modeled` (ie. `Form` or `Table`) to be available for usage.

An example has been given in the `test/3clr` folder - and is used in the `Form` and `Table` examples.

## The slots of a data-mold
First of all, each slot is optionally given. If a slot is not given, it will fall back to the more general mold until the default hard-coded value of `v-semantic`
All these slot scopes are `field` who has a `value`, a `model`, etc.
### Generic ones
#### input
This one gives an input, something the user can interract with. The value to read and write is `field.value` from the slot scope.
#### display
This one just displays the value without letting the user interract.
### Form-specific
#### append / prepend
They appear around the input/display.
Usually, `prepend` contains the label and `append` the error description.
#### field
If specified, it is used instead of any `input`/`display` ones
#### field-input / field-display
Used instead of `input`/`display` in a field if specified
### Table-specific
#### cell
If specified, it is used instead of any `input`/`display` ones
#### cell-input / cell-display
Used instead of `input`/`display` in a cell if specified