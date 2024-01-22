<template>
	<div :class="['masonry_container', { loaded: isLoaded }]" ref="itemsRef">
		<div
			v-for="(item, k) in items"
			class="masonry_item"
			:data-loading="k >= 6 ? 'lazy' : 'eager'"
			@click="$emit('openPictureOrbit', item.id)"
			@keyup="($e) => handleKeyUp($e, item.id)"
			:id="`masonry_item_${item.id}`"
			:key="item.id"
		>
			<figure>
				<NuxtImg
					:src="item.image"
					@load="imageLoaded(item.id)"
					densities="x1"
					sizes="430px sm:670px md:820px"
					:loading="k > 6 ? 'lazy' : 'eager'"
					placeholder="/loader-bars-scale.svg"
					preload
					tabindex="1"
				/>
			</figure>
		</div>
	</div>
</template>

<script setup>
const { items } = defineProps(["items"]);
const emit = defineEmits(["openPictureOrbit"]);

const isLoaded = ref(false);
const itemsRef = ref(null);

const { width: windowWidth } = useWindowSize();

function recalculateMasonry() {
	if (items.length === 0 || !itemsRef.value) {
		return;
	}

	const itemsList = itemsRef.value.querySelectorAll(".masonry_item");

	if (itemsList.length === 0) {
		return;
	}

	const itemsHeights = [];
	let heightsIncrements = [0, 0];
	let gapY = Math.min(windowWidth.value / 40, 30);
	let masonryBoardHeight = 0;

	if (windowWidth.value >= 600) {
		heightsIncrements = [0, 0, 0];
	}

	itemsList.forEach((item) => {
		const lowestCurrentHeight = Math.min(...heightsIncrements);
		const lowestCurrentHeightPos = heightsIncrements.indexOf(lowestCurrentHeight);

		itemsHeights.push({ itemColumn: lowestCurrentHeightPos, posY: heightsIncrements[lowestCurrentHeightPos] });
		heightsIncrements[lowestCurrentHeightPos] = item.clientHeight + heightsIncrements[lowestCurrentHeightPos] + gapY;
	});

	for (let i = 0; i < itemsList.length; i++) {
		itemsList[i].style.top = `${itemsHeights[i].posY}px`;
		itemsList[i].classList.remove(`in_col_1`);
		itemsList[i].classList.remove(`in_col_2`);
		itemsList[i].classList.remove(`in_col_3`);
		itemsList[i].classList.add(`in_col_${itemsHeights[i].itemColumn + 1}`);
		masonryBoardHeight = Math.max(masonryBoardHeight, itemsHeights[i].posY + itemsList[i].clientHeight);
	}

	itemsRef.value.style.height = `${masonryBoardHeight}px`;
}

/* function resetMasonry() {
	itemsRef.value.style.height = `auto`;
	const itemsList = document.querySelectorAll(".masonry_container .masonry_item");
	itemsList.forEach((item) => {
		item.style.top = "0px";
	});
} */

function handleViewportSize() {
	recalculateMasonry();
	isLoaded.value = true;
}

function imageLoaded(imgID) {
	itemsRef.value.querySelector(`#masonry_item_${imgID}`).classList.add("loaded");
	recalculateMasonry();
}

function handleKeyUp($event, imgID) {
	if ($event.key === "Enter") {
		emit("openPictureOrbit", imgID);
	}
}

onMounted(() => {
	window.addEventListener("resize", handleViewportSize);
	handleViewportSize();
	setTimeout(handleViewportSize, 200);
	setTimeout(handleViewportSize, 4000);
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
	width: 100%;
	margin-left: 4px;
	min-height: 300px;
	opacity: 0;
	transition: opacity 0.3s;
	margin-bottom: min(5vw, 80px);

	&.loaded {
		opacity: 1;
	}
}

.masonry_item {
	width: calc(50% - 1.5vw);
	cursor: pointer;
	flex: 0 0 calc(50% - 1.5vw);
	min-height: 0px;
	transition: opacity 0.6s ease, transform 0.6s ease;
	transform: scale(1);
	opacity: 1;
	background: #fff;
	position: absolute;

	&.in_col_1 {
		left: 0%;
	}

	&.in_col_2 {
		left: calc(50% + 1.5vw);
	}

	figure {
		transition: padding 0.6s ease, box-shadow 0.6s ease;
		box-shadow: 0 1px 10px 0 rgba(#000, 0.5);
		padding: 8px;
		margin: 0;
		max-width: 100%;
		width: 100%;
	}

	img,
	picture {
		width: 100%;
		max-width: 100%;
		height: auto;
		object-fit: cover;
	}

	&:not(.loaded) {
		transform: scale(1);
		min-height: 300px;
		opacity: 1;
	}

	&:hover {
		transform: scale(1) translate(-6px, -6px);

		figure {
			box-shadow: 8px 9px 24px 0 rgba(#000, 0.5);
		}
	}
}

@media (min-width: $sm) {
	.masonry_container {
		display: block;
	}

	.masonry_item {
		width: calc(33.333333% - 1vw);
		flex: 0 0 calc(33.333333% - 1vw);

		&.in_col_1 {
			left: 0%;
		}

		&.in_col_2 {
			left: calc(33.333333% + 0.5vw);
		}

		&.in_col_3 {
			left: calc(66.666666% + 1vw);
		}

		figure {
			height: auto;
			width: 100%;
		}

		img,
		picture {
			height: auto;
			object-fit: cover;
			aspect-ratio: auto;
			max-height: 25vw;
			min-height: 15vw;
		}
	}
}

@media (min-width: $md) {
}
</style>
