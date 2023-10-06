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
	console.log(out);
	return out;
});
</script>

<style lang="scss">
.bio_text {
	p {
		font-size: 22px;
		text-align: justify;
		line-height: 180%;
		margin-bottom: 2em;
	}
	img {
		clear: right;
		float: right;
		margin: 20px 0 20px 40px;
		border-radius: 4px;
		box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.4);
		max-width: 40%;
		transition: transform 0.6s ease-out;
	}
}
</style>
