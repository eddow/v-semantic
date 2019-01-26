<template>
	<div class="screen ui grid">
		<div class="ui inverted vertical menu two wide column">
			<div class="item">
				<label for="ss">Show source</label>
				<s-checkbox name="ss" toggle v-model="showSource" />
			</div>
			<a class="item" v-for="(route, index) in routes" :key="index"
				:href="'#'+route.path">
				{{route.menu}}
			</a>
		</div>
		<div :class="['work-pane demo', showSource?'seven':'fourteen', 'wide column']">
			<router-view></router-view>
		</div>
		<div class="work-pane code seven wide column" v-show="showSource">
			<codemirror ref="cm" v-model="code" :options="editorOptions"></codemirror>
		</div>
	</div>
</template>
<style>
.screen {
	width: 100vw;
	height: 100vh;
}
.work {
	height: calc(100% - 80px);
}
.work-pane {
	height: 100%;
	overflow: auto;
}
div.CodeMirror {
	height: 100%;
}
</style>
<script lang="ts">
import Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'
import routes from './routes'
import * as sources from '../run/sources'

@Component
export default class App extends Vue {
	routes = routes
	code = null
	showSource: boolean = true
	editorOptions = {
		tabSize: 2,
		mode: {name: 'vue'},
		theme: 'base16-dark',
		lineNumbers: true,
		line: true,
		foldGutter: true,
		gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
		styleSelectedText: true,
		highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
		readOnly: true,
		selectionPointer: true
	}
	@Watch('$route', {immediate: true})
	loadComponent(route) {
		if(route && route.name)
			this.code = sources[route.name];
		else
			this.code = "// nothing";
	} 
	@Watch('showSource') initCM() {
		Vue.nextTick(()=> (<any>this.$refs.cm).refresh());
	}
}
</script>