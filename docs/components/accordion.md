# [Accordion](https://semantic-ui.com/modules/accordion.html)

## Slots
### default
The slot is quite just included in the dynamically-managed accordion-div. One could just use there div with class once `title` once `content`, or use the helper `bellow`.

A bellow can specify a title in a slot or in an attribute. Also, if no `title` slot is specified, an `icon` can be specified as an attribute.
Note: to remove the icon, specify `:icon="null"`.
## Properties

These properties forward directly to the jQuery initialisation :
- `exclusive`: boolean
- `on`: string
- `animateChildren`: boolean
- `closeNested`: boolean
- `collapsible`: boolean
- `duration`: number

## Events
These events happen without arguments. Also, the events about closing only happen when a bellow is explicitely closed, not when another one is exclusively opened
- `opening`
- `open`
- `closing`
- `close`
- `change`