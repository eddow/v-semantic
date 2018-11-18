# [Accordion](https://semantic-ui.com/modules/accordion.html)
> Nested accordions still behave chaotically!

## Exemple
```html
		<s-accordion>
			<s-panel title="What is a dog?">
			<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
			</s-panel>

			<s-panel title="What kinds of dogs are there?">
			<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
			</s-panel>
		</s-accordion>
```
## Slots
An `accordion` is a [panel](../concepts/panel.md) container, so panels are described in the main slot.
## Properties
- `defaultIcon: string` The icon of the items. Defaulted to `'dropdown'`
### Forwarded to classes
- `styled: boolean` Here defaulted to `true`!
### Forwarded to semantic configuration
- `exclusive`: boolean
- `on`: string
- `animateChildren`: boolean
- `closeNested`: boolean
- `collapsible`: boolean
- `duration`: number
### Model
The model type depends on the `exclusive` configuration
#### Exclusive = `true`/`undefined`
By default, accordions are exclusive (one panel shown at a time). In this case, the model is the `{string}` name of the displayed panel or null for none.
#### Exclusive = `false`
In case of multi-opened accordions, the model can be a list or a hash, depending of what value is provided. Anything provided here won't be replaced but modified internally.
##### Array
If an array is provided, that array is a `string[]` providing the name of the opened panels.
##### Hash
If a `{[panelName: string]: boolean}` hash is provided, it will indicate with `true` or `false` whether a panel is opened by name. Note, as an input, tru-ish and fals-ish values are accepted.
## Events
These events happen without arguments. Also, the events about closing only happen when a panel is explicitely closed, not when another one is exclusively opened
- `opening`
- `open`
- `closing`
- `close`
- `change`