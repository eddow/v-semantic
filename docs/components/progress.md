# [Progress](https://semantic-ui.com/modules/progress.html)


## Exemple
```html
	<s-progress :percent="my_percent" />
```
## Slots
The default slot can specify the label (text under).
The property `label` can be used instead.
The priority is given to the status texts.

## Properties
The `v-model` is the status and raises the `status` event on change.
- `status: 'active'|'warning'|'success'|'error'`
Also,
- `label: string` can specify the label (if no slot is given and no status text specified)
- `ratio: boolean` is used to display the ratio (value/total) instead of the percentage

### Forwarded to classes
- `active`
- `bottom-attached`
- `disabled`
- `indicating`
- `inverted`
- `top-attached`
### Forwarded to semantic configuration
- `autoSuccess: boolean`
- `showActivity: boolean`
- `precision: number`
### Non-reactive
Texts can be defined statically: the value has to be set at object construction and any modification later will have no effect,
the initial value will remain used.
These texts can use four templated strings: percent, value, total, left.

Exemple: `active-text="Uloading {value} on {total} files"`

A text can be defined for the label per status
- `active-text`
- `error-text`
- `success-text`
- `warning-text`
The last one specifies the text inside the progress bar (and is still templated)
- `progress-text`
This is forwarded to the `percent` and `ratio` text of `semantic`. Also, the default ration text is `{v}/{t}` instead of `{v} of {t}`

## Events
These events happen without arguments. Also, the events about closing only happen when a panel is explicitely closed, not when another one is exclusively opened
- `opening`
- `open`
- `closing`
- `close`
- `change`