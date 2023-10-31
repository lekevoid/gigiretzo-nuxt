<template>
	<Body :class="[{ nav_reduced: isNavReduced }]" />
	<header>
		<div class="row row_1">
			<div class="container">
				<div class="zone_brand">
					<NuxtLink :to="localePath({ name: 'index' })">
						<img :src="logo_brand" id="brand" />
					</NuxtLink>
				</div>
				<div class="zone_social">
					<a v-for="item in social" class="social_item" :href="item.link" target="_blank" :key="item.name">
						<img :src="item.icon" :alt="item.name" />
					</a>
				</div>
				<div class="zone_lang">
					<LangSwitcher />
				</div>
			</div>
		</div>
		<div class="row row_2" v-if="windowWidth >= 600">
			<div class="container">
				<MainNav />
			</div>
		</div>
		<MobileNav v-else />
	</header>
</template>

<script setup>
import logo_brand from "~/assets/img/gigiretzo_logo_dark.svg";
import icon_fb from "~/assets/img/icon_fb.svg";
import icon_instagram from "~/assets/img/icon_instagram.svg";
import icon_linkedin from "~/assets/img/icon_linkedin.svg";

const social = [
	{ name: "Facebook", link: "https://www.facebook.com/Gigi.Retzo.Artist", icon: icon_fb },
	{ name: "Instagram", link: "https://www.instagram.com/Gigi_Retzo_Artist", icon: icon_instagram },
	{ name: "LinkedIn", link: "https://www.linkedin.com/in/gigiretzo/", icon: icon_linkedin },
];

const isNavReduced = ref(false);
const { width: windowWidth } = useWindowSize();

function handleScroll() {
	const { scrollY } = window;

	if (scrollY > 200) {
		isNavReduced.value = true;
	} else {
		isNavReduced.value = false;
	}
}

onMounted(() => {
	handleScroll();
	window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
	window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

$whiteBorderWidth: 3px;

header {
	background-color: #000;
	color: #fff;
	position: fixed;
	width: 100vw;
	left: 0;
	top: 0;
	z-index: 100;

	.row {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}

	.row_1 {
		border-bottom: $whiteBorderWidth solid #fff;
		transition-property: height, padding-top;
		transition-duration: var(--top-nav-reduce-transition-duration);
		transition-timing-function: ease;

		.container {
			justify-content: space-between;
			flex-wrap: wrap;
			height: 100%;
		}
	}

	.row_2 {
		display: none;
		.container {
			justify-content: flex-start;
		}
	}
	.container {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}
}

.zone_brand {
	flex: 0 0 100%;
	transform: translateY(10px);
	transition-property: transform;
	transition-duration: var(--top-nav-reduce-transition-duration);
	transition-timing-function: ease;

	& > a {
		display: block;
		width: 400px;
		max-width: 60vw;
		transition-property: width, max-width;
		transition-duration: var(--top-nav-reduce-transition-duration);
		transition-timing-function: ease;
	}

	#brand {
		width: 100%;
	}
}

.zone_social {
	flex: 1 1 calc(100% - 120px);
	max-width: 66%;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-start;

	.social_item {
		margin: 0 clamp(5px, 1vw, 14px);
		opacity: 0.7;
		transition: opacity 0.3s ease;

		&:hover {
			opacity: 1;
		}

		img {
			height: var(--top-nav-icons-size);
			width: var(--top-nav-icons-size);
			transition-property: height, width;
			transition-duration: var(--top-nav-reduce-transition-duration);
			transition-timing-function: ease;
		}
	}
}

.zone_lang {
	flex: 0 0 120px;
	max-width: 34%;
	width: 120px;
	padding-left: 20px;
	height: 100%;
	border-left: $whiteBorderWidth solid #fff;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	transition-property: flex-basis, width, padding-left;
	transition-duration: var(--top-nav-reduce-transition-duration);
	transition-timing-function: ease;
}

.nav_reduced {
	.zone_brand {
		transform: translateY(5px);

		& > a {
			width: 300px;
			max-width: 40vw;
		}
	}
	.zone_lang {
		flex-basis: 60px;
		padding-left: 10px;
		width: auto;
	}
}

@media (min-width: 500px) {
	header {
		.row_1 {
			padding-top: var(--top-nav-row-1-padding-top);
			height: var(--top-nav-row-1-height);
			.container {
				flex-wrap: nowrap;
			}
		}

		.row_2 {
			display: flex;
		}
	}
	.zone_brand {
		flex: 1 1 60%;

		& > a {
			max-width: 40vw;
		}
	}

	.zone_social {
		flex: 1 1 20%;
		padding-right: 20px;
		padding-left: 20px;
	}

	.zone_lang {
		flex: 0 0 120px;
		max-width: 20%;
	}

	.nav_reduced {
		.zone_brand {
			& > a {
				width: 200px;
				max-width: 25vw;
			}
		}
	}
}
</style>
