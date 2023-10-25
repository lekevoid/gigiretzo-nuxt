<template>
	<main class="page_portfolio">
		<PortfolioPageComponents :project="project" />
	</main>
</template>

<script setup>
definePageMeta({
	layout: "portfolio",
});

import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";
const { hasFetchedProjects, projects } = storeToRefs(usePortfolioStore());
const { populatePortfolio, getPiecesFromProject } = usePortfolioStore();

if (!hasFetchedProjects.value) {
	await populatePortfolio();
}

const project = projects.value.find((p) => p.id === slugify("Eyeing Teamwork"));
</script>

<style lang="scss"></style>
