<template>
	<column>
		<template slot="header">
			X
		</template>
		<template scope="scope">
			X
		</template>
	</column>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import column from './column.vue'

@Component({components:{column}})
export default class SelectionColumn extends Vue {
	
}
</script>