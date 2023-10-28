<template>
	<div class="inner bio_text contains_md_text">
		<h2>{{ $t("upcoming-events") }}</h2>
		<h2>{{ $t("press") }}</h2>
		<pre>{{ press }}</pre>
	</div>
</template>

<script setup>
import VueMarkdown from "vue-markdown-render";
import { storeToRefs } from "pinia";
import { useAboutPageStore } from "@/stores/about";

const { press } = storeToRefs(useAboutPageStore());
</script>

<style lang="scss">
pre {
}
</style>
