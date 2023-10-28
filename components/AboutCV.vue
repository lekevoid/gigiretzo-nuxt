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
import { storeToRefs } from "pinia";
import { useAboutPageStore } from "@/stores/about";

const { cvSections, cvEntries } = storeToRefs(useAboutPageStore());

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
@import "~/assets/styles/dependencies";

html {
	scroll-behavior: smooth;
}

.toc {
	background-color: rgba(255, 255, 255, 0.4);
	box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.4);
	display: inline-block;
	margin-bottom: 30px;
	margin-top: 20px;
	padding: min(5vw, 30px) min(6vw, 40px) min(5vw, 30px) min(5vw, 30px);
	transform: rotate(-4deg);

	ul {
		list-style-type: none;

		li {
			line-height: 160%;
		}
	}
	a {
		color: #0274be;
	}
}

.cv_list {
	font-size: var(--about-page-font-size);
}

.cv_list_section {
	h3 {
		margin: 1em 0 0.4em;
	}
}

.cv_list_entry {
	line-height: 140%;
	font-size: 1em;
	display: flex;
	flex-flow: row wrap;
	padding: 0 0 10px;

	h2 {
		font-size: 1.6em;
	}

	h3 {
		font-size: 1.2em;
	}

	h4 {
		font-size: 1em;
	}

	p {
		font-size: 1em;
	}

	p:last-of-type {
		margin-bottom: 0;
	}
}

.cv_entry_date {
	width: 100%;
	font-weight: bold;
	margin: 12px 0 8px;
	font-size: 1.1em;
	display: inline-block;
}

.cv_entry_description {
	width: 100%;
	display: inline-block;
}

@media (min-width: $sm) {
	.cv_list_entry {
		flex-wrap: nowrap;
		padding: 14px 0;
	}

	.cv_entry_date {
		width: 12ch;
		margin: 0;
		font-size: 1em;
	}

	.cv_entry_description {
		width: calc(98% - 12ch);
	}
}
</style>
