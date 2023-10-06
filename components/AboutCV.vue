<template>
	<div class="inner">
		<h2>{{ $t("cv") }}</h2>
		<div class="toc">
			<ul>
				<li v-for="cvSection in cvSections">{{ cvSection.label }} - {{ cvSection.slug }}</li>
			</ul>
		</div>
		<div class="cv_list">
			<pre>
		{{ cvEntries }}
		</pre
			>
			<div class="cv_list_section" v-for="cvSection in cvSections">
				<h3>{{ cvSection.title }}</h3>
				<div class="cv_list_entry" v-for="cvEntry in cvEntriesBySectionAndDate[cvSection.slug]">
					<AboutCVEntryDate :date-start="cvEntry.dateStart" :date-end="cvEntry.dateEnd" :show="cvEntry.showDate" />
					<div class="cv_entry_description">{{ cvEntry }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const { locale, t } = useI18n();

const { data } = defineProps(["data"]);

function slugify(str) {
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/(\s|_|-)/g, "-")
		.toLowerCase();
}

function sortBy(initialObject, sortBy = "slug", sortDir = "asc") {
	let out = [];

	if (typeof initialObject === "object") {
		out = Object.entries(initialObject).map((e) => ({ ...e[1], key: e[0] }));
	} else {
		out = initialObject;
	}

	if (out.length > 0) {
		out.sort(function (a, b) {
			if (!a[sortBy] && a[sortBy] !== 0) {
				console.debug(`Error : Trying to sort by ${sortBy} ; Object ${a} doesn't have a "${sortBy}" attribute.`);
				return 0;
			}

			const nameA = `${a[sortBy]}`.toLowerCase(),
				nameB = `${b[sortBy]}`.toLowerCase();

			if (nameA > nameB) {
				return sortDir === "asc" ? 1 : -1;
			}

			if (nameA < nameB) {
				return sortDir === "asc" ? -1 : 1;
			}

			return 0;
		});
	}

	return out;
}

const cvEntries = computed(() => {
	return data.slice(1).map((entry) => {
		let description;
		switch (locale) {
			case "fr":
				description = entry[4];
			case "en":
			default:
				description = entry[3];
		}
		return { sectionSlug: slugify(t(entry[0])), section: t(entry[0]), dateStart: entry[1], dateEnd: entry[2], description };
	});
});

const cvSections = computed(() => {
	let out = [];
	let used = [];

	cvEntries.value.forEach((entry) => {
		const sectionLabel = entry.section;
		const sectionSlug = entry.sectionSlug;

		if (!used.includes(sectionSlug)) {
			used.push(sectionSlug);
			out.push({ slug: sectionSlug, label: sectionLabel });
		}
	});

	return sortBy(out, "slug");
});

const cvEntriesBySectionAndDate = computed(() => {
	let out = [];
	let currentContextConsidered = "";

	cvSections.value.forEach((section) => {
		out[section.slug] = [];
	});

	cvEntries.value.forEach((entry) => {
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
