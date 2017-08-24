<template>
	<div :class="cls">
  <div v-if="header || $slots.header" class="header">
		<slot name="header">
			{{header}}
		</slot>
	</div>
  <div :class="{scrolling, image, content:1}">
    <slot />
  </div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/module'

@Semantic('modal',
{}, {
	inverted: Boolean,
	blurring: Boolean,
	detachable: Boolean,
	autofocus: Boolean,
	observeChanges: Boolean,
	allowMultiple: Boolean,
	keyboardShortcuts: Boolean,
	offset: Number,
	closable: Boolean,
	//todo: dimmerSettings?
	transition: String,
	duration: Number,
	queue: Boolean
}, [
	'show', 'visible', 'hide'
])
export default class Modal extends Vue {
	@Prop() header: string
	@Prop() scrolling: boolean
	@Prop() image: boolean

	@Model('setCallback') callback: ()=>void
	@Watch('callback') forceCallback(v) {
		if(this.invoke!= v)
			this.$emit('setCallback', this.invoke)
	}
	promise = null
	configure(config) {
		config.onHidden = this.onHidden;
		config.onApprove = this.onApprove;
		config.onDeny = this.onDeny;
	}
	mounted() { this.forceCallback(null); }
	@Emit('hidden') onHidden() {
		if(this.promise) {
			this.promise.reject()
			this.promise = null;
		}
	}
	onApprove() { this.invoke('ok'); }
	onDeny() { this.invoke('cancel'); }

	invoke(command?: string) {
		if(!command) {
			if(this.promise) throw new Error('Modal invoked while being opened already')

			this.semantic('show');
			return new Promise((accept, reject)=> {
				this.promise = {accept, reject};
			})
		} else {
			if(!this.promise) throw new Error('Modal received a command while not being invoked')
			if('cancel'=== command)
				promise.reject();
			else
				promise.accept(command);
			this.semantic('hide');
		}
	}
}
</script>