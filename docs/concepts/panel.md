# Panel (this library concept)
A panel is basically a content and a title that is supposed to be ripped apart. It is used for exemple in [accordion](./accordion.md) and [tabs](./tabs.md).

A panel has no reason to be outside of a panel container (it will show an injection error even), this is a sub-component of other components

## Slot
The main slot is the content of the panel. A `title` slot can be provided too.

## Properties
If no title slot is provided, these two properties are used:
- `title: string`
- `icon: string` If not specified, the container provides a default icon (`'dropdown'` for `accordion` and `''` for `tabs`)