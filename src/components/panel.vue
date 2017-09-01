<template>
	<ripper>
		<template slot="title">
			<slot name="title" class="title">
				<i v-if="usedIcon" :class="[usedIcon, 'icon']"></i>
				{{title}}
			</slot>
		</template>
		<slot />
	</ripper>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import {Ripper} from 'vue-ripper'
import {idSpace} from 'lib/utils'

const generatePanelId = idSpace('pnl');

@Component({components:{Ripper}})
export default class Panel extends Vue {
	@Prop({default: null}) icon: string
	@Prop() title: string
	@Prop({
		default: function() {
			return this.gendName || (this.gendName = generatePanelId());
		}
	}) name: string
	@Inject() container
	gendName = null;
	get usedIcon() {
		return null=== this.icon ? this.container.defaultIcon : this.icon;
	}
}
</script>