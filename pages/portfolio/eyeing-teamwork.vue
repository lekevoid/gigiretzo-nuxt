<template>
	<h1>Eyeing Teamwork</h1>
	<div class="series">
		<PortfolioMasonry :items="projectPieces" />
	</div>
</template>

<script setup>
import { usePortfolioStore } from "@/stores/portfolio";
const { hasFetchedProjects, populatePortfolio, getPiecesFromProject } = usePortfolioStore();

populatePortfolio();
if (!hasFetchedProjects) {
}

const projectPieces = getPiecesFromProject("Eyeing Teamwork");
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
