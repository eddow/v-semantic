[![npm](https://img.shields.io/npm/v/v-semantic.svg)](https://www.npmjs.com/package/v-semantic)

# v-semantic

Integration of [semantic-ui2](https://semantic-ui.com) with [vue.js2](https://vuejs.org/)

The purpose of the integration is to allow some logic-level approach - ex: the tables are defined by column and not by rows - and to integrate the `jQuery` for it to be invisible to the programer. `jQuery` of course still needs to be installed, but there is no need to use it.

The classes specific to a component are set as boolean properties of the component. These two codes are equivalent :
```html
<button primary>Click me!</button>
<button class="primary">Click me!</button>
```

There is a [live demo/preview](https://rawgit.com/eddow/v-semantic/master/test/index.html)

## Installation
Beta stade: 

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
Requiring the main library will export each components and a `default` that lets you `Vue.install(...)`.
The `prefix` (default `"s"`) option will be used before each name of component for registration ('button' --> `<s-button />`)

## Bundling
This library integrate a straightforward way bundling with [fuse-box](fuse-box.org). If you make a project with this bundler, it will be straight-forward.

 Unfortunately, fuse-box poorly makes universal bundles. To bundle `v-semantic`, you can simply bundle the sources.
## Usage
This library integrate a straightforward way bundling with [fuse-box](fuse-box.org). If you make a project with this bundler, it will be straight-forward.

```javascript
import vs from 'v-semantic'
Vue.use(vs);
```
Unfortunately, fuse-box poorly makes universal bundles. To bundle `v-semantic`, you can simply bundle the sources.
The sources entry point is in `v-semantic/src/index.ts`
```javascript
import vs from 'v-semantic/src'
Vue.use(vs);
```
### For development

```
git clone
node fuse
```
Beware of [yalc](https://www.npmjs.com/package/yalc) : it happens that in order to develop `v-semantic`, some libraries `v-semantic` uses need to be PR-ed. Therefore, the new libraries are used as they are modified - localy. If you end up with a yalc reference in your `package.json` (this occurs only for deployment) ask for the correct version and PR to download to be up-to-date at that moment.

This will produce `dist/v-semantic.js`

There is no plan to have one-source-file-per-component, it's not a huge library.

# Components

#### beta
These should work and implement their intended final behaviour, even if details can still change
- [flag](./docs/components/flag.md)
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
#### alpha
- [table](./docs/components/table.md)
- [tabs](./docs/components/tabs.md)

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
- progress
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
Some of `semantic-ui` functionalities are just classes to add to some `div` that I don't see the point of making a custom control out of.
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
- breadcrumbs (integration with vue-router)
- forms (validation agains json-schema AND/OR semantic validation system)
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
I contribute for free with drive, passion and time.
If you like what I do, you can promote me to do it more.

These are the only *like* buttons that have a real effect.

- [paypal.me/eeddow](https://www.paypal.me/eeddow)
- ETH: 0xb79b61130bc5726ddab6c1d59c3e0479afe69540
- BTC: 38HbE73qfLf2qP6Ce1ppYwZf458nugS3KY
- BCH: 3K81iYWwLZuWXY1qHcBL559FYraUqKMkEp
### Also,
If you wanna help, please do.

If you are interested in the development of a component, please leave a comment.