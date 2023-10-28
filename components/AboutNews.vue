<template>
	<div class="inner">
		<h2>{{ $t("upcoming-events") }}</h2>
		<h2>{{ $t("press") }}</h2>
		<div class="press_items">
			<div v-for="(item, k) in press" :class="['press_item', { active: k === currentPressItem }]">
				<NuxtImg v-if="item.type === 'image'" :src="item.src" :class="''" placeholder="/loader-bars-scale.svg" />
			</div>
		</div>
	</div>
</template>

<script setup>
import VueMarkdown from "vue-markdown-render";
import { storeToRefs } from "pinia";
import { useAboutPageStore } from "@/stores/about";

const { press } = storeToRefs(useAboutPageStore());

const currentPressItem = ref(0);
</script>

<style lang="scss">
pre {
	width: 100%;
	max-width: 800px;
}

.press_items {
	height: 80vh;
	max-height: 500px;
	background-color: #fff;
	max-width: 100%;
	display: block;
	width: 100%;
	align-items: center;
	justify-content: center;
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
	}

	img {
		object-fit: contain;
		width: auto;
		max-width: 100%;
		height: 80vh;
		max-height: 500px;
	}
}
</style>
