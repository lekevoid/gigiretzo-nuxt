<template>
	<div class="inner what_we_do_text contains_md_text">
		<h2>{{ $t("what-we-do") }}</h2>
		<template v-for="par in whatWeDo">
			<vue-markdown v-if="par.type === 'subtitle'" :source="`<h3>${par.text}</h3>`" :options="{ html: true, linkify: true }" />
			<vue-markdown v-else-if="par.type === 'subsubtitle'" :source="`<h4>${par.text}</h4>`" :options="{ html: true, linkify: true }" />
			<vue-markdown v-else-if="par.type === 'paragraph'" :source="par.text" :options="{ html: true, linkify: true }" />
			<NuxtImg v-else-if="par.type === 'image'" :src="par.src" :class="`float_${par.align}`" placeholder="/loader-bars-scale.svg" preload />
		</template>
	</div>
</template>

<script setup>
import VueMarkdown from "vue-markdown-render";
import { storeToRefs } from "pinia";
import { useAboutPageStore } from "@/stores/about";

const { whatWeDo } = storeToRefs(useAboutPageStore());
</script>

<style lang="scss">
pre {
	max-width: 100%;
	font-size: 16px;
}
</style>
