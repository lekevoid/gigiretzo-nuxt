<template>
	<div class="inner artist_statement_text">
		<vue-markdown :source="formattedArtistStatement" :options="{ linkify: true }" />
	</div>
</template>

<script setup>
import VueMarkdown from "vue-markdown-render";
const { locale } = useI18n();

const { fetchedArtistStatement } = defineProps(["fetchedArtistStatement"]);

const formattedArtistStatement = computed(() => {
	let textIndex = 0;
	if (locale.value === "fr") {
		textIndex = 1;
	}

	let out = fetchedArtistStatement
		.slice(1)
		.map((entry) => entry[textIndex])
		.join("\n\n");

	return out;
});
</script>

<style lang="scss">
.artist_statement_text {
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
