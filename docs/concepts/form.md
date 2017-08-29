# Forms

Forms are much more developped than `semantic` did. Indeed, there is no intelligence behind semantic's form beside validation.
These can simply be used "manually".
```html
<div class="ui form">
  <div class="three fields">
    <div class="field">
      <label>First name</label>
      <input type="text" placeholder="First Name" v-model="person.firstName">
    </div>
    <div class="field">
      <label>Middle name</label>
      <input type="text" placeholder="Middle Name" v-model="person.middleName">
    </div>
    <div class="field">
      <label>Last name</label>
      <input type="text" placeholder="Last Name" v-model="person.lastName">
    </div>
  </div>
</div>
```

The purpose of the developpment on `forms` is to *make repetitive things unnecessary while letting the possibility to detail any specific case*. This might lead to some complications in appearance as it gives the programer several ways to reach the same sometimes; but once well understood, choices can be made clearly.

## The simplest : `field`
### Inside the `field`
Taking the example above, it could be rewritten like this:
```html
<s-form :model="person">
	<s-field name="firstName" label="First name" />
	<s-field name="middleName" label="Middle name" />
	<s-field name="lastName" label="Last name" />
</s-form>
```
#### `field` default slot
This was possible because all the fields needed an `<input type="text" />`. Now, let's imagine a check-box input :

```html
<s-form :model="person">
	<s-field name="optIn" label="Opted in">
		<input type="checkbox" v-model="user.optIn" />
	</s-field>
</s-form>
```

#### `Field.Input`
This was the worst case scenario, if the programer wants to describe exactly this how field  is rendered and nothing was generalised before.
Most of the time, it will just look like this :

```html
<s-form :model="person">
	...
	<s-field name="optIn" label="Opted in">
		<s-checkbox />
	</s-field>
</s-form>
```
`s-checkbox` is really described like this, without `v-model` nor input name - and, in the generated HTML, the label "Opted in" will be described by `<label for="optIn">...` and the checkbox with `<input type="checkbox" name="optIn" />`

This is because [`s-checkbox`](../components/checkbox.md) uses the `Field.Input` mixin (as [`s-input`](../components/input.md) does).
Refer [here](#creating-a-fieldinput) to write other `Field.Input` components

### Field-modifying form slot
Labels and errors are displayed in the field object, in so-called `prepend` and `append` slots. The last example was equivalent to this:
```html
	<s-field name="optIn">
		<template slot="prepend">
			<label for="optIn">
				Opted in
			</label>
		</template>
		<s-checkbox />
	</s-field>
```

Now, let's imagine we wish to use a `fancy-label`for each input, we could do this :

```html
<s-form :model="person">
	<template slot="prepend" scope="field">
		<fancy-label :for="field.internalName">
			{{field.label}}
		</fancy-label>
	</template>
	<s-field name="firstName" label="First name" />
	<s-field name="middleName" label="Middle name" />
	<s-field name="lastName" label="Last name" />
	<s-field name="optIn" label="Opted in">
		<s-checkbox />
	</s-field>
</s-form>
```

First of all, **all** the fields will be affected by the template here given **except** if they have a specific `prepend` slot.

In general, the scoped slot of the form is the static slot of the field. This works for `prepend`, `append`, `input` (this is the efault field slot) and `field` that override the whole, even prepend, append and default/input.

The scope is always the `field: VueComponent` object. It gives the programmer acces to valuable information like
- `label`
- `name` that is the given name
- `internalName` that is the given name or a generated name if needed
- `value` that is watched and is up-to-date, so that can be used as a `v-model`

- and also `info`, that is a property of field that is unused by `v-semantic` and just forwarded here - that can be useful to set an icon if the template uses an icon for instance.
# TODO: customised even more
# TODO: manage end-page notes
#### Creating a `Field.Input`
To create a custom `Field.Input`, one has to use it as a mixin. The component will therefore have `name` defined as a property and an `internalName` to use as the input name `<input :name="internalName" />` in order for the labels to be managed.

```typescript
import {Field} from 'v-semantic'

@Component({mixins:[Field.Input]})
class...
```

Beside, their `v-model` will be managed by the `field` that contains them **if they don't have any specified**.