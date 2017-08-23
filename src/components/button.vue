<template>
	<button
		type="button"
		:class="['ui', decoration.prepend, decoration.append, decoration.icon, 'button']"
		@click="click"
	>
		<icon v-if="icon" :icon="icon" />
		<slot name="prepend" />
		<slot />
		<slot name="append" />
	</button>
</template>

<script lang="ts">
//TODO: manage labels as we manage icons
import * as Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch} from 'vue-property-decorator'
import icon from './icon.vue'

@Component({components: {icon}})
export default class Button extends Vue {
	labeled: boolean
	rtled(pend) {
		return {
			prepend: 'left',
			append: 'right'
		}[pend];
	}
	get decoration() {
		this.labeled = false;
		var slotTag = side=> {
			return this.$slots[side][0].componentOptions.Ctor;
		},
		slotDec = side=> {
			console.assert(
				!this.$slots[side] || 1=== this.$slots[side].length,
				'Only one sided-slot allowed for buttons'
			);
			return this.$slots[side] &&
				icon == slotTag(side) &&
				(this.rtled(side)+' '+'labeled icon');
		};
		return {
			prepend: slotDec('prepend'),
			append: slotDec('append'),
			icon: this.icon ?
				(this.$slots.default?'labeled icon': 'icon') :
				//In the specific case there is only one icon in the default slot
				(!this.$slots.prepend && !this.$slots.append && this.$slots.default &&
					1=== this.$slots.default.length && icon=== slotTag('default')) ?
				'icon':
				''
		}
	}
	/**
	 * @description Position of the icon if specified
	 */
	@Prop({default: ''}) icon: string
	/**
	 * @description Text of the button
	 */
	@Prop() text: string
	click() { this.$emit('click'); }
}
</script>