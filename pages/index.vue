<template>
	<div class="container">
		<h1>{{ $t("home") }}</h1>
		<div class="flex">
			<div class="col">
				<h2>Project Types</h2>
				<pre>{{ projectTypes }}</pre>
				<h2>Projects</h2>
				<pre>{{ projects }}</pre>
				<h2>Portfolio</h2>
				<pre>{{ portfolio }}</pre>
				<h2>CV Entries</h2>
				<h2>CV Sections</h2>
			</div>
			<div class="col">
				<h2>fetchedData</h2>
				<pre>{{ fetchedData }}</pre>
			</div>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";

const { fetchedData, projects, projectTypes, portfolio } = storeToRefs(usePortfolioStore());
</script>

<style lang="scss">
.flex {
	display: flex;
	flex-flow: row nowrap;
}
.col {
	flex: 1 1 auto;
}
</style>
