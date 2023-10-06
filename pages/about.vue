<template>
	<main class="page_about">
		<h1>{{ $t("about") }}</h1>
		<div v-for="tab in tabs" :class="['tab', { active: tab.slug === activeTab }]">
			<button @click="activeTab = tab.slug">{{ tab.label }}</button>
		</div>
		<div class="sections_wrapper">
			<section v-for="section in sections" :class="{ active: section.slug === activeTab }">
				<!-- <AboutArtistStatement v-if="section.slug === 'artist-statement'" :data="section" /> -->
				<!-- <AboutBio v-if="section.slug === 'bio'" :data="section" /> -->
				<AboutCV v-if="section.slug === 'cv'" :fetched-cv-entries="cvEntries" :fetched-cv-sections="cvSections" />
			</section>
		</div>
	</main>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { locale, t } = useI18n();
const localePath = useLocalePath();

/* const { data } = await useFetch(config.public.hygraphUrl, {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: {
		query: `query PageSections($l: [Locale!]!) {
			aboutPageSections(locales: $l) {
				id
				slug
				locale
				tabLabel
				title
				content {
					... on AboutPageCv {
						sections {
							... on CvSection {
								title
								entries {
									... on CvEntry {
										dateStart
										dateEnd
										description {
											html
										}
									}
								}
							}
						}
					}
					... on AboutPageBio {
						id
						locale
						bioContent: content {
							html
						}
					}
					... on AboutPageArtistStatement {
						id
						locale
						artistContent: content {
							html
						}
					}
				}
			}
		}`,
		variables: { l: [locale.value] },
	},
}); */

const { data } = await useFetch("/api/gsheets");
// console.log(data.value.cv);
// console.log(data.value.cvSheet);
const { cvEntries, cvSections } = data.value;

const sections = [
	{ label: t("bio"), slug: "bio" },
	{ label: t("cv"), slug: "cv" },
];

/* const tabs = computed(() => {
	return sections.map((section) => {
		return {
			label: section.tabLabel,
			slug: section.slug,
		};
	});
}); */

const tabs = [
	{ label: t("bio"), slug: "bio" },
	{ label: t("cv"), slug: "cv" },
];

const activeTab = ref(route?.params?.section || "bio");

watch(activeTab, () => {
	router.push(localePath({ name: "about" }) + "/" + activeTab.value);
});
</script>

<style lang="scss">
.tab {
	button {
		appearance: none;
		background: none;
		border: none;
		font-weight: 500;
		cursor: pointer;
	}

	&.active {
		button {
			font-weight: 900;
		}
	}
}

.sections_wrapper {
	position: relative;
	overflow: hidden;
}

section {
	transition: opacity 0.6s ease;
	padding: 40px;
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;

	&.active {
		opacity: 1;
		position: relative;
	}
}
</style>
