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

## Custom columns
In a custom column type, (a component that just contains a column), the injection `table` is available and refers to the table the column is in.

A custom column must contain only a `ripper` and provide two slots (an unscoped `header` and a scoped `default`). It should also use the `managedColumn` mixin from the `Table`

```typescript
import {Ripper} from 'vue-ripper'
import {components} from 'v-semantic'
@Component({
	components: {Ripper},
	mixins: [components.Table.managedColumn]
})
```

### CheckboxColumn

The checkbox-column can be used for boolean values as well as for selection. There is no "multi-select" in the table, it is achieved by placing a checkbox-column at the begining.

If no header is specified (the same way than with regular columns), a "check-all" checkbox is placed in the header
#### Slots
The `header` slot allows to describe a complex header. It has in its scope:
- `allSelected` a boolean value bound to the select-all situation (`true`/`false`/`null`)
- `setSelection` is a callback that takes one argument (boolean/array) and behaves exactly like setting the `selection` does

The default slot allows to replace the checkbox by another component. If used its scope is the following:
- `row` is the row the cell applies to
- `checked` is bound to the boolean value (checked or not) for this cell
- `select` and `unselect` are two callbacks that take the row as an argument to (de)select the row.
#### Properties
- `header` can be specified if a `header` slot is not given
- `property` is the boolean property in the row to access. Default to `selected`

Note that a special care is taken to make the property non-enumerable if it didn't exist previously, and for it to be observed by Vue.

With this, the selection can be found by `rows.filter(x=>x.selected)`. Though, the selection is also kept beside by the component.

- `selection` is the model (emitting the event `selection-change`) and can be watched deeply : if the parent doesn't change it, it will remain the same `Array` that will be modified.

The parent can also set the `selection` to a non-array value. In this case, the model will be immediately updated to the effective array of selection. Also, in one of the following case, the column default value that will be used when the boolean is not specified in a row will be updated, so that each now row added has its selection value is set accordingly.
  - If set to a falsy value, the selection will become "none" `[]`
	- If set to `true`, the selection will become "all"
	- If set to the array `table.rows`, all will be selected and the selection object will be cloned (so that "select all" can be 	written `selection = rows;`)
	