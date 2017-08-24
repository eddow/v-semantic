<template>
	<div>
		<div style="display: none;">
			<slot name="title" />
		</div>
		<slot />
	</div>
</template>

<script lang="ts">
// For internal use only : to be sure that slots are fulfilled even if `tab` defaulted them
	export default {};
</script>