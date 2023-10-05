<template>
	<ul>
		<li v-for="locale in availableLocales">
			<NuxtLink :key="locale.code" :to="switchLocalePath(locale.code)">{{ locale.name }}</NuxtLink>
		</li>
	</ul>
</template>

<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
	return locales.value.filter((i) => i.code !== locale.value);
});
</script>
