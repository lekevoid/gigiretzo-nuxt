<template>
	<div class="inner artist_statement_text contains_md_text">
		<h2>{{ $t("artist-statement") }}</h2>
		<template v-for="par in artistStatement">
			<vue-markdown
				v-if="par.type === 'paragraph'"
				:source="par.text"
				:options="{ linkify: true }"
				:class="[{ hide_on_desktop: par?.hide.includes('desktop'), hide_on_mobile: par?.hide.includes('mobile') }]"
			/>
			<NuxtImg
				v-if="par.type === 'image'"
				:src="par.src"
				:class="[`float_${par.align}`, { hide_on_desktop: par?.hide.includes('desktop'), hide_on_mobile: par?.hide.includes('mobile') }]"
				placeholder="/loader-bars-scale.svg"
				preload
			/>
		</template>
	</div>
</template>

<script setup>
import VueMarkdown from "vue-markdown-render";
import { storeToRefs } from "pinia";
import { useAboutPageStore } from "@/stores/about";
const { artistStatement } = storeToRefs(useAboutPageStore());
</script>

<style lang="scss" scoped>
.artist_statement_text {
}
</style>
