# [Tabs](https://semantic-ui.com/modules/tab.htmlhttps://semantic-ui.com/modules/tab.html)

## Exemple
```html
		<s-tab>
			<s-panel title="What is a dog?">
			<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
			</s-panel>

			<s-panel title="What kinds of dogs are there?">
			<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
			</s-panel>
		</s-tab>
```
## Slots
An `tabs` is a [panel](../concepts/panel.md) container, so panels are described in the main slot.

## Properties
- `defaultIcon: string` The icon of the items. Defaulted to `''`
- `attached: boolean` Defaulted to `true`, manage the `xxx atached` classes
- `position: 'top'|'bottom'|'left'|'right'` The *tabs*' position in regard to the content
### Forwarded to classes
- `type: 'tabular'|'pointing'|''` Here defaulted to `'tabular'`!
- `primary`
- `secondary`

### Model
The `{string}` model is the name of the selected tab.

## Future
There is no plan to implement the ajax tabs.