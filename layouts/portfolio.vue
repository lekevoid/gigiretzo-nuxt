<template>
	<NuxtLayout name="default" />
</template>

<script setup>
useHead({
	titleTemplate: "%s – Gigi Retzo",
});
</script>

<style lang="scss">
header {
	z-index: 10;
}

main {
	z-index: 1;
}

.page-enter-active,
.page-leave-active {
	transition: opacity 0.4s;
	opacity: 1;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
}
</style>
