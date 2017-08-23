<template>
	<div>
		<slot name="title" />
		<slot />
	</div>
</template>

<script lang="ts">
// For internal use only : to be sure that slots are fulfilled even if `tab` defaulted them
	export default {};
</script>