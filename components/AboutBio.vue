<template>
	<div class="inner bio_text">
		<vue-markdown :source="formattedBio" :options="{ linkify: true }" />
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
}
</style>
