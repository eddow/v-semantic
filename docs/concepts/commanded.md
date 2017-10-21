# Commanded

## Exemple
```typescript
import Command from 'v-semantic'

@Component
class MyComponent extends Command.Commanded {
	
	command(command: string, params?: any) {
		//...
	}
	...
```
```html
<my-component ...>
	...
	<s-button v-command:send>
```
## In english
A `Commanded` component just allows components placed inside to use the `v-command` directive to invoke its `command` method.

## Usages
### Conter-indications
This directive can only apply on **components** emitting the `click` event.
So, this will **not** work:
```html
<button v-command:do />
```
Though, this could be done.
### Agnosticity
Beside the "cuteness" of `<s-button v-command:shlab />` instead of `<s-button @click="doSomething('shlab')" />`, this is useful when the control describing the button doesn't know what `doSomething` is.

Example : A pannel of buttons with save/reset/export/... to have at the end of each form. The panel can be described in a custom control, then used in each form it is needed into, their button will just specify `v-command:save` etc., then the form in which the panel is included will receive that command.

## Value
The command value is given as the parameter. If the value is a function, it will be called before the command is effected.

If the return value is `false`, the command will **not** be executed. If it is `undefined` or `true`, the command will be executed without parameter.
For any other value, the command will be executed with the return value a parameter.

```html
	<input v-model="myValue" />
	<s-button command:ok="validateOk" />
```

```ts
{
	validateOk() {
		return !!this.myValue && this.myValue;
	}
}
```