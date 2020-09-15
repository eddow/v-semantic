<template>
	<div :class="cls">
		<pimp v-model="panels"><slot /></pimp>
		<template v-for="(panel, index) in panels">
			<div is="ripped"
				:key="'t'+panel._uid"
				class="title"
				template="title"
				:ripper="panel"
			/>
			<div is="ripped"
				:key="'c'+panel._uid"
				class="content"
				:ripper="panel"
				:data-name="panel.name"
			/>
		</template>
	</div>
</template>

<script lang="ts">
import {Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic, { VueSemantic } from 'lib/module'
import {Pimp, Ripped} from 'vue-ripper'

type Model = string | {[panelName: string]: boolean} | string[]
//TODO: test model mgt when exclusive=false
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
'open',
'close',
'change'
], {
	components: {Pimp, Ripped}
})
export default class Accordion extends VueSemantic {
	exclusive
	@Provide() container = this
	@Prop({default: 'dropdown'}) defaultIcon: string
	panels: any[] = []
	@Model('changed', {type: [String, Object], default: null}) opened: Model;
	@Emit() changed(opened: Model) {}
	@Watch('opened', {deep: true}) setOpened(opened: Model) {
		if(false!== this.exclusive) {
			console.assert(!opened || 'string'=== typeof opened, 'Exclusive accordion\' model is a string');
			if(!opened) {
				for(let i in this.panels) this.semantic('close', i);
			} else {
				var index = this.panels.findIndex(panel => panel.name === opened);
				console.assert(~index, `Panel '${opened}' in the collection`);
				this.semantic('open', index);
			}
		} else if(!opened) this.changed({});
		else {
			console.assert('object'=== typeof opened, 'Non-exclusive accordion\' model is a {string: boolean} or a string[]');
			var openedObject = opened;
			if(opened instanceof Array) {
				openedObject = {};
				for(let name of opened)
					openedObject[name] = true;
			}
			for(var pIndex in this.panels)
				this.semantic(openedObject[this.panels[pIndex].name] ? 'open' : 'close', pIndex);
		}
	}
	childIndex(el) {
		return $(el).index()/2-1;
	}
	configure(config) {
		var me = this;
		config.onOpening = function opening() {
			var index = me.childIndex(this),
				name = me.panels[index].name;
			if(false!== me.exclusive)
				me.changed(name);
			else if(this.opened instanceof Array)
				this.opened.push(name)
			else
				this.opened[name] = true;
		}
		config.onClosing = function closing() {
			var index = me.childIndex(this);
			if(false!== this.exclusive)
				me.changed(null);
			else {
				var name = me.panels[index].name;
				if(this.opened instanceof Array) {
					var indexInOpnd = this.opened.indexOf(name);
					console.assert(~indexInOpnd, 'Closed panel name exist in `opened` collection');
					this.opened.splice(indexInOpnd, 1);
				} else
					this.opened[this.opened] = false;
			}
		}
	}
}
</script>