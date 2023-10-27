<template>
	<main class="page_portfolio">
		<div class="container" v-if="projectType">
			<Breadcrumb :path="breadcrumbPath" v-if="breadcrumbPath" />
			<h1>{{ projectType.title }}</h1>
		</div>
	</main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { defaultProjectObject, projectTypes } = storeToRefs(usePortfolioStore());

const projectType = computed(() => {
	return projectTypes.value.find((pt) => pt.slug === route.params.projecttype) || defaultProjectObject;
});

const breadcrumbPath = computed(() => [{ label: t("Portfolio"), link: localePath({ name: "index" }) }]);

definePageMeta({
	layout: "portfolio",
});
</script>

<style lang="scss"></style>
