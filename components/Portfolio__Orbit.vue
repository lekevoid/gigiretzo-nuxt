<template>
	<div :class="['orbit']" @keyup="handleKeyUp" ref="selfRef" tabindex="5">
		<div class="overlay" @click="$emit('closeOrbit')"></div>
		<button class="close_orbit" @click="$emit('closeOrbit')">&times;</button>
		<div class="orbit_card">
			<div v-for="(item, k) in items" :class="['orbit_item', { active: k === currentItem }]" :key="k">
				<div class="zone_btn prev">
					<button class="btn_orbit_nav btn_prev" @click="navigateOrbit(-1)"><img src="~/assets/img/arrow_squiggle.png" /></button>
				</div>
				<div class="zone_picture">
					<NuxtImg :src="item.image" densities="x1" width="430px sm:670px md:820px" loading="lazy" preload placeholder="/loader-bars-scale.svg" />
				</div>
				<div class="zone_btn next">
					<button class="btn_orbit_nav btn_next" @click="navigateOrbit(1)"><img src="~/assets/img/arrow_squiggle.png" /></button>
				</div>
				<div class="zone_description">
					<h3>{{ item.title }}</h3>
					<p>
						<span v-if="item.height && item.width">{{ item.height }}” x {{ item.width }}” | </span>
						{{ item.description }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const { items, initialElement } = defineProps(["items", "initialElement"]);
const emit = defineEmits(["closeOrbit"]);

const currentItem = ref(0);
const selfRef = ref(null);

const { lengthX } = useSwipe(selfRef, {
	onSwipeEnd() {
		if (lengthX.value > 100) {
			navigateOrbit(1);
		} else if (lengthX.value < -100) {
			navigateOrbit(-1);
		}
	},
});

const currentItemID = computed(() => items[currentItem.value].id);

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

function handleKeyUp($event) {
	switch ($event.key) {
		case "ArrowLeft":
			navigateOrbit(-1);
			break;
		case "ArrowRight":
			navigateOrbit(1);
			break;
		case "Escape":
			emit("closeOrbit");
			break;
		default:
			return;
	}
}

onMounted(() => {
	const goToElement = items.findIndex((i) => i.id === initialElement);
	currentItem.value = goToElement;
	selfRef.value.focus();
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

@keyframes wiggleArrow {
	0% {
		top: 0;
	}

	25% {
		top: -5px;
	}

	75% {
		top: 5px;
	}

	100% {
		top: 0;
	}
}

.orbit {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 10000;
	opacity: 1;

	&.fade-enter-active,
	&.fade-leave-active {
		transition-property: opacity;
		transition-duration: var(--top-nav-reduce-transition-duration);
		transition-timing-function: ease;
	}

	&.fade-enter-from,
	&.fade-leave-to {
		opacity: 0;
	}
}

.overlay {
	background: rgba(#00f, 0.8);
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 1;
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
	z-index: 10;
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
	position: absolute;
	top: 0;
	height: 100%;

	&.prev {
		left: 0;
	}

	&.next {
		right: 0;
	}

	button {
		height: 100%;
		width: 100%;

		&:hover {
			img {
				animation: wiggleArrow 1s ease-in-out 0s infinite alternate;
			}
		}
	}

	img {
		width: 100%;
	}
}

.zone_picture {
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60%;
	left: 10%;
	position: relative;
	padding: 0 min(5vw, 20px);

	img {
		max-height: calc(100% - 32px);
		max-width: 100%;
		object-fit: contain;
		border: 5px solid #000;
		height: auto;
		width: auto;
		min-height: 100px;
		min-width: 100px;
		box-shadow: 2px 2px 8px #888;
	}
}

.zone_description {
	width: 80%;
	left: 10%;
	padding: min(2vw, 20px) min(5vw, 20px) 0;
	height: 40%;
	max-height: 50%;
	overflow-y: auto;
	font-size: clamp(16px, 2vw, 24px);

	h3 {
		font-size: 1.3em;
	}

	p {
		font-size: 1em;
	}
}

.btn_orbit_nav {
	cursor: pointer;
	padding-right: 20%;
	display: block;

	&.btn_prev {
		filter: drop-shadow(2px 2px 4px #666);
	}

	&.btn_next {
		filter: drop-shadow(-2px -2px 4px #666);
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
	z-index: 100;
	line-height: 80%;
	color: #666;
	font-weight: 900;
	transition: color 0.6s ease;

	&:hover {
		color: $blue;
	}
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
		height: 80%;
		top: 10%;

		img {
			width: 100%;
		}
	}

	.zone_picture {
		width: 46%;
		height: 100%;
		user-select: none;
		pointer-events: none;
	}

	.zone_description {
		width: 32%;
		height: auto;
		max-height: 100%;
		padding: 0 0 0 min(5vw, 40px);

		& > *:last-child {
			margin-bottom: 0;
		}
	}

	.close_orbit {
	}
}
</style>
