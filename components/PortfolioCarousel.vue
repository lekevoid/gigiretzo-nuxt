<template>
	<div class="portfolio_carousel" :id="`carousel_${project.id}`">
		<div class="inner">
			<h2>
				<NuxtLink :to="localePath({ name: 'portfolio-projecttype-project', params: { projecttype: project.type, project: project.slug } })">
					{{ project.title }}
				</NuxtLink>
			</h2>
			<div class="ribbon_align">
				<div class="arrow prev" @mouseover="isScrollingLeft = true" @mouseleave="isScrollingLeft = false"><div class="the_arrow"></div></div>
				<div class="ribbon_wrapper">
					<div class="ribbon" ref="ribbonRef">
						<div class="ribbon_scrolly" style="left: 0px" ref="ribbonScrollyRef">
							<NuxtImg
								v-for="(piece, k) in pieces"
								:src="piece.image"
								class="carousel_image"
								densities="x1"
								preload
								sizes="340px"
								placeholder="/loader-bars-scale.svg"
								preset="portfolioCarousel"
								:loading="k < 4 ? 'eager' : 'lazy'"
								@click="openOrbitToImg(piece.id)"
							/>
						</div>
					</div>
				</div>
				<div class="arrow next" @mouseover="isScrollingRight = true" @mouseleave="isScrollingRight = false"><div class="the_arrow"></div></div>
			</div>
		</div>
		<NuxtLink class="cta" :to="localePath({ name: 'portfolio-projecttype-project', params: { projecttype: project.type, project: project.slug } })">{{
			$t("more-details")
		}}</NuxtLink>
	</div>
	<hr />
	<Teleport to="body">
		<Transition name="fade" mode="out-in">
			<PortfolioOrbit v-if="showOrbit" :items="pieces" :initial-element="initialOrbitElementID" @close-orbit="closeOrbit" />
		</Transition>
	</Teleport>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";

const { project } = defineProps(["project"]);
const { portfolio } = storeToRefs(usePortfolioStore());

const pieces = computed(() => {
	return portfolio.value.filter((p) => p.project.slug === project.slug && p.type === "image");
});

const localePath = useLocalePath();

const ribbonRef = ref(null);
const ribbonScrollyRef = ref(null);

const isScrollingLeft = ref(false);
const isScrollingRight = ref(false);

let scrollInterval = null;

const showOrbit = ref(false);
const initialOrbitElementID = ref("");

function openOrbitToImg(imgID) {
	console.log(imgID);
	showOrbit.value = true;
	initialOrbitElementID.value = imgID;
}

function closeOrbit() {
	showOrbit.value = false;
}

function scrollRibbon(amount) {
	const wrapperRight = ribbonRef.value.getBoundingClientRect().left + ribbonRef.value.clientWidth;
	const innerRight = ribbonScrollyRef.value.getBoundingClientRect().left + ribbonScrollyRef.value.scrollWidth;
	const innerLeft = parseInt(ribbonScrollyRef.value.style.left);
	const scrollPadding = Math.min(window.innerWidth / 10, 60);

	if (amount > 0 && wrapperRight < innerRight + scrollPadding) {
		ribbonScrollyRef.value.style.left = `${innerLeft - amount}px`;
	}

	if (amount < 0 && innerLeft < 0) {
		ribbonScrollyRef.value.style.left = `${innerLeft - amount}px`;
	}
}

watch(isScrollingLeft, (val) => {
	if (val) {
		scrollInterval = setInterval(() => scrollRibbon(-10), 20);
	} else {
		clearInterval(scrollInterval);
	}
});

