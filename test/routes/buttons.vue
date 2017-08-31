<template>
	<div>
		<div>
			<s-modal v-model="modal1" closable header="">
				Blah Blah
				<s-button v-command:cancel>Cancel</s-button>
				<s-button v-command:ok>Ok</s-button>
			</s-modal>
			<s-button @click="modal1(()=> {})">
				modal
			</s-button>
			<s-button @click="blurred = !blurred">
				<s-icon icon="save" slot="prepend" />
				blurr
			</s-button>
			<s-button icon="plus" @click="loading = !loading">
				loading
			</s-button>
			<s-button @click="loading = !loading && 'loading!'">
				<s-icon icon="minus" slot="append" />
				loading text
			</s-button>
			<s-button>
				<s-icon icon="add circle" />
			</s-button>
			<s-button icon="add square" />
		</div>

		<div>
			<s-dimmable blurring v-model="blurred" icon="heart" message="Dimmed Message!">
				<img class="ui medium image" src="https://semantic-ui.com/images/wireframe/image.png" />
			</s-dimmable>
			<div v-loading.indeterminate="loading">
				<img class="ui medium image" src="https://semantic-ui.com/images/wireframe/image.png" />
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

@Component
export default class Buttons extends Vue {
	blurred: boolean = false
	loading: boolean = false
}
</script>