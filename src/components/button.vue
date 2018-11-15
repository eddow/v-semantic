<template>
	<button
		:type="nativeType"
		:class="[cls, dynCls, 'vued']"
		@click="click"
	>
		<icon v-if="icon" :icon="icon" />
		<slot name="prepend" /><slot /><slot name="append" />
	</button>
</template>
<style>
.ui.button.vued > i.icons .icon:first-child {
	margin-right: 0;
}
</style>
<script lang="ts">
//TODO: manage labels as we manage icons
import Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic, {stringifyClass} from 'lib/classed'
import icon from './icon.vue'

//TODO: animated (visible/hidden content)
//TODO: toggle JS
@Semantic('button', {
	attached: String,
	basic: Boolean,
	circular: Boolean,
	compact: Boolean,
	disabled: Boolean,
	floated: String,
	fluid: Boolean,
	loading: Boolean,
	negative: Boolean,
	positive: Boolean,
	primary: Boolean,
	secondary: Boolean,
	toggle: Boolean
}, {components: {icon}})
export default class Button extends Vue {
	rtled(pend) {
		return {
			prepend: 'left',
			append: 'right'
		}[pend];
	}
	@Prop() labeled: boolean
	get dynCls() {
		var slotTag = side=> {
			return this.$slots[side][0] && this.$slots[side][0].componentOptions && this.$slots[side][0].componentOptions.Ctor;
		},
		slotDec = side=> {
			console.assert(
				!this.$slots[side] || 1=== this.$slots[side].length,
				'Only one sided-slot allowed for buttons'
			);
			return this.$slots[side] &&
				icon == slotTag(side) &&
					[this.labeled&&this.rtled(side)+' labeled', 'icon'];
		};
		return stringifyClass([
			slotDec('prepend'),
			slotDec('append'),
			this.icon ?
				(this.labeled?'labeled icon': 'icon') :
				//In the specific case there is only one icon in the default slot
				(!this.$slots.prepend && !this.$slots.append && this.$slots.default &&
					1=== this.$slots.default.length && icon=== slotTag('default')) ?
				'icon':
				''
		]);
	}
	/**
	 * @description Position of the icon if specified
	 */
	@Prop({default: ''}) icon: string
	/**
	 * @description Text of the button
	 */
	@Prop() text: string
	@Prop({default: 'button'}) nativeType: string

	@Emit() click() {}
}
</script>