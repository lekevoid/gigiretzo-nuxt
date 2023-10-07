<template>
	<h1>Eyeing Teamwork</h1>
	<div class="series">
		<div v-for="piece in organizedPortfolio" class="piece">
			<NuxtImg :src="piece.img" />
		</div>
	</div>
</template>

<script setup>
import { getPortfolio } from "@/composables/useSheet";

const { locale } = useI18n();

const { portfolio } = await getPortfolio("Eyeing Teamwork");

const organizedPortfolio = computed(() => {
	let titleIndex = 1;
	let descriptionIndex = 2;
	if (locale.value === "fr") {
		titleIndex = 3;
		descriptionIndex = 4;
	}

	return portfolio.slice(1).map((piece) => {
		return {
			img: piece[0],
			title: piece[titleIndex],
			description: piece[descriptionIndex] || "",
		};
	});
});

console.log(organizedPortfolio);
</script>

<style lang="scss">
.series {
	display: flex;
	flex-flow: row wrap;
	gap: 40px;
}

.piece {
	flex: 0 0 20%;
	display: inline-block;

	img {
		max-width: 100%;
	}
}
</style>
