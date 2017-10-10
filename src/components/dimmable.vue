<template>
	<div :class="cls">
		<dimmer :visible="visible"
			:variation="variation" :closable="closable" :on="on" :duration="duration" :transition="transition"
			@show="$emit('show')" @hide="$emit('hide')" @change="v=> $emit('change', v)">
			<div class="content">
				<div class="center">
					<slot name="dimmer">
						<h2 class="ui inverted icon header">
							<icon v-if="icon" :icon="icon" />
							{{message}}
						</h2>
					</slot>
				</div>
			</div>
		</dimmer>
		<slot />
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Dimmer from './dimmer.vue'
import Icon from './icon.vue'
import Semantic from 'lib/classed'

@Semantic('dimmable', {
	blurring: Boolean
}, {
	components: {Dimmer, Icon}
})
export default class Dimmable extends Vue {
	@Prop({default: ''}) variation: 'simple'|'inverted'|''
	@Prop() closable: 'auto'|boolean
	@Prop() on: string
	@Prop() duration: {show: number, hide:number}
	@Prop() transition: string
	@Prop() icon: string
	@Prop() message: string
	@Model('change') visible: boolean
}
</script>