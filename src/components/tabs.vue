<template>
	<depot ref="context" :class="['vued tabs', horizontal?'horizontal':'vertical']" :order="order">
		<template v-slot:pimp><pimp v-model="panels"><slot /></pimp></template>
		<template v-slots:tabs>
			<div ref="menu"
				:class="['ui', type, horizontal && 'vertical', position, 'attached tabs vued menu']"
				:style="tabsStyle"
			>
				<a is="ripped" v-for="(panel, uid) in panels" :key="uid"
					class="item"
					template="title"
					:ripper="panel"
					:data-tab="panel.name"
				/>
			</div>
		</template>
		<div :class="['ui segment panels vued', opposite, 'attached']">
			<div is="ripped" v-for="(panel, uid) in panels" :key="panel._uid"
				:class="['ui', 'tab']"
				:ripper="panel"
				:data-tab="panel.name"
			/>
		</div>
	</depot>
</template>
<style>
.vued.tabs.horizontal {
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
}
.vued.panels[class*="right attached"] {
	border-left: 0;	/*Hacky: the order makes the border of the panel visible over the tabs*/
	margin-left: 0;
	margin-top: 0;
	margin-right: 0;
	width: 100%;
}
</style>
<script lang="ts">
/// <reference types="semantic-ui" />
import Vue from 'vue'
import {Component, Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import {Pimp, Ripped, Depot} from 'vue-ripper'

var orders = {
	tabsFirst: ['pimp', 'tabs', 'default'],
	tabsLast: ['pimp', 'default', 'tabs']
}

//generalise shapes and end up using `childrenOnly`
@Component({
	components: {Pimp, Ripped, Depot}
})
export default class Tabs extends Vue {
	@Provide() container = this
	@Prop({default: ''}) defaultIcon: string
	@Prop({default: 'top'}) position: 'top'|'bottom'|'left'|'right'
	@Prop({default: true}) attached: boolean
	@Model('tab-change') active: string
	@Prop({type: String, default: 'tabular'}) type: 'tabular'|'pointing'
	@Prop({default: '250px'}) tabsWidth: string

	get order() {
		return ~['left', 'top'].indexOf(this.position) ?
			orders.tabsFirst : orders.tabsLast;
	}
	get horizontal() { return !!~['left', 'right'].indexOf(this.position); }
	@Emit() tabChange(name) {}
	/*conditionalWrap(name, slot, h) {
		if(!this.horizontal || 'pimp'=== name) return slot;
		return h('div', {class: 'tabs'=== name?this.tabClmn:this.pnlClmn}, slot);
	}*/
	@Watch('active') setTab(name) {
		this.tab('change tab', name);
		//+ onVisible	tabPath
	}
	get tab() {
		var els = $(this.$refs.menu).find('.item');
		return els.tab.bind(els);
	}
	config: any = {}
	created() {
		this.config.onVisible = this.tabChange.bind(this);
	}
	panels = []
	@Watch('panels') initSemantic() {
		/*
	'first-load',
	'load',
	'request'
		 */
		Vue.nextTick(()=>{
			//TODO: use $refs instead of .find('.item')
			//TODO: apply on new tabs only (remove from old tabs??)
			this.tab({
				...this.config,
				context: $((<any>this.$refs.context).$el)
			});
		});
	}
	get opposite() {
		return {
			top: 'bottom',
			bottom: 'top',
			//semantic has some `.ui.tabular.menu+.attached:not(.top).segment`
			left: 'top right',
			right: 'left'
		}[this.position];
	}
	get tabsStyle() {
		return [
			this.horizontal && {flex: this.tabsWidth}
		];
	}
}
</script>