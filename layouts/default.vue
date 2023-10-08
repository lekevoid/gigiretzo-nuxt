<template>
	<AppHeader />
	<NuxtPage />
</template>

<script setup>
// const { t } = useI18n();
const localePath = useLocalePath();
// const router = useRouter();
</script>

<style lang="scss" scoped>
main {
	opacity: 1;

	&.fade-enter-active,
	&.fade-leave-active {
		transition: opacity 1s ease;
	}

	&.fade-enter-from,
	&.fade-leave-to {
		opacity: 0;
	}
}
</style>
