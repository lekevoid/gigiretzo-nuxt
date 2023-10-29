<template>
	<main class="page_portfolio">
		<div class="container" v-if="projectType">
			<Breadcrumb :path="breadcrumbPath" v-if="breadcrumbPath" />
			<h1>{{ projectType.title }}</h1>
			<PortfolioCarousel v-for="project in projectsOfType" :project="project" />
		</div>
	</main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { defaultProjectObject, projects, projectTypes } = storeToRefs(usePortfolioStore());

const breadcrumbPath = computed(() => [{ label: t("portfolio"), link: localePath({ name: "index" }) }]);

const projectType = computed(() => {
	return projectTypes.value.find((pt) => pt.slug === route.params.projecttype) || defaultProjectObject;
});

const projectsOfType = computed(() => {
	return projects.value.filter((project) => project.type === projectType.value.slug);
});

definePageMeta({
	layout: "portfolio",
});
</script>

<style lang="scss">
.page_portfolio {
	padding-bottom: 80px;
	.container {
		hr:last-of-type {
			display: none;
		}
	}
}
</style>
