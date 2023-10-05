<template>
	<div class="inner">
		<h2 v-html="title"></h2>
		<div class="toc">
			<ul>
				<li v-for="cvSection in cvSections">{{ cvSection.title }}</li>
			</ul>
		</div>
		<div class="cv_list">
			<div class="cv_list_section" v-for="cvSection in cvSections">
				<h3>{{ cvSection.title }}</h3>
				<div class="cv_list_entry" v-for="cvEntry in cvSection.entries">
					<AboutCVEntryDate :date-start="cvEntry.dateStart" :date-end="cvEntry.dateEnd" />
					<div class="cv_entry_description">{{ cvEntry }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const { data } = defineProps(["data"]);

console.log(data);
const title = data.title;

const cvSections = data.content.sections;
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
}
.cv_entry_description {
}
</style>
