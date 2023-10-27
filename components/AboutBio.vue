<template>
	<div class="inner bio_text">
		<template v-for="par in fetchedBio">
			<vue-markdown v-if="par.type === 'paragraph'" :source="par.md" :options="{ linkify: true }" />
			<NuxtImg v-if="par.type === 'image'" :src="par.src" :class="`float_${par.align}`" />
		</template>
	</div>
</template>

<script setup>
import VueMarkdown from "vue-markdown-render";
const { locale } = useI18n();

const { fetchedBio } = defineProps(["fetchedBio"]);

const formattedBio = computed(() => {
	let textIndex = 0;
	if (locale.value === "fr") {
		textIndex = 1;
	}

	let out = fetchedBio
		.slice(1)
		.map((entry) => entry[textIndex])
		.join("\n\n");

	return out;
});
</script>

<style lang="scss">
.bio_text {
	& > div {
	}
}
pre {
	max-width: 100%;
	font-size: 16px;
}
</style>
