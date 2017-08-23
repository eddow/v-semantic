# [Table](https://semantic-ui.com/collections/table.html)
## Slots
The default slot contains the columns to display.
## Proprieties
- `rows`: `any[]` is the list of item to display
- `row-class`: `(row: any)=> string` Gather the classes that apply to `row`
- `id-property`: `string` allows the table to retrieve the id of a row
## Events

# Columns
## Slots
 Each column has two slots : `header` and the scoped slot `cell` whose scope contains the `row` property.
```html
<s-column>
	<template slot="header">My property</template>
	<template slot="cell" scope="scope">{{scope.row.myProp}}</template>
</s-column>
```

## Proprieties
- `property` gives the property of the row this column displays. For now, it is just given to retrieve the value when no cell template is provided.
- `header` gives the text in the header if no template is provided
## Events