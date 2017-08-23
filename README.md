# semantic-vue

Integration of [semantic-ui](https://semantic-ui.com) with [vue.js](https://vuejs.org/)

The purpose of the integration is to allow some logic-level approach - ex: the tables are defined by column and not by rows - and to integrate the `jQuery` for it to be invisible to the programer. `jQuery` of course still needs to be installed, but there is no need to use it.

Most options in `semantic-ui` are done by specifying classes - these are not forwarded and the classes can be set manually. One will have to have the `semantic-ui` cheat-sheet opened while using `semantic-vue`.

## Installation
There is no npm deployment yet as the library is new.
```
git clone
node fuse
```
This will produce `dist/semantic-vue.js`
# Components
- [flag](docs/components/flag.md)
- [icon](docs/components/icon.md)
- [label](docs/components/label.md)
- [button](docs/components/button.md)
- [input](docs/components/input.md)
- [select](docs/components/select.md)
- [table](docs/components/table.md)