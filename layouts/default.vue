<template>
	<AppHeader />
	<NuxtPage />
	<AppFooter />
</template>

<script setup></script>

<style lang="scss">
header {
	z-index: 10;
}

main {
	padding-top: min(3vw, 40px);
	padding-bottom: min(5vw, 80px);
	z-index: 1;
}

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
