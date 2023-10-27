<template>
	<main class="page_portfolio">
		<div class="container" v-if="project">
			<Breadcrumb :path="breadcrumbPath" v-if="breadcrumbPath" />
			<!-- <PortfolioProjectsBubbleNav :project-type="project.type" /> -->
			<h1>{{ project.title }}</h1>
			<p class="description">{{ project.description }}</p>
			<PortfolioMasonry v-if="pieces.length > 0" :items="pieces" @open-picture-orbit="(imgID) => openOrbitToImg(imgID)" />
		</div>
		<Teleport to="body">
			<Transition name="fade" mode="out-in">
				<PortfolioOrbit v-if="showOrbit" :items="pieces" :initial-element="initialOrbitElementID" @close-orbit="closeOrbit" />
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

/* Project functions */

const project = computed(() => {
	return projects.value.find((p) => p.slug === route.params.project) || defaultProjectObject;
});

const pieces = computed(() => {
	return portfolio.value;
});

/* Breadcrumb functions */

const breadcrumbPath = computed(() => [
	{ label: t("Portfolio"), link: localePath({ name: "index" }) },
	{ label: t(project.value.type), link: localePath({ name: "portfolio-projecttype", params: { projecttype: project.type } }) },
]);

/* Orbit functions */

const showOrbit = ref(false);
const initialOrbitElementID = ref("");

function openOrbitToImg(imgID) {
	showOrbit.value = true;
	initialOrbitElementID.value = imgID;
}

function closeOrbit() {
	showOrbit.value = false;
}

definePageMeta({
	layout: "portfolio",
});
</script>

<style lang="scss" scoped>
.description {
	display: inline-block;
	font-size: 22px;
	margin-bottom: 40px;
	text-align: justify;
	line-height: 180%;
}
</style>
