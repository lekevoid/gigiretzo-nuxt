<template>
	<main class="page_home">
		<div class="container">
			<h1>{{ $t("portfolio") }}</h1>
			<HomeCarousel v-for="{ id, title, cta, images, link } in carousels" :id="id" :title="title" :cta="cta" :images="images" :link="link" />
		</div>
	</main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useHomePageStore } from "@/stores/home";

const { t } = useI18n();

const { carousels } = storeToRefs(useHomePageStore());

useSeoMeta({
	title: () => "",
	ogTitle: () => "",
	description: () => t("seo.index.description"),
	ogDescription: () => t("seo.index.description"),
	twitterCard: "summary_large_image",
});
</script>

<style lang="scss">
.page_home {
}
</style>