watch(isScrollingRight, (val) => {
	if (val) {
		scrollInterval = setInterval(() => scrollRibbon(10), 20);
	} else {
		clearInterval(scrollInterval);
	}
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

.page_home {
	padding: min(5vw, 80px) 0;
}

.portfolio_carousel {
	cursor: pointer;
	display: block;
	font-size: min(6vw, 45px);
	max-width: 100%;
	margin-bottom: min(10vw, 80px);
	overflow: hidden;
	padding: 0 20px;
	left: -20px;
	position: relative;
	transition: box-shadow 0.3s ease;
	width: calc(100% + 40px);

	.hover_shadow {
		opacity: 0;
		transition: opacity 0.6s ease;
	}
}

.inner {
}

h2 {
	font-size: 0.8em;
	color: #fff;
	margin: 0 0 0.6em;

	a {
		&:hover {
			color: #000;
		}
	}
}

.cta {
	background: linear-gradient(to bottom, #0af 0%, #05f 100%);
	background-color: #05f;
	border: 1px solid transparent;
	border-radius: 1em;
	color: #fff;
	display: inline-block;
	font-size: 16px;
	font-weight: bold;
	height: auto;
	line-height: 100%;
	padding: 0.8em 1.4em;
	margin: 10px 0 0;
	position: relative;
	transition: background-color 0.6s ease, border 0.6s ease, color 0.6s ease;
}

.ribbon_wrapper {
	overflow: hidden;
	z-index: 1;

	&:before,
	&:after {
		position: absolute;
		content: "";
		display: block;
		height: 100%;
		width: 80px;
		max-width: 5vw;
		z-index: 10;
		top: 0;
		pointer-events: none;
	}

	&:before {
		left: 0;
		background: linear-gradient(to right, rgba(#fff, 1) 0%, rgba(#fff, 0) 100%);
	}

	&:after {
		right: 0;
		background: linear-gradient(to left, rgba(#fff, 1) 0%, rgba(#fff, 0) 100%);
	}
}
.ribbon {
	overflow: hidden;
	z-index: 1;
	display: flex;
}

.ribbon_scrolly {
	padding: 20px 0;
	z-index: 1;
	display: flex;
	margin: 0 min(10vw, 60px);
	flex-flow: row nowrap;
	align-items: center;
	gap: min(3vw, 30px);
}

.carousel_image {
	background-color: #fff;
	flex: 1 1 25%;
	height: auto;
	max-height: 300px;
	max-width: 25vw;
	border: 3px solid #fff;
	box-shadow: 0 1px 10px 0 rgba(#000, 0.5);
	border-radius: 5px;
	width: auto;

	&:hover {
		opacity: 0.6;
	}
}

$arrowSizeBig: min(6vw, 30px);
$arrowSizeSmall: min(4vw, 20px);

.arrow {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	transform-origin: center center;
	filter: drop-shadow(1px 1px 4px #000) drop-shadow(1px 1px 4px #000);
	height: 50%;
	display: flex;
	align-items: center;
	z-index: 10;

	&.prev {
		left: 0;

		.the_arrow {
			border-right-width: $arrowSizeBig;
			border-right-color: #fff;
		}
	}

	&.next {
		right: 0;

		.the_arrow {
			border-left-width: $arrowSizeBig;
			border-left-color: #fff;
		}
	}

	&:hover {
		.the_arrow {
			transform: scale(0.8);
		}
	}
}

hr {
	background-color: #eef;
	height: 2px;
	margin: 60px auto;
	width: 50%;
	border: 0 none;
}

.the_arrow {
	border-width: $arrowSizeSmall 0;
	border-style: solid;
	border-color: transparent;
	transition: transform 0.3s ease;
}

@media (max-width: $xsMax), (hover: none) {
	h2 {
		width: auto;
		max-width: 60%;
		display: inline-block;
	}

	.bg {
		pointer-events: none;
	}

	.ribbon_scrolly {
		padding-bottom: 30px;
	}

	.ribbon {
		overflow-x: auto;
	}
	.arrow {
		display: none;
	}
}

@media (min-width: $sm) {
	.portfolio_carousel {
		font-size: min(6vw, 45px);
	}

	.carousel_image {
		flex-basis: 25%;
		max-width: min(20vw, 360px);
	}

	.cta {
		font-size: 0.4em;
	}
}
@media (min-width: $sm) and (hover: hover) {
	.arrow {
		pointer-events: all;
	}
}
</style>
