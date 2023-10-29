<template>
	<div class="home_carousel" :id="`carousel_${id}`">
		<div class="inner">
			<h2>{{ title }}</h2>
			<span class="cta">{{ cta }}</span>
			<div class="ribbon_align">
				<div class="arrow prev" @mouseover="isScrollingLeft = true" @mouseleave="isScrollingLeft = false"><div class="the_arrow"></div></div>
				<div class="ribbon" ref="ribbonRef">
					<div class="ribbon_scrolly" style="left: 0px" ref="ribbonScrollyRef">
						<div v-for="image in images" class="image_wrapper">
							<NuxtImg :src="image" class="carousel_image" />
						</div>
					</div>
				</div>
				<div class="arrow next"><div class="the_arrow"></div></div>
			</div>
		</div>
	</div>
</template>

<script setup>
const { id, title, cta, images } = defineProps(["id", "title", "cta", "images"]);

const ribbonRef = ref(null);
const ribbonScrollyRef = ref(null);

const isScrollingLeft = ref(false);
const isScrollingRight = ref(false);

let scrollInterval = null;

function scrollRibbon(amount) {
	const wrapperRight = ribbonRef.value.getBoundingClientRect().left + ribbonRef.value.clientWidth;
	const innerRight = ribbonScrollyRef.value.getBoundingClientRect().left + ribbonScrollyRef.value.scrollWidth;
	const innerLeft = parseInt(ribbonScrollyRef.value.style.left);

	console.log(amount, wrapperRight, innerRight);

	if (amount > 0 && wrapperRight < innerRight) {
		console.log(`${innerLeft + amount}px`);
		ribbonScrollyRef.value.style.left = `${innerLeft + amount}px`;
	}
}

watch(isScrollingLeft, (val) => {
	if (val) {
		scrollInterval = setInterval(() => scrollRibbon(10), 100);
	} else {
		clearInterval(scrollInterval);
	}
});

watch(isScrollingRight, (val) => {
	if (val) {
		scrollInterval = setInterval(() => scrollRibbon(10), 100);
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

.home_carousel {
	border-radius: 1em;
	box-shadow: 4px 4px 16px #888;
	cursor: pointer;
	display: block;
	font-size: min(6vw, 45px);
	max-width: 100%;
	margin-bottom: min(5vw, 80px);
	padding: 1em 1.5em 0.9em;
	position: relative;
	transition: box-shadow 0.3s ease;
	width: 100%;
}

.inner {
}

h2 {
	font-size: 1em;
	color: #fff;
	margin: 0;
	text-shadow: 2px 2px 4px #000, 2px 2px 8px #000;
}
.cta {
	background: linear-gradient(to bottom, #0af 0%, #05f 100%);
	background-color: #05f;
	border: 1px solid transparent;
	border-radius: 1em;
	color: #fff;
	display: inline-block;
	font-size: 0.4em;
	font-weight: bold;
	height: auto;
	line-height: 100%;
	padding: 0.8em 1.4em;
	margin: 0;
	position: absolute;
	right: 0;
	top: 0.6em;
}

#carousel_public-art {
	background: linear-gradient(to bottom, #cef 0%, #6cf 100%);
}

#carousel_series {
	background: linear-gradient(to bottom, #fdb 0%, #fa5 100%);
}

.ribbon {
	overflow: hidden;
	padding: 0 min(10vw, 60px);
	z-index: 1;
}

.ribbon_scrolly {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	gap: 30px;
}

.image_wrapper {
	max-height: 300px;
	max-width: 360px;
	border: 5px solid #fff;
	display: flex;
	box-shadow: 0 1px 10px 0 rgba(#000, 0.5);
	border-radius: 5px;
}

.carousel_image {
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

.the_arrow {
	border-width: $arrowSizeSmall 0;
	border-style: solid;
	border-color: transparent;
	transition: transform 0.3s ease;
}

@media (min-width: $sm) {
	.home_carousel {
		font-size: min(10vw, 45px);
	}
}
</style>
