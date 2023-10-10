<template>
	<div class="bubble_grid">
		<div v-for="project in projectsOfType" class="bubble">
			<div class="inner">
				<NuxtLink :to="localePath({ name: `portfolio-${project.slug}` })">{{ project.title[locale] }}</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";

const { projectType } = defineProps(["projectType"]);
const { locale } = useI18n();
const localePath = useLocalePath();

const { hasFetchedProjects, projects } = storeToRefs(usePortfolioStore());
console.log(projectType);

const projectsOfType = computed(() => {
	return projects.value.filter((project) => project.type === projectType);
});
</script>

<style lang="scss" scoped>
.bubble_grid {
	display: flex;
	flex-flow: row wrap;
	gap: 20px;
	width: 100%;
	justify-content: space-between;
	margin-bottom: min(5vw, 60px);
}

.bubble {
	border: 5px solid #000;
	flex: 0 0 20%;
	display: flex;
	font-size: min(4vw, 28px);
	align-items: center;
	justify-content: center;
	aspect-ratio: 3/1;
	border-radius: 50%;
}

.bubble_inner {
}
</style>
