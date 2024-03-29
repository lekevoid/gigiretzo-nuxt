<template>
	<div class="home_carousel" :id="`carousel_${id}`">
		<NuxtLink class="bg hover_shadow" :to="localePath({ name: 'portfolio-projecttype', params: { projecttype: link?.[1] } })">&nbsp;</NuxtLink>
		<div class="inner">
			<h2>
				<NuxtLink class="inactive_on_desktop" :to="localePath({ name: 'portfolio-projecttype', params: { projecttype: link?.[1] } })">{{
					title
				}}</NuxtLink>
			</h2>
			<div class="ribbon_align">
				<div class="arrow prev" @mouseover="isScrollingLeft = true" @mouseleave="isScrollingLeft = false"><div class="the_arrow"></div></div>
				<div class="ribbon" ref="ribbonRef">
					<div class="ribbon_scrolly" style="left: 0px" ref="ribbonScrollyRef">
						<NuxtImg
							v-for="(image, k) in images"
							:src="image.url"
							:class="['carousel_image', image.orientation]"
							densities="x1"
							preload
							sizes="340px"
							preset="portfolioCarousel"
							:loading="k < 4 ? 'eager' : 'lazy'"
							placeholder="/loader-bars-scale.svg"
						/>
					</div>
				</div>
				<div class="arrow next" @mouseover="isScrollingRight = true" @mouseleave="isScrollingRight = false"><div class="the_arrow"></div></div>
			</div>
			<NuxtLink class="cta" :to="localePath({ name: 'portfolio-projecttype', params: { projecttype: link?.[1] } })">{{ cta }}</NuxtLink>
		</div>
	</div>
	<hr />
</template>

<script setup>
const { id, title, cta, images, link } = defineProps(["id", "title", "cta", "images", "link"]);

const localePath = useLocalePath();

const ribbonRef = ref(null);
const ribbonScrollyRef = ref(null);

const isScrollingLeft = ref(false);
const isScrollingRight = ref(false);

let scrollInterval = null;

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

.home_carousel {
	border-radius: 1em;
	box-shadow: 4px 4px 16px #888;
	cursor: pointer;
	display: block;
	font-size: min(6vw, 45px);
	max-width: 100%;
	margin-bottom: min(10vw, 80px);
	overflow: hidden;
	padding: 1em 1.2em 0.9em;
	position: relative;
	transition: box-shadow 0.3s ease;
	width: 100%;
	-webkit-tap-highlight-color: transparent;

	.hover_shadow {
		opacity: 0;
		transition: opacity 0.6s ease;
	}
}

.inner {
}

h2 {
	font-size: 36px;
	color: #fff;
	margin: 0;
	text-shadow: 2px 2px 4px #000, 2px 2px 8px #000;

	a {
		color: #fff;
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

#carousel_public-art {
	background: linear-gradient(to bottom, #cef 0%, #6cf 100%);

	.hover_shadow {
		box-shadow: inset 0 0 80px #0af;
	}
}

#carousel_series {
	background: linear-gradient(to bottom, #fdb 0%, #fa5 100%);

	.hover_shadow {
		box-shadow: inset 0 0 80px #e70;
	}
}

.ribbon {
	overflow: hidden;
	padding: 30px 0 0;
	z-index: 1;
	display: flex;
}

.ribbon_scrolly {
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
	max-width: 40vw;
	border: 3px solid #fff;
	box-shadow: 0 1px 10px 0 rgba(#000, 0.5);
	border-radius: 5px;
	width: auto;

	&.portrait {
		max-height: min(50vw, 280px);
		aspect-ratio: 5/8;
	}

	&.landscape {
		max-height: min(50vw, 190px);
		aspect-ratio: 3/2;
	}

	&.square {
		max-height: min(38vw, 220px);
		max-width: min(38vw, 220px);
		aspect-ratio: 1;
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

.the_arrow {
	border-width: $arrowSizeSmall 0;
	border-style: solid;
	border-color: transparent;
	transition: transform 0.3s ease;
}

@media (max-width: $xsMax), (hover: none) {
	body {
		.bg {
			pointer-events: none;
		}

		.cta {
			pointer-events: all;

			&:hover {
				color: #05f;
				border-color: #05f;
				background: #fff none;
			}
		}

		.ribbon {
			overflow-x: auto;
			pointer-events: all;
		}

		.ribbon_scrolly {
			padding-bottom: 30px;
			margin: 0;
		}

		.arrow {
			display: none;
		}
	}
}

@media (min-width: $sm) {
	.home_carousel {
		font-size: min(6vw, 45px);
	}

	h2 {
		font-size: 1em;

		a.inactive_on_desktop {
			pointer-events: none;
		}
	}

	.carousel_image {
		flex-basis: 25%;
		border-width: 5px;
		max-width: min(30vw, 360px);
	}
}

@media (min-width: $sm) and (hover: hover) {
	.home_carousel {
		.cta {
			font-size: 0.4em;
			pointer-events: none;
			position: absolute;
			right: 0;
			top: 0.6em;
			margin: 0;
		}

		&:hover {
			.cta {
				background: #fff none;
				border: 1px solid #0af;
				color: #0af;
				font-size: 0.4em;
				pointer-events: none;
				position: absolute;
				right: 0;
				top: 0.6em;
				margin: 0;
			}
		}
	}

	.inner {
		pointer-events: none;
	}

	.arrow {
		pointer-events: all;
	}
}
</style>
