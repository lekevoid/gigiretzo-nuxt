<template>
	<main class="page_portfolio">
		<div class="container">
			<Breadcrumb :path="breadcrumbPath" />
			<PortfolioProjectsBubbleNav :project-type="project.type" />
			<h1>{{ project.title }}</h1>
			<div class="description" v-html="project.description" />
			<PortfolioMasonry :items="pieces" @open-picture-orbit="(imgID) => openOrbitToImg(imgID)" />
			<div v-if="videos.length > 0">
				<h2>{{ $t("videos") }}</h2>
				<div class="videos">
					<div v-for="video in videos" class="video_wrapper" :key="video.id">
						<video :src="video.image" controls muted tabindex="2" />
					</div>
				</div>
			</div>
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
const { t } = useI18n();
const localePath = useLocalePath();
const { projects, portfolio } = storeToRefs(usePortfolioStore());
const defaultProjectObject = useDefaultProjectObject();

/* Project functions */

const project = computed(() => {
	return projects.value.find((p) => p.slug === route.params.project) || defaultProjectObject;
});

const pieces = computed(() => {
	return portfolio.value.filter((piece) => piece.project.slug === project.value.slug && piece.type === "image");
});

const videos = computed(() => {
	return portfolio.value.filter((piece) => piece.project.slug === project.value.slug && piece.type === "video");
});

/* Breadcrumb functions */

const breadcrumbPath = computed(() => {
	let crumbs = [{ label: t("portfolio"), link: localePath({ name: "index" }) }];

	if (project?.value?.type) {
		crumbs.push({ label: t(project.value.type), link: localePath({ name: "portfolio-projecttype", params: { projecttype: project.value.type } }) });
	}

	return crumbs;
});

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

/* Meta & SEO */

const seoTitle = computed(() => project.value?.title || "Portfolio");

const seoDescription = computed(() => {
	if (project.value?.seoDescription) {
		return project.value.seoDescription;
	}

	if (project.value?.description) {
		return project.value.description;
	}

	return "";
});

const seoImage = computed(() => {
	return pieces.value?.[0]?.image || "";
});

definePageMeta({
	pageTransition: { name: "page", mode: "in-out" },
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

.videos {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	gap: 10%;
	margin-bottom: min(5vw, 80px);

	.video_wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1 1 30%;
	}

	video {
		width: auto;
		border-radius: 5px;
		box-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);
		max-height: 70vh;
		max-width: 100%;
		padding: 10px;
	}
}
</style>
