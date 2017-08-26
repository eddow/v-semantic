# v-semantic

Integration of [semantic-ui2](https://semantic-ui.com) with [vue.js2](https://vuejs.org/)

The purpose of the integration is to allow some logic-level approach - ex: the tables are defined by column and not by rows - and to integrate the `jQuery` for it to be invisible to the programer. `jQuery` of course still needs to be installed, but there is no need to use it.

The classes specific to a component are set as boolean properties of the component. These two codes are equivalent :
```html
<button primary>Click me!</button>
<button class="primary">Click me!</button>
```

## Installation
For usage:

*Beware this is under heavy development* The version will remain `0.x.y` until it sounds like finished. Thought, the documentation follows the implementation - what is documented ought to be usable.
```
npm install v-semantic --save
```
### For development

```
git clone
node fuse
```
Beware of [yalc](https://www.npmjs.com/package/yalc) : it happens that in order to develop `v-semantic`, some libraries `v-semantic` uses need to be PR-ed. Therefore, the new libraries are used as they are modified - localy. If you end up with a yalc reference in your `package.json` (this occurs only for deployment) ask for the correct version and PR to download to be up-to-date at that moment.

This will produce `dist/v-semantic.js`

Requiring the main library will export each components and a `default` that lets you `Vue.install(...)`.

There is no plan to have one-source-file-per-component, it's not a huge library.

# Components
- [flag](docs/components/flag.md)
- [icon](docs/components/icon.md)
- [label](docs/components/label.md)
- [button](docs/components/button.md)
- [input](docs/components/input.md)
- [select](docs/components/select.md)
- [accordion](docs/components/accordion.md)
- [table](docs/components/table.md)
- [modal](docs/components/modal.md)
- [checkbox](docs/components/checkbos.md)

[Global implementations](docs/globals.md) have been done too
# Not implemented yet
## Todos
As this is intended for broad audience, a list of fiddle/examples could definitely help
### Components
By order planified
- tabs
- menus
- radios
- embed (iframe)
- progress
- sidebar
- search
- shape
- rating
- reveal
### Directives
- loader
- dimmer
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

## Things that will perhaps be automated
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
- BTC: 39ybn3KGNUvZrhifaLJcf4cJdzkGMdfAMT
- BCH: 3K81iYWwLZuWXY1qHcBL559FYraUqKMkEp
### Also,
If you wanna help, please.

If you are interested in the development of a component, please leave a comment