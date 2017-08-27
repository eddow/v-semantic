# [Dimming](https://semantic-ui.com/modules/dimmer.html)

The customizable dimmers come in two components and loading that can just bind a text comes as a directive.

The two components are really similar, one is `dimmable` and surrounds the part to dimm down. The second is `dimmer` and is inside the `<div>` or other to dimm down. There are few nuances for ease and shortcuts.
## Usages
```html
<div>
	<dimmer v-model="dimmed">
		Hi!
	</dimmer>
	<content />
</div>
```

```html
<dimmable v-model="dimmed" text="Hi!">
	<content />
</dimmable>
```

```html
<dimmable v-model="dimmed">
	<h2 slot="dimmer">
		Hi!
	</h2>
	<content />
</dimmable>
```
## Commonly to `dimmer` and `dimmable`
### Properties
The model is `visible: boolean` (event: `change`) specifying whether the dimmer is active or not.
#### Forwarded from the element classes
- `variation: 'simple'|'inverted'|''` 
#### Forwarded from the configuration
- `on: string`
- `duration: {show: number, hide:number}`
- `transition: string`
### Events
- `show`
- `hide`
- `change(visible: boolean)`
## Specificity of `dimmer`
The property `page: boolean` allows the `dimmer` not to dimm its container but the whole page.

## Specificity of `dimmable`
The `dimmable`' dimmer content can be given in the `dimmer` slot. There is a predefined slot who displays these two properties:
- `icon: string`
- `text: string`

Also, this property:
- `blurring: boolean`

Last but not least, the `dimmer` slot of a dimmable is already surrounded by `div.content div.center`, so it is less configurable but shorter as a shortcut.

# [loading](https://semantic-ui.com/elements/loader.html)

The directive `v-loading` allows to dimm an element and display a loading icon with a text on it.

## Usage
```html
	<div v-loading.modifier1.modifier2="loadingValue">
```
`loadingValue` is of course a component' data.
This data can take a falsy value to hide the loading-dimmer (for regular state) or be shown
- If it is a `string`, this will be the message displayed
- If it is `true`, only the icon will be displayed

An easy way to manage a boolean and use a string is
```html
	<s-button @click="loading=!loading">Load !</button>
	<div v-loading="loading && `Loading references...`">
		...
```
### Modifiers
- `blurring`
- `indeterminate`
- `inverted`
- Size specification : `mini`, `tiny`, `small`, `medium`, `large`
