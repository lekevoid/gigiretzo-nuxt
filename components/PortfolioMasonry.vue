<template>
	<div class="masonry_container" ref="itemsRef">
		<div v-for="item in items" class="masonry_item" @click="$emit('openPictureOrbit', item.id)" :id="`masonry_item_${item.id}`" :key="item.id">
			<figure>
				<NuxtImg :src="item.img" @load="imageLoaded(item.id)" />
			</figure>
		</div>
	</div>
</template>

<script setup>
const { items } = defineProps(["items"]);

const isLoaded = ref(false);
const itemsRef = ref(null);

function recalculateMasonry() {
	if (items.length === 0) {
		return;
	}

	const itemsList = itemsRef.value.querySelectorAll(".masonry_item");
	const itemsHeights = [];
	let heightsIncrements = [0, 0, 0];

	itemsList.forEach((item) => {
		itemsHeights.push(heightsIncrements[0]);
		heightsIncrements.push(item.clientHeight + heightsIncrements[0] + 30);
		heightsIncrements = heightsIncrements.slice(1);
	});

	for (let i = 0; i < itemsList.length; i++) {
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

function imageLoaded(imgID) {
	itemsRef.value.querySelector(`#masonry_item_${imgID}`).classList.add("visible");
	recalculateMasonry();
}

onMounted(() => {
	handleViewportSize();
	window.addEventListener("resize", handleViewportSize);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", handleViewportSize);
});
</script>

<style lang="scss" scoped>
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
	cursor: pointer;
	flex: 0 0 100%;
	opacity: 0;
	transition: opacity 0.6s ease, transform 0.6s ease;
	transform: scale(0.4);

	&.visible {
		opacity: 1;
		transform: scale(1);
	}

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