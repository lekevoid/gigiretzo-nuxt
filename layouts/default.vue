<template>
	<AppHeader />
	<NuxtPage />
	<AppFooter />
</template>

<script setup>
useHead({
	titleTemplate: (def) => (def === "" ? "Gigi Retzo" : `${def} – Gigi Retzo`),
});
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
	opacity: 1;
	transition: opacity 0.3s;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
	width: 100%;
	position: absolute;
}
</style>
