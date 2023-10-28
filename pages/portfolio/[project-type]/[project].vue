<template>
	<main class="page_portfolio">
		<div class="container" v-if="project">
			<Breadcrumb :path="breadcrumbPath" v-if="breadcrumbPath" />
			<PortfolioProjectsBubbleNav :project-type="project.type" />
			<h1>{{ project.title }}</h1>
			<div class="description" v-html="project.description" />
			<PortfolioMasonry v-if="pieces.length > 0" :items="pieces" @open-picture-orbit="(imgID) => openOrbitToImg(imgID)" />
		</div>
		<Teleport to="body">
			<Transition name="fade" mode="out-in">
				<PortfolioOrbit v-if="showOrbit" :items="pieces" :initial-element="initialOrbitElementID" @close-orbit="closeOrbit" />
			</Transition>
		</Teleport>
	</main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";

const route = useRoute();
const { locale, t } = useI18n();
const localePath = useLocalePath();
const { defaultProjectObject, projects, portfolio } = storeToRefs(usePortfolioStore());

/* Project functions */

const project = computed(() => {
	return projects.value.find((p) => p.slug === route.params.project) || defaultProjectObject;
});

const pieces = computed(() => {
	return portfolio.value.filter((piece) => piece.project.slug === project.value.slug);
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
	console.log(imgID);
	showOrbit.value = true;
	initialOrbitElementID.value = imgID;
}

function closeOrbit() {
	showOrbit.value = false;
}

/* Meta & SEO */

const seoTitle = computed(() => `${project.value?.title || "Portfolio"} – GigiRetzo`);
const seoDescription = computed(() => project.value?.description || "");
const seoImage = computed(() => pieces?.[0]?.image || "");

definePageMeta({
	layout: "portfolio",
});

useSeoMeta({
	title: () => seoTitle.value,
	ogTitle: () => seoTitle.value,
	description: () => seoDescription.value,
	ogDescription: () => seoDescription.value,
	ogImage: () => seoImage.value,
	twitterCard: "summary_large_image",
});
</script>

<style lang="scss" scoped>
.description {
	display: inline-block;
	font-size: var(--about-page-font-size);
	margin-bottom: 40px;
	text-align: justify;
	line-height: 180%;
}
</style>
