# [Icon](https://semantic-ui.com/elements/icon.html#/definition)

The component contains no logic by itself but is taken into consideration when used within another component.

## Properties
- *`icon: string`: Specifies the icon name. Refer [here](https://semantic-ui.com/elements/icon.html#/icon) for the list of names.

## Icon compositions
The `icon` string can contain the `'+'` character to denote an icon composition. The classes appearing after a '+' will be additional icons. Any class appearing before any '+' is a group class.

Using `icon="+loading sun +user"` will generate :
```html
<i class="icons">
  <i class="big loading sun icon"></i>
  <i class="user icon"></i>
</i>
```

Using `icon="huge +loading sun +user"` will generate :
```html
<i class="huge icons">
  <i class="big loading sun icon"></i>
  <i class="user icon"></i>
</i>
```