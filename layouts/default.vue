<template>
	<nav>
		<ul>
			<li><NuxtLink :to="localePath({ name: 'index' })">Home</NuxtLink></li>
			<li><NuxtLink :to="localePath({ name: 'about-section', params: { section: 'bio' } })">About</NuxtLink></li>
		</ul>
		<LangSwitcher />
	</nav>
	<NuxtPage />
</template>

<script setup>
// const { t } = useI18n();
const localePath = useLocalePath();
// const router = useRouter();
</script>
