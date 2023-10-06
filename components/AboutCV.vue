<template>
	<div class="inner">
		<h2>{{ $t("cv") }}</h2>
		<div class="toc">
			<ul>
				<li v-for="cvSection in cvSections">
					<a :href="`#${cvSection.slug}`">{{ cvSection.label }}</a>
				</li>
			</ul>
		</div>
		<div class="cv_list">
			<div v-for="cvSection in cvSections" :class="['cv_list_section']" :id="cvSection.slug">
				<h3>{{ cvSection.label }}</h3>
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
</script>

<style lang="scss">
html {
	scroll-behavior: smooth;
}

.toc {
	background-color: rgba(255, 255, 255, 0.4);
	box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.4);
	display: inline-block;
	margin-bottom: 30px;
	margin-top: 20px;
	padding: 30px 40px 30px 30px;
	transform: rotate(-4deg);

	ul {
		list-style-type: none;

		li {
			font-size: 20px;
			line-height: 160%;
		}
	}
	a {
		color: #0274be;
	}
}

.cv_list {
}

.cv_list_section {
	h3 {
		margin: 1em 0 0.4em;
	}
}

.cv_list_entry {
	line-height: 140%;
	font-size: 22px;
	display: flex;
	flex-flow: row nowrap;
	padding: 14px 0;
	p:last-of-type {
		margin-bottom: 0;
	}
}

.cv_entry_date {
	width: 12ch;
	display: inline-block;
}

.cv_entry_description {
	width: calc(98% - 12ch);
	display: inline-block;
}
</style>
