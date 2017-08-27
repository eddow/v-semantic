<template>
	<div ref="context" class="ui grid">
		<pimp v-model="panels"><slot /></pimp>
		<template v-if="'left'=== position">
			<div :class="tabClmn">
				<div ref="menu" :class="[cls, tabAttach]">
					<ripped v-for="(panel, uid) in panels" :key="uid"
						tag="a"
						class="item"
						template="title"
						:ripper="panel"
						:data-tab="panel.internalName"
					/>
				</div>
			</div>
			<div :cls="pnlClmn">
				<ripped v-for="(panel, uid) in panels" :key="uid"
					tag="div"
					:class="['ui', pnlAttach, 'tab segment']"
					:ripper="panel"
					:data-tab="panel.internalName"
				/>
			</div>
		</template>
		<template v-else-if="'right'=== position">
			<div :cls="pnlClmn">
				<ripped v-for="(panel, uid) in panels" :key="uid"
					tag="div"
					:class="['ui', pnlAttach, 'tab segment']"
					:ripper="panel"
					:data-tab="panel.internalName"
				/>
			</div>
			<div :class="tabClmn">
				<div ref="menu" :class="[cls, tabAttach]">
					<ripped v-for="(panel, uid) in panels" :key="uid"
						tag="a"
						class="item"
						template="title"
						:ripper="panel"
						:data-tab="panel.internalName"
					/>
				</div>
			</div>
		</template>
		<template v-else-if="'bottom'=== position">
			<ripped v-for="(panel, uid) in panels" :key="uid"
				tag="div"
				:class="['ui', pnlAttach, 'tab segment']"
				:ripper="panel"
				:data-tab="panel.internalName"
			/>
			<div ref="menu" :class="[cls, tabAttach]">
				<ripped v-for="(panel, uid) in panels" :key="uid"
					tag="a"
					class="item"
					template="title"
					:ripper="panel"
					:data-tab="panel.internalName"
				/>
			</div>
		</template>
		<template v-else>
			<div ref="menu" :class="[cls, tabAttach]">
				<ripped v-for="(panel, uid) in panels" :key="uid"
					tag="a"
					class="item"
					template="title"
					:ripper="panel"
					:data-tab="panel.internalName"
				/>
			</div>
			<ripped v-for="(panel, uid) in panels" :key="uid"
				tag="div"
				:class="['ui', pnlAttach, 'tab segment']"
				:ripper="panel"
				:data-tab="panel.internalName"
			/>
		</template>
	</div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import {Inject, Provide, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import Semantic from 'lib/classed'
import {Pimp, Ripped} from 'vue-ripper'
import {$} from 'lib/shims'

@Semantic('menu', {
	tabular: {type: Boolean, default: true},
	pointing: Boolean,
	primary: Boolean,
	secondary: Boolean
}, {
	components: {Pimp, Ripped}
})
export default class Tabs extends Vue {
	@Provide() container = this
	@Prop({default: ''}) defaultIcon: string
	@Prop({default: 'top'}) position: 'top'|'bottom'|'left'|'right'
	@Prop({default: true}) attached: boolean
	panels = []
	@Watch('panels') initSemantic() {
		setTimeout(()=>{
			$(this.$refs.menu).find('.item').tab({
				context: $(this.$refs.context)
			});
		});
	}
	get tabsFirst() {
		return !!~['left', 'top'].indexOf(this.position);
	}
	get tabClmn() {
		return 'four wide column';
	}
	get tabAttach() {
		if(!this.attached) return '';
		var rv = [{
			top: 'top attached',
			bottom: 'bottom attached',
			left: 'left attached',
			right: 'right attached'
		}[this.position]];
		if(~['left', 'right'].indexOf(this.position)) rv.push('fluid vertical')
		return rv;
	}
	get pnlClmn() {
		return 'twelve wide stretched column';
	}
	get pnlAttach() {
		if(!this.attached) return '';
		var rv = [{
			top: 'bottom attached',
			bottom: 'top attached',
			left: 'right attached',
			right: 'left attached'
		}[this.position]];
		return rv;
	}
}
</script>