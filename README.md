[![npm](https://img.shields.io/npm/v/v-semantic.svg)](https://www.npmjs.com/package/v-semantic)

# v-semantic

Integration of [semantic-ui2](https://semantic-ui.com) with [vue.js2](https://vuejs.org/)

The purpose of the integration is to allow some logic-level approach - ex: the tables are defined by column and not by rows - and to integrate the `jQuery` for it to be invisible to the programer. `jQuery` of course still needs to be installed, but there is no need to use it.

The css-classes specific to a component are set as boolean properties of the component. These two codes are equivalent :
```html
<button primary>Click me!</button>
<button class="primary">Click me!</button>
```

There is a [live demo/preview](https://rawgit.com/eddow/v-semantic/master/test/run/index.html)

## Installation
For usage:
```
npm install v-semantic --save
```
```typescript
import vs from 'v-semantic'
Vue.install(vs);
//- or -
import vs from 'v-semantic'
Vue.install(vs, {prefix: 'x'});
//- or -
import {Modal, Command, Button} from 'v-semantic'

@Component({
	components: {Modal, Button},
	directives: {Command}
})
```
Requiring the main library will export each components and directives, and a `default` that lets you `Vue.install(...)`.
The `prefix` (default `"s"`) option will be used before each name of component for registration ('button' --> `<s-button />`)

### For development

```
git clone
npm test
```

This will produce `test/run/test.js` and therefore, the file `test/run/index.html` will be usable directly in the browser. To compile the library only, use `npm run prepack`

There is no plan to have one-source-file-per-component, it's not a huge library.

# Components

These should work and implement their intended final behaviour, even if details can still change
- [flag](./docs/components/flag.md)
- [breadcrumbs](./docs/components/breadcrumbs.md)
- [icon](./docs/components/icon.md)
- [button](./docs/components/button.md)
- [input](./docs/components/input.md)
- [select](./docs/components/select.md)
- [accordion](./docs/components/accordion.md)
- [modal](./docs/components/modal.md)
- [checkbox](./docs/components/checkbox.md)
- [dimming](./docs/components/dimm.md)
- [form](./docs/components/form.md)
- [progress](./docs/components/progress.md)
- [table](./docs/components/table.md)
- [tabs](./docs/components/tabs.md)

# Globals helpers
- [scroll-bar sizes](./docs/globals/scrollbar.md)
# Concepts
These have been developped deeper in this library even not completely bound to semantic. It is interwined with semantic though.
- [form](./docs/concepts/form.md)
- [commanded](./docs/concepts/commanded.md)
- [panel](./docs/concepts/panel.md)
# Not implemented yet
## Components
- menus
- radios
- embed (iframe)
- sidebar
- search
- shape
- rating
- reveal?
## Directives
- popup
- visibility
- messages

## No plans to implement
Some of `semantic-ui` functionalities are just classes to add to some `div` for which the point of making a custom control out of is discussable.
- container
- divider
- header
- image
- list
- rail
- segment
- grid
- advertisement
- card
- transitions (Vue has it)

## Things that might perhaps be automated
- label
- menu (integration with vue-router)
- message (toasters? ...?)
- nag
- sticky
- lists
  - labels
  - buttons
  - comments
  - feeds
  - items
  - statistics
  - steps

## Support development
If you wanna help, please do.

If you are interested in the development of a component, please leave a comment.