<template>
	<div :class="['orbit']">
		<button class="close_orbit" @click="$emit('closeOrbit')">&times;</button>
		<div class="orbit_card">
			<p>{{ currentItem }}</p>
			<div v-for="(item, k) in items" :class="['orbit_item', { active: k === currentItem }]" :key="k">
				<div class="zone_btn">
					<button class="btn_orbit_nav btn_prev" @click="navigateOrbit(-1)"><img src="~/assets/img/arrow_squiggle.png" /></button>
				</div>
				<div class="zone_picture">
					<NuxtImg :src="item.image" width="430px sm:670px md:820px" loading="lazy" />
				</div>
				<div class="zone_btn">
					<button class="btn_orbit_nav btn_next" @click="navigateOrbit(1)"><img src="~/assets/img/arrow_squiggle.png" /></button>
				</div>
				<div class="zone_description">
					<h3>{{ item.title }}</h3>
					<p>{{ item.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const { items, initialElement } = defineProps(["items", "initialElement"]);

const currentItem = ref(0);

function navigateOrbit(dir) {
	let nextPos = currentItem.value + dir;
	if (nextPos < 0) {
		nextPos = items.length - 1;
	}
	if (nextPos >= items.length) {
		nextPos = 0;
	}
	currentItem.value = nextPos;
}

onMounted(() => {
	const goToElement = items.findIndex((i) => i.id === initialElement);
	currentItem.value = goToElement;
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

.orbit {
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(#00f, 0.8);
	top: 0;
	left: 0;
	z-index: 10000;
	opacity: 1;

	&.fade-enter-active,
	&.fade-leave-active {
		transition: opacity 1s ease;
	}

	&.fade-enter-from,
	&.fade-leave-to {
		opacity: 0;
	}
}

.orbit_card {
	border-radius: 10px;
	background-color: #fff;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: calc(100% - 4vmin);
	height: calc(100% - 4vmin);
}

.orbit_item {
	opacity: 0;
	position: absolute;
	top: 2vmin;
	left: 2vmin;
	height: calc(100% - 4vmin);
	width: calc(100% - 4vmin);
	transition: opacity 0.6s ease;
	pointer-events: none;
	display: flex;
	flex-flow: row wrap;
	align-items: center;

	&.active {
		opacity: 1;
		pointer-events: all;
	}
}

.zone_btn {
	width: 10%;

	img {
		width: 100%;
	}
}

.zone_picture {
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	position: relative;

	img {
		max-height: calc(100% - 32px);
		max-width: 100%;
		object-fit: contain;
		border: 5px solid #000;
		height: auto;
		width: auto;
		box-shadow: 2px 2px 8px #888;
	}
}

.zone_description {
	width: 100%;
}

.btn_orbit_nav {
	filter: drop-shadow(2px 2px 4px #666);
	cursor: pointer;
	padding-right: 20%;
	display: block;

	&.btn_prev {
	}
	&.btn_next {
		transform: rotate(180deg);
	}
}

.close_orbit {
	position: absolute;
	right: 12px;
	top: 10px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1vw;
	font-size: clamp(30px, 4vmax, 60px);
	text-shadow: 1px 1px 4px #000;
	z-index: 10;
	line-height: 80%;
	color: #666;
	font-weight: 900;
}

@media (min-width: $sm) {
	.orbit {
	}

	.orbit_card {
	}

	.close_orbit {
	}
}
@media (min-width: $md) {
	.orbit {
	}

	.orbit_card {
	}

	.orbit_item {
		flex-flow: row nowrap;
	}

	.zone_btn {
		width: 6%;

		img {
			width: 100%;
		}
	}

	.zone_picture {
		width: 46%;
	}

	.zone_description {
		width: 32%;
	}

	.close_orbit {
	}
}
</style>
