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
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/module'
import Command from 'directives/command'

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
	//TODO: dimmerSettings?
	transition: String,
	duration: Number,
	queue: Boolean
}, [
	'visible'
])
export default class Modal extends Command.Commanded {
	@Prop() header: string
	@Prop() scrolling: boolean
	@Prop() image: boolean

	@Model('set-callback') callback: ()=>void
	@Watch('callback') forceCallback(v) {
		if(this.command!= v)
			this.$emit('set-callback', this.command)
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
	onApprove() { this.command('ok'); }
	onDeny() { this.command('cancel'); }

	//command()
	//command(command: string)
	//command(command: string, params: any)
	//command(resolve: function, reject: function)
	command(command?: string|((v:any)=> any), params?: any|((v:any)=> any)) {
		if('string'!== typeof command) {
			if(this.promise) throw new Error('Modal invoked while being opened already')

			this.semantic('show');
			let rv = new Promise((accept, reject)=> {
				this.promise = {accept, reject};
			});
			return 'function'=== typeof command?
				rv.then(command, params || (()=> {})) :
				rv ;
		} else {
			if(!this.promise) throw new Error('Modal received a command while not being invoked')
			if('cancel'!== command)
				this.promise.accept('undefined'!== typeof params?{command, params}:command);
			else
				this.promise.reject();
				
			this.promise = null;
			this.semantic('hide');
		}
	}
}
</script>