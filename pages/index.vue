<template>
	<h1>{{ $t("home") }}</h1>
	<pre>{{ fetchedData }}</pre>
	<h2>Project Types</h2>
	<pre>{{ projectTypes }}</pre>
	<h2>Projects</h2>
	<pre>{{ projects }}</pre>
	<h2>Portfolio</h2>
	<pre>{{ portfolio }}</pre>
	<h2>CV Entries</h2>
	<h2>CV Sections</h2>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";

const { fetchedData, projects, projectTypes, portfolio, fetchedProjects, fetchedProjectTypes, fetchedPortfolio } = storeToRefs(usePortfolioStore());
</script>
