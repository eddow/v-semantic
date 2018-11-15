<template>
	<div :class="cls">
		<pimp v-model="panels"><slot /></pimp>
		<template v-for="(panel, uid) in panels">
			<div is="ripped"
				:key="'t'+uid"
				class="title"
				template="title"
				:ripper="panel"
			/>
			<div is="ripped"
				:key="'c'+uid"
				class="content"
				:ripper="panel"
			/>
		</template>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/module'
import {Pimp, Ripped} from 'vue-ripper'

@Semantic('accordion', {
	styled: {type: Boolean, default: true}
}, {
	exclusive: Boolean,
	on: String,
	animateChildren: Boolean,
	closeNested: Boolean,
	collapsible: Boolean,
	duration: Number
}, [
'opening',
'open',
'closing',
'close',
'change'
], {
	components: {Pimp, Ripped}
})
export default class Accordion extends Vue {
	@Provide() container = this
	@Prop({default: 'dropdown'}) defaultIcon: string
	panels = []
}
</script>