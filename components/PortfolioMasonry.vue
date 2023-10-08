<template>
	<div class="masonry_container">
		<div v-for="item in items" class="masonry_item">
			<figure>
				<NuxtImg :src="item.img" @load="recalculateMasonry()" />
			</figure>
		</div>
	</div>
</template>

<script setup>
const { items } = defineProps(["items"]);

function recalculateMasonry() {
	if (items.length === 0) {
		return;
	}

	const itemsList = document.querySelectorAll(".masonry_container .masonry_item");
	const itemsHeights = [];
	let heightsIncrements = [0, 0, 0];

	itemsList.forEach((item) => {
		itemsHeights.push(heightsIncrements[0]);
		heightsIncrements.push(item.clientHeight + heightsIncrements[0] + 20);
		heightsIncrements = heightsIncrements.slice(1);
	});

	for (let i = 0; i < itemsList.length; i++) {
		console.log(itemsList[i]);
		itemsList[i].style.top = `${itemsHeights[i]}px`;
	}
}

function resetMasonry() {
	const itemsList = document.querySelectorAll(".masonry_container .masonry_item");
	itemsList.forEach((item) => {
		item.style.top = "0px";
	});
}

function handleViewportSize() {
	const viewportWidth = window.innerWidth;

	if (viewportWidth > 900) {
		recalculateMasonry();
	} else {
		resetMasonry();
	}
}

onMounted(() => {
	handleViewportSize();
	window.addEventListener("resize", handleViewportSize);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", handleViewportSize);
});
</script>

<style lang="scss">
@import "~/assets/styles/dependencies";

.masonry_container {
	display: flex;
	position: relative;
	gap: 20px;
	flex-flow: row wrap;
	width: calc(100% - 32px);
	margin: 0 16px;
}

.masonry_item {
	width: 100%;
	flex: 0 0 100%;

	figure {
		box-shadow: 0 1px 10px 0 rgba(#000, 0.5);
		padding: 10px;
		margin: 0;
	}

	img {
		width: 100%;
	}
}

@media (min-width: $sm) {
	.masonry_item {
		width: calc(50% - 10px);
		flex: 0 0 calc(50% - 10px);

		figure {
			height: 100%;
		}

		img {
			height: 100%;
			object-fit: cover;
		}
	}
}

@media (min-width: $md) {
	.masonry_container {
		display: block;
		border: 2px solid green;
		min-height: 200px;
	}

	.masonry_item {
		position: absolute;
		width: calc(33.333333% - 20px);
		flex: 0 0 calc(33.333333% - 20px);
		&:nth-child(3n + 1) {
			left: 0%;
		}
		&:nth-child(3n + 2) {
			left: calc(33.333333% + 10px);
		}
		&:nth-child(3n + 3) {
			left: calc(66.666666% + 20px);
		}
	}
}
</style>
