<template>
	<div>
		<s-tabs>
			<s-panel title="What is a dog?">
				<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
			</s-panel>
			<s-panel title="What kinds of dogs are there?">
				<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
			</s-panel>
			<s-panel title="And...">
				<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
			</s-panel>
		</s-tabs>
		<s-tabs position="bottom">
			<s-panel title="What is a dog?">
				<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
			</s-panel>
			<s-panel title="What kinds of dogs are there?">
				<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
			</s-panel>
			<s-panel title="And...">
				<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
			</s-panel>
		</s-tabs>
		<!--s-tabs position="left">
			<s-panel title="What is a dog?">
				<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
			</s-panel>
			<s-panel title="What kinds of dogs are there?">
				<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
			</s-panel>
			<s-panel title="And...">
				<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
			</s-panel>
		</s-tabs>
		<s-tabs position="right">
			<s-panel title="What is a dog?">
				<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
			</s-panel>
			<s-panel title="What kinds of dogs are there?">
				<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
			</s-panel>
			<s-panel title="And...">
				<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
			</s-panel>
		</s-tabs-->
	</div>
</template>
<script lang="ts">
import * as Vue from 'vue'
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator'

@Component
export default class Tabs extends Vue {
}
</script>