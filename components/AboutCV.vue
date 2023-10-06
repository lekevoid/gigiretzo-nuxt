<template>
	<div class="inner">
		<h2>{{ $t("cv") }}</h2>
		<div class="toc">
			<ul>
				<li v-for="cvSection in cvSections">{{ cvSection.label }}</li>
			</ul>
		</div>
		<div class="cv_list">
			<div class="cv_list_section" v-for="cvSection in cvSections">
				<h3>{{ cvSection.title }}</h3>
				<div class="cv_list_entry" v-for="cvEntry in cvEntriesBySectionAndDate[cvSection.slug]">
					<AboutCVEntryDate :date-start="cvEntry.dateStart" :date-end="cvEntry.dateEnd" :show="cvEntry.showDate" />
					<div class="cv_entry_description">
						<vue-markdown :source="cvEntry.description" :options="{ linkify: true }" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import VueMarkdown from "vue-markdown-render";

const { locale, t } = useI18n();

const { fetchedCvEntries, fetchedCvSections } = defineProps(["fetchedCvEntries", "fetchedCvSections"]);

function slugify(str) {
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[\s_\-,&]+/g, "-")
		.toLowerCase();
}

const cvSections = computed(() => {
	let labelIndex = 1;
	if (locale.value === "fr") {
		labelIndex = 2;
	}

	return fetchedCvSections.slice(1).map((section) => ({
		slug: slugify(section[0]),
		fetchedLabel: section[1],
		label: section[labelIndex],
	}));
});

const cvEntries = computed(() => {
	let descIndex = 3;
	if (locale.value === "fr") {
		descIndex = 4;
	}

	return fetchedCvEntries.slice(1).map((entry) => {
		const section = cvSections.value.find((section) => section.fetchedLabel === entry[0]);
		return { sectionSlug: section.slug, section: section.label, dateStart: entry[1], dateEnd: entry[2], description: entry[descIndex] };
	});
});

const cvEntriesBySectionAndDate = computed(() => {
	let out = [];
	let currentContextConsidered = "";

	cvSections.value.forEach((section) => {
		out[section.slug] = [];
	});

	cvEntries.value.forEach((entry) => {
		if (!entry.description) {
			return null;
		}
		const entryContext = `${entry.sectionSlug}${entry.dateStart}${entry.dateEnd}`;
		entry.showDate = currentContextConsidered !== entryContext;
		entry.context = entryContext;
		currentContextConsidered = entryContext;
		out[entry.sectionSlug].push(entry);
	});

	return out;
});

console.log(cvEntriesBySectionAndDate.value);
</script>

<style lang="scss">
.toc {
}
.cv_list {
}
.cv_list_section {
}
.cv_list_entry {
}
.cv_entry_date {
	width: 200px;
	display: inline-block;
}
.cv_entry_description {
	width: calc(98% - 200px);
	display: inline-block;
}
</style>
