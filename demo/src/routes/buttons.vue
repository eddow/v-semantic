<template>
	<div>
		<div>
			<s-modal v-model="modal1" closable header="">
				Blah Blah
				<s-button v-command:cancel>Cancel</s-button>
				<s-button v-command:ok>Ok</s-button>
			</s-modal>
			<s-button @click="modal1(()=> loading='This is ok...')">
				modal
			</s-button>
			<s-button @click="blurred = !blurred">
				<template v-slot:prepend><s-icon icon="save" /></template>
				blurr
			</s-button>
			<s-button icon="+plus+red dont" @click="loading = !loading">
				loading
			</s-button>
			<s-button @click="loading = !loading && 'loading!'">
				<template v-slot:append><s-icon icon="minus" /></template>
				loading text
			</s-button>
			<s-button @click="test" ref="button">
				<s-icon icon="add circle" />
				<div class="ui special popup">
					<div class="header">Custom Header</div>
					<div class="ui button">Click Me</div>
				</div>
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
import Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

@Component
export default class Buttons extends Vue {
	blurred: boolean = false
	loading: boolean = false
	modal1 = null
	test() {
		debugger;
		/*$(this.$refs.button)
			.popup({
				title   : 'Popup Title',
				content : 'Hello I am a popup'
			});
		$(this.$refs.button)
			.popup({
				inline: true
			});*/
	}
}
</script>