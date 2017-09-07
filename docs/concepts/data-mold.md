# Data mold

Let's imagine that an application deals several times with some specific numbers (card, id, serial, ...) and wish to enhance their edition - using a specific mask in each `<input type="text">`, or even displaying (the string `"123-45678-9"` instead of the value `"123456789"`) or allow at each edition a drop-down (with flags for country-code for instance).

This would be a `"MySpecificSomethingNumber"` that has to be edited and showed each time the same. Should it be in a form or in a table for instance. (Note that all the following can apply for any even complex data that should fit in a table-column or be edited by one field in forms)

It is desirable therefore to write once for all the `data-mold` for that `"MySpecificSomethingNumber"` that will specify how to render it, how to edit it, if it needs something in its form label, etc.

A `data-mold` can even be written as a user-component, as it just needs to be included in a `modeled` (ie. `Form` or `Table`) to be available for usage.