# [Label](https://semantic-ui.com/modules/modal.html)

## Usage
### The modal
Use the `v-model` to get the modal' invoker.
- the invoker needs to have a unique name in the data
- the invoker doesn't need to be previously declared in the data
```html
<s-modal v-model="myModal1">
  ...
</s-modal>
```
### Outside of the modal
The invoker can be used outside of the modal to open it.
```html
<s-button @click="myModal1(click)">Open!</s-button>
```
The invoker can be called with a function as argument or no argument and will return a promise.
### Inside of the modal
Inside of the modal, a code just has to call the invoker with a string argument that will be the "return value" of the modal.
```html
<s-button @click="myModal1('send')">Send!</s-button>
```
The directive `modal` can be used as a shortcut to the simple case `@click="xxxModal(command)` is :
```html
<s-button v-modal:send>Send!</s-button>
```
### Programatically
Invoking the modal will return a promise that will fail if the given command is `'cancel'` and succeed for other values giving the command as a value

The specified call-back function will be called only in case of promise resolution (when the command is not `'cancel'`)
## Slots
A `header` slot can be given. If not, a `header` property can be given.

## Properties
- `header` to display if no `header` slot is given
### Programmatic classes:
- `inverted: Boolean`
- `blurring: Boolean`
- `detachable: Boolean`
- `autofocus: Boolean`
- `observeChanges: Boolean`
- `allowMultiple: Boolean`
- `keyboardShortcuts: Boolean`
- `offset: Number`
- `closable: Boolean`
- //todo: dimmerSettings?
- `transition: String`
- `duration: Number`
- `queue: Boolean`
### Content classes :
- `scrolling`
- `image`
## Events
- `visible`
- `hidden`
- `set-callback`: sets the v-model