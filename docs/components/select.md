# [Select](https://semantic-ui.com/modules/dropdown.html)

## Slots
### default
The default slot is the menu. It can be filled with `<s-option>` that are basically short-cuts for `<div class="item">` with these two proprieties:
- `value`
- `text`

Note: One can give a different text and html content to the option by giving the attribute and a content. When semantic-ui refers to text, it refers to the attribute content.

### bar
The bar is the closed combo-box. If not given, it will default to 
```html
<div v-if="placeholder" class="default text">{{placeholder}}</div>
<span class="text">{{text}}</span>
<i v-if="icon" :class="[icon, 'icon']"></i>
```
## Properties
The `v-model` is the selected value and raises the `select` event on change.

If no `bar` named-slot is given, it will display:
- `icon` (default: 'dropdown')
- `text` (also modified by code and user)
- `placeholder`

These properties forward directly to the jQuery initialisation :
- `on`: string
- `forceSelection`: boolean
- `allowCategorySelection`: boolean
- `direction`: 'auto'|'upward'|'downward'
- `keepOnScreen`: boolean
- `fullTextSearch`: boolean|'exact'
- `showOnFocus`: boolean
- `allowTab`: boolean
- `transition`: 'auto'|'slide down'|'slide up'
- `duration`: number
- `minCharacters`: number
- `match`: 'both'|'text'|'value'
- `preserveHTML`: boolean
- `action`: 'activate'|'select'|'combo'|'nothing'|'hide'|'command'
In the case of `command`, it will raise the `command` event and take no other action on selection.
## Events
- `change(value)` is raised when the value changed
- `command(value)` is raised when a value is clicked and `action` is `command`
- `add(value, text, element)` when an element is added
- `remove(value, text, element)` when an element is removed
- `noResult(searchValue)` when a research returns an empty result
## Methods
- `hide(): void` - can cancel the operation by throwing `"cancel"`
- `show(): void` - can cancel the operation by throwing `"cancel"`
- `visible(): boolean`
- `clear(): void`

## TODO-s
The multiple selection is still untested