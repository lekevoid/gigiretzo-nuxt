<template>
	<div class="inner">
		<h2>{{ $t("upcoming-events") }}</h2>
		<h2>{{ $t("press") }}</h2>
		<div class="press_items">
			<div v-for="(item, k) in press" :class="['press_item', { active: k === currentPressItem }]">
				<a :href="item.src" target="_blank">
					<NuxtImg v-if="item.type === 'image'" :src="item.src" :class="''" placeholder="/loader-bars-scale.svg" />
				</a>
			</div>
			<button class="press_nav_btn prev" @click="navigatePress(-1)">
				<img src="@/assets/img/arrow_caret.svg" alt="Previous" />
			</button>
			<button class="press_nav_btn next" @click="navigatePress(1)">
				<img src="@/assets/img/arrow_caret.svg" alt="Next" />
			</button>
		</div>
	</div>
</template>

<script setup>
import VueMarkdown from "vue-markdown-render";
import { storeToRefs } from "pinia";
import { useAboutPageStore } from "@/stores/about";

const { press } = storeToRefs(useAboutPageStore());

const currentPressItem = ref(0);

function navigatePress(dir) {
	let nextPos = currentPressItem.value + dir;
	if (nextPos < 0) {
		nextPos = press.value.length - 1;
	}
	if (nextPos >= press.value.length) {
		nextPos = 0;
	}
	currentPressItem.value = nextPos;
}
</script>

<style lang="scss">
pre {
	width: 100%;
	max-width: 800px;
}

.press_items {
	max-height: 80vh;
	height: auto;
	background-color: #fff;
	max-width: 100%;
	display: block;
	width: 100%;
	align-items: center;
	justify-content: center;
	position: relative;
}

.press_item {
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 50%;
	top: 50%;
	opacity: 0;
	max-height: 100%;
	transform: translate(-50%, -50%);
	width: auto;
	overflow: hidden;

	&.active {
		transition: opacity 0.6s;
		position: relative;
		opacity: 1;
		left: 0;
		top: 0;
		transform: none;
	}

	img {
		object-fit: contain;
		width: auto;
		max-width: 100%;
		max-height: 80vh;
		height: auto;
	}
}

.press_nav_btn {
	height: 100%;
	width: min(10%, 60px);
	position: absolute;
	top: 0;
	cursor: pointer;
	appearance: none;
	background: transparent linear-gradient(to right, rgba(#fff, 0) 0%, rgba(#fff, 0.6) 50%, rgba(#fff, 1) 100%);
	-webkit-tap-highlight-color: transparent;

	&:hover {
		img {
			opacity: 0.9;
		}
	}

	&.next {
		right: 0;
		z-index: 10;
	}

	&.prev {
		left: 0;
		transform: rotate(180deg);
		z-index: 10;
	}

	img {
		filter: invert(1);
		transition: opacity 0.3s;
		height: 20px;
		width: 20px;
		opacity: 0.6;
	}
}

@media (orientation: landscape) {
	.press_items {
		&,
		img {
			height: 80vh;
			max-height: 500px;
		}
	}
}
</style>
