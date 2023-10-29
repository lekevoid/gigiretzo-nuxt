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

function recalculateMasonry() {
	if (items.length === 0 || !itemsRef.value) {
		return;
	}

	const itemsList = itemsRef.value.querySelectorAll(".masonry_item");
	const itemsHeights = [];
	let heightsIncrements = [0, 0, 0];
	let masonryBoardHeight = 0;

	if (itemsList.length === 0) {
		return;
	}

	itemsList.forEach((item) => {
		itemsHeights.push(heightsIncrements[0]);
		heightsIncrements.push(item.clientHeight + heightsIncrements[0] + 30);
		heightsIncrements = heightsIncrements.slice(1);
	});

	for (let i = 0; i < itemsList.length; i++) {
		itemsList[i].style.top = `${itemsHeights[i]}px`;
		masonryBoardHeight = Math.max(masonryBoardHeight, itemsHeights[i] + itemsList[i].clientHeight);
	}

	itemsRef.value.style.height = `${masonryBoardHeight}px`;
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

	isLoaded.value = true;
}

function imageLoaded(imgID) {
	itemsRef.value.querySelector(`#masonry_item_${imgID}`).classList.add("loaded");
	recalculateMasonry();
}

function handleKeyUp($event, imgID) {
	console.log($event.key, imgID);
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
	width: 100%;
	cursor: pointer;
	flex: 0 0 100%;
	min-height: 0px;
	transition: opacity 0.6s ease, transform 0.6s ease;
	transform: scale(1);
	opacity: 1;
	background: #fff;

	figure {
		transition: padding 0.6s ease, box-shadow 0.6s ease;
		box-shadow: 0 1px 10px 0 rgba(#000, 0.5);
		padding: 10px;
		margin: 0;
		max-width: 100%;
		width: 100%;
	}

	img,
	picture {
		width: 100%;
		max-width: 100%;
		height: auto;
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
	.masonry_item {
		width: calc(50% - 10px);
		flex: 0 0 calc(50% - 10px);

		figure {
			height: 100%;
		}

		img,
		picture {
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
			left: calc(33.333333% + 5px);
		}

		&:nth-child(3n + 3) {
			left: calc(66.666666% + 10px);
		}

		figure {
			height: auto;
			width: 100%;
		}

		img,
		picture {
			height: auto;
			object-fit: contain;
		}
	}
}
</style>
