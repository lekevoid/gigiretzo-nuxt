<template>
	<div class="container">
		<!-- <Breadcrumb :path="breadcrumbPath" /> -->
		<!-- <PortfolioProjectsBubbleNav :project-type="project.type" /> -->
		<!-- <h1>{{ project.title }}</h1> -->
		<!-- <PortfolioMasonry :items="project.pieces" @open-picture-orbit="(imgID) => openOrbitToImg(imgID)" /> -->
	</div>
	<Teleport to="body">
		<Transition name="fade" mode="out-in">
			<div></div>
			<!-- <PortfolioOrbit v-if="showOrbit" :items="project.pieces" :initial-element="initialOrbitElementID" @close-orbit="closeOrbit" /> -->
		</Transition>
	</Teleport>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";
const { defaultProjectObject, projects, projectTypes, portfolio } = storeToRefs(usePortfolioStore());
const { locale, t } = useI18n();
const { project } = defineProps(["project"]);
const localePath = useLocalePath();

console.log(project, projects);

/*
const showOrbit = ref(false);
const initialOrbitElementID = ref("");

const breadcrumbPath = [
	{ label: t("Portfolio"), link: localePath({ name: "index" }) },
	{ label: t(project.type), link: localePath({ name: "index" }) },
];

function openOrbitToImg(imgID) {
	showOrbit.value = true;
	initialOrbitElementID.value = imgID;
}

function closeOrbit() {
	showOrbit.value = false;
}
*/
</script>

<style lang="scss">
@import "~/assets/styles/dependencies";

h1 {
	font-size: min(8vw, 46px);
}
</style>
