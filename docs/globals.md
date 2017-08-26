# Global changes to Vue

## Cancelables

```typescript
var CancelError = new Error('Canceled event');
Vue.mixin({
	methods: {
		$cancelEvent() {
			throw CancelError;
		},
		$cancelable(event, ...args) {
			try {
				this.$emit(event, ...args);
				return true;
			} catch(x) {
				if(CancelError!== x) throw x;
				return false;
			}
		}
	}
});
```

### In english
We can emit a "cancelable" event. Instead of `this.$emit('select', value);` you `this.$cancelable('select', value);`. That function call will return `true` in general, or `false` if the event had been "canceled".

To cancel an event, in the event procedure, one just has to `this.$cancelEvent()`. This will throw, so have 2 consequences :
- All the event handlers that still had to be executed won't be executed.
- The `$cancelable` call will return false

This is useful for preventible events like "before-open".

Notes:
- If you cancel an event that was emitted with simple `$emit`, the exception won't be caught