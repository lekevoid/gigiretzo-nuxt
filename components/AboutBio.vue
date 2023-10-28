<template>
	<div class="inner bio_text contains_md_text">
		<h2>{{ $t("bio") }}</h2>
		<template v-for="par in bio">
			<vue-markdown v-if="par.type === 'paragraph'" :source="par.text" :options="{ linkify: true }" />
			<NuxtImg v-if="par.type === 'image'" :src="par.src" :class="`float_${par.align}`" placeholder="/loader-bars-scale.svg" preload />
		</template>
	</div>
</template>

<script setup>
import VueMarkdown from "vue-markdown-render";
import { storeToRefs } from "pinia";
import { useAboutPageStore } from "@/stores/about";

const { bio } = storeToRefs(useAboutPageStore());
</script>

<style lang="scss">
pre {
	max-width: 100%;
	font-size: 16px;
}
</style>
