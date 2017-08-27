# [Accordion](https://semantic-ui.com/modules/accordion.html)
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
An `accordion` is a [panel](./panel.md) container, so panels are described in the main slot.
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

## Events
These events happen without arguments. Also, the events about closing only happen when a panel is explicitely closed, not when another one is exclusively opened
- `opening`
- `open`
- `closing`
- `close`
- `change`