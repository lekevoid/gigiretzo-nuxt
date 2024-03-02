<template>
	<AppHeader />
	<NuxtPage />
	<AppFooter />
</template>

<script setup>
const { ENVIRONMENT } = useRuntimeConfig().public;
useHead({
	titleTemplate: (def) => (def === "" ? "Gigi Retzo" : `${def} – Gigi Retzo`),
	meta: [{ name: "robots", content: ENVIRONMENT === "production" ? "index, follow" : "noindex, nofollow" }],
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
