# [Table](https://semantic-ui.com/collections/table.html)
## Slots
The default slot contains the columns to display.
## Proprieties
The `v-model` is the current row : the one the user clicked on. One can set it to another row with an affectation or bind to it. (note: the current row is an item from the provided `rows`)

Vue's magic is that : if `v-model` is not used, no row will be marked current. If you care about the current row, it will be marked as such. For ui consistency, it is advised to use the attribute `selectable` that basically just shows `:hover` and add a dynamic side.
- `rows`: `any[]` is the list of item to display
- `row-class`: `(row: any)=> string` Gather the classes that apply to `row`
- `id-property`: `string` allows the table to retrieve the id of a row
- `body-height`: `number` specifies the height of the body in pixel. *Once specified* a lot of things happen (in the css) - this is meant to allow a scroll-bar under the column headers - some css/js skill is still needed for the 2-pixel difference between columns.
## Events

# Columns
## Slots
 Each column has two slots : `header` and the default scoped slot whose scope contains the `row` property.
```html
<s-column>
	<template slot="header">My property</template>
	<template scope="scope">{{scope.row.myProp}}</template>
</s-column>
```

## Proprieties
- `property` gives the property of the row this column displays. For now, it is just given to retrieve the value when no cell template is provided.
- `header` gives the text in the header if no template is provided
## Events