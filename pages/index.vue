<template>
	<main class="page_home">
		<div class="container">
			<h1>{{ $t("portfolio") }}</h1>
			<HomeCarousel v-for="carousel in carousels" :id="carousel.id" :title="carousel.title" :cta="carousel.cta" :images="carousel.images" />
		</div>
	</main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useHomePageStore } from "@/stores/home";

const { carousels } = storeToRefs(useHomePageStore());
</script>

<style lang="scss">
.page_home {
	padding: min(5vw, 80px) 0;
}
</style>
