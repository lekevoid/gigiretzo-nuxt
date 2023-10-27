<template>
	<main class="page_portfolio">
		<div class="container" v-if="project">
			<Breadcrumb :path="breadcrumbPath" v-if="breadcrumbPath" />
			<!-- <PortfolioProjectsBubbleNav :project-type="project.type" /> -->
			<h1>{{ project.title }}</h1>
			<pre>{{ project }}</pre>
			<!-- <PortfolioMasonry :items="project.pieces" @open-picture-orbit="(imgID) => openOrbitToImg(imgID)" /> -->
		</div>
		<Teleport to="body">
			<Transition name="fade" mode="out-in">
				<div></div>
				<!-- <PortfolioOrbit v-if="showOrbit" :items="project.pieces" :initial-element="initialOrbitElementID" @close-orbit="closeOrbit" /> -->
			</Transition>
		</Teleport>
	</main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";

const route = useRoute();
const { locale, t } = useI18n();
const localePath = useLocalePath();
const { defaultProjectObject, projects, projectTypes, portfolio } = storeToRefs(usePortfolioStore());

const project = computed(() => {
	return projects.value.find((p) => p.slug === route.params.project) || defaultProjectObject;
});

const breadcrumbPath = computed(() => [
	{ label: t("Portfolio"), link: localePath({ name: "index" }) },
	{ label: t(project.value.type), link: localePath({ name: "portfolio-projecttype", params: { projecttype: project.type } }) },
]);

definePageMeta({
	layout: "portfolio",
});
</script>

<style lang="scss"></style>
