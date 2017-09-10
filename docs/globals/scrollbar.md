# Scrollbars
## `Vue.prototype`
Each `Vue` component has the `$scrollBarSize` property that contains 2 numbers: `{width: w, height: h}` that correspond to the width and height of respectively vertical and horizontal scrollbars.
## CSS
Also, some CSS classes are made available globally:
- `width100lessSB` and `height100lessSB` that will give `calc( 100% - **px )` to fit the whole parent' width/height like if a scrollbar was shown.
- `paddingSBright` and `paddingSBbottom` define a `padding-right` (resp. `padding-bottom`) in pixels of the scrollbar size

## TODO
It could be made reactive for when the user changes the zoom/resolution/...