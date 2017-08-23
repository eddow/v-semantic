<template>
	<ps>
		<template slot="title">
			<slot name="title" class="title">
				<i v-if="icon" :class="[icon, 'icon']"></i>
				{{title}}
			</slot>
		</template>
		<slot />
	</ps>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
import ps from './tab-sep.vue'

@Component({components:{ps}})
export default class Tab extends Vue {
	@Prop() icon: string
	@Prop() title: string
}
</script>