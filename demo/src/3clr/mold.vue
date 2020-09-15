<template>
	<s-data-mold select="3clr">
		<template v-slot:input="field">
			<span :class="['clr3', 'plain', field.value]"
				@mousedown="mousedown(field, $event)"
			>&nbsp;</span>
		</template>
		<template v-slot:display="field">
			<span :class="['clr3', 'single', field.value]">&nbsp;</span>
		</template>
	</s-data-mold>
</template>
<style>
.clr3 {
	display: inline-block;
}
.clr3.plain {
	width: 55px;
	height: 25px;
	background-image: url("./3clrthree.png");
}
.clr3.plain.red {
	background-image: url("./3clrthreeR.png");
}
.clr3.plain.orange {
	background-image: url("./3clrthreeO.png");
}
.clr3.plain.green {
	background-image: url("./3clrthreeG.png");
}

.clr3.single {
	width: 15px;
	height: 15px;
	background: url("./3clrone.png") no-repeat;
}
.clr3.single.red {
	background-image: url("./3clroneR.png");
}
.clr3.single.orange {
	background-image: url("./3clroneO.png");
}
.clr3.single.green {
	background-image: url("./3clroneG.png");
}
</style>
<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {backgroundCssCache} from 'lib/cssCache'

const firstThird = 55/3;
const secondThird = 55*2/3;

backgroundCssCache(	//To avoid the blinking the first time a color is used
	'clr3.plain', 'clr3.plain.red', 'clr3.plain.orange', 'clr3.plain.green',
	'clr3.single', 'clr3.single.red', 'clr3.single.orange', 'clr3.single.green'
);

@Component
export default class Mold extends Vue {
	mousedown(field, mouseEvent) {
		var x = mouseEvent.offsetX;
		if(x < firstThird) field.value = 'red';
		else if(x > secondThird) field.value = 'green';
		else field.value = 'orange';
	}
}
</script>
