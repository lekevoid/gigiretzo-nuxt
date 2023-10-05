<template>
	<h1>{{ $t("about") }}</h1>
	<div v-for="tab in tabs" :class="['tab', { active: tab.slug === activeTab }]">{{ tab.label }}</div>
	<div v-for="section in sections" :class="''">{{ section.title }}</div>
</template>

<script setup>
const config = useRuntimeConfig();
const { locale } = useI18n();
console.log(locale.value);

const { data, error } = await useFetch(config.public.hygraphUrl, {
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
});

console.log(error);

const sections = await data.value.data.aboutPageSections;

console.log(sections);

const tabs = computed(() => {
	return sections.map((section) => {
		return {
			label: section.tabLabel,
			slug: section.slug,
		};
	});
});

const activeTab = ref("bio");

console.log(tabs.value);
</script>
