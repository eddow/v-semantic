# [Bread-crumbs](https://semantic-ui.com/collections/breadcrumb.html)
Regular breadcrumb semantic-ui control

## Functionment
These breadcrumbs are supposed to work with `vue-router`. They are provided with an array of crumbs and display them.

A `Crumb` is a vue-router `Location` that has a `text` property. The location can provide a `name` for a named route, or a `fullPath` or whatever helps retrieve the route.

## Properties
The main property is of course `crumbs`: an array of `Crumbs`, namely, a route specification with a text.

With it comes the property `separator` - this is an icon class (defaulted to `'right angle'` that somewhat makes a ">") to include between the crumbs.