<template>
	<div class="inner artist_statement_text contains_md_text">
		<h2>{{ $t("artist-statement") }}</h2>
		<template v-for="par in artistStatement">
			<vue-markdown v-if="par.type === 'paragraph'" :source="par.text" :options="{ linkify: true }" />
			<NuxtImg v-if="par.type === 'image'" :src="par.src" :class="`float_${par.align}`" placeholder="/loader-bars-scale.svg" preload />
		</template>
	</div>
</template>

<script setup>
import VueMarkdown from "vue-markdown-render";
import { storeToRefs } from "pinia";
import { useAboutPageStore } from "@/stores/about";
const { artistStatement } = storeToRefs(useAboutPageStore());
</script>

<style lang="scss">
.artist_statement_text {
}
</style>
