<template>
	<main class="page_about">
		<AboutDecoLines />
		<div class="container">
			<div class="tabs_wrapper">
				<ul class="nav nav_tabs">
					<li v-for="tab in tabs" :class="['tab', `tab_${tab.slug}`, { active: tab.slug === currentTab }]">
						<button @click="setCurrentTab(tab.slug)">{{ tab.label }}</button>
					</li>
				</ul>
			</div>
			<div class="sections_wrapper">
				<section v-for="section in sections" :class="[section.slug, { active: section.slug === currentTab }]">
					<div class="tab_bg_color">
						<div class="tab_bg_paper">
							<AboutBio v-if="section.slug === 'bio'" />
							<AboutArtistStatement v-if="section.slug === 'artist-statement'" />
							<AboutCV v-if="section.slug === 'cv'" />
							<AboutNews v-if="section.slug === 'news'" />
						</div>
					</div>
				</section>
			</div>
		</div>
	</main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAboutPageStore } from "@/stores/about";
import { analyticsTrackPage } from "@/composables/useGTM";

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const { currentTab } = storeToRefs(useAboutPageStore());
const { setCurrentTab } = useAboutPageStore();

const availableTabs = ["bio", "artist-statement", "cv", "news", "what-we-do"];

const sections = [
	{ label: t("bio"), slug: "bio" },
	{ label: t("artist-statement"), slug: "artist-statement" },
	{ label: t("cv"), slug: "cv" },
	{ label: t("news"), slug: "news" },
];

const tabs = [
	{ label: t("bio"), slug: "bio" },
	{ label: t("artist-statement"), slug: "artist-statement" },
	{ label: t("cv"), slug: "cv" },
	{ label: t("news"), slug: "news" },
];

onMounted(() => {
	let { tab } = route.params;
	if (!availableTabs.includes(tab)) {
		tab = "bio";
	}

	if (tab && tab !== currentTab) {
		setCurrentTab(tab);
	}
});

watch(currentTab, () => {
	if (typeof window !== "undefined") {
		const toPath = localePath({ name: "about-tab", params: { tab: currentTab.value } });
		window.history.pushState({}, "Test", toPath);
		analyticsTrackPage(toPath);
	}
});

/* Meta & SEO */

const seoTitle = computed(() => `${t(currentTab.value) || t("about")} – GigiRetzo`);
const seoDescription = "";
const seoImage = "";

useSeoMeta({
	title: () => seoTitle.value,
	ogTitle: () => seoTitle.value,
	description: () => seoDescription.value,
	ogDescription: () => seoDescription.value,
	ogImage: () => seoImage.value,
	twitterCard: "summary_large_image",
});
</script>

<style lang="scss">
@import "~/assets/styles/dependencies";
@import "~/assets/styles/page_about";
</style>
