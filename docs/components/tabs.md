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
An `tabs` is a [panel](./panel.md) container, so panels are described in the main slot.

## Properties
- `defaultIcon: string` The icon of the items. Defaulted to `''`
- `attached: boolean` Defaulted to `true`, manage the `xxx atached` classes
- `position: 'top'|'bottom'|'left'|'right'` The *tabs*' position in regard to the content
### Forwarded to classes
- `type: 'tabular'|'pointing'|''` Here defaulted to `'tabular'`!
- `primary`
- `secondary`

## Future
I am quite unhappy of this one component. It is a bunch of copy-paste because the position is tough to generalise; it seems the easier to just re-write a different template for each position (and even this ought to be done better than by v-else-if) It might even just become a `<s-top-tabs>` for instance.

Any idea is of course welcomed.

Also, the horizontal version (`position: 'left'|'right'`) has not been worked at all; the column sizing is still in tests hard-coded values for exemple.

Also, I had no intention to implement the ajax tabs - everything is of course discussable.