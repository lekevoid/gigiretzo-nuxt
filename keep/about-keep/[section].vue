<template>
	<main class="page_about">
		<AboutDecoLines />
		<h1>{{ $t("about") }}</h1>
		<div class="container">
			<div class="tabs_wrapper">
				<ul class="nav nav_tabs">
					<li v-for="tab in tabs" :class="['tab', `tab_${tab.slug}`, { active: tab.slug === activeTab }]">
						<button @click="activeTab = tab.slug">{{ tab.label }}</button>
					</li>
				</ul>
			</div>
			<div class="sections_wrapper">
				<section v-for="section in sections" :class="[section.slug, { active: section.slug === activeTab }]">
					<div class="tab_bg_color">
						<div class="tab_bg_paper">
							<AboutBio v-if="section.slug === 'bio'" :fetched-bio="bio" />
							<AboutArtistStatement v-if="section.slug === 'artist-statement'" :fetched-artist-statement="artistStatement" />
							<AboutCV v-if="section.slug === 'cv'" :fetched-cv-entries="cvEntries" :fetched-cv-sections="cvSections" />
						</div>
					</div>
				</section>
			</div>
		</div>
	</main>
</template>

<script setup>
import { getArtistStatement, getBio, getCV } from "@/composables/useSheet";

const route = useRoute();
const router = useRouter();
const { locale, t } = useI18n();
const localePath = useLocalePath();

const { artistStatement } = await getArtistStatement();
const { bio } = await getBio();
const { cvEntries, cvSections } = await getCV();

const sections = [
	{ label: t("bio"), slug: "bio" },
	{ label: t("artist-statement"), slug: "artist-statement" },
	{ label: t("cv"), slug: "cv" },
];

const tabs = [
	{ label: t("bio"), slug: "bio" },
	{ label: t("artist-statement"), slug: "artist-statement" },
	{ label: t("cv"), slug: "cv" },
];

watch(activeTab, () => {
	router.push(localePath({ path: activeTab.value }));
});
</script>

<style lang="scss">
@import "~/assets/styles/dependencies";
@import "~/assets/styles/page_about";
</style>
