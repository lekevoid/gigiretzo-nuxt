<template>
	<button :class="['toggle_mobile_nav', 'open_mobile_nav', { visible: !isOpen }]" @click="isOpen = true">
		<div class="line"></div>
		<div class="line"></div>
		<div class="line"></div>
	</button>
	<button :class="['toggle_mobile_nav', 'close_mobile_nav', { visible: isOpen }]" @click="isOpen = false">&times;</button>
	<nav :class="[{ active: isOpen }]">
		<ul>
			<li>
				<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'bio' } })" @click="isOpen = false">{{ $t("about") }}</NuxtLink>
			</li>
			<li>
				<NuxtLink :to="localePath({ name: 'index' })" @click="isOpen = false">{{ $t("portfolio") }}</NuxtLink>
			</li>
			<li>
				<NuxtLink :to="localePath({ name: 'contact-us' })" @click="isOpen = false">{{ $t("contact-us") }}</NuxtLink>
			</li>
		</ul>
		<div class="outside_mobile_nav" @click="isOpen = false"></div>
	</nav>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";
const route = useRoute;

const localePath = useLocalePath();

const { projectTypes } = storeToRefs(usePortfolioStore());

const isOpen = ref(false);

watch(
	route,
	() => {
		isOpen.value = false;
	},
	{ deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

nav {
	position: fixed;
	background-color: rgba(#000, 0.2);
	box-shadow: 10px 10px 24px rgba(#000, 0);
	width: min(70vw, 350px);
	height: 100vh;
	left: 0;
	top: 0;
	transition: background-color 0.6s ease, box-shadow 0.6s ease, transform 0.6s ease;
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-end;
	justify-content: center;
	transform: translateX(-120%);

	&.active {
		transform: translateX(0%);
		background-color: rgba(#000, 0.9);
		box-shadow: 10px 10px 24px rgba(#000, 0.8);

		.outside_mobile_nav {
			left: 100%;
			opacity: 0;
		}
	}
}

ul {
	padding: 0 8vw;
	text-align: right;
	width: 100%;
	list-style-type: none;
}

li {
	font-size: 6vw;
	padding: 8px 0;
	font-weight: 700;

	&.sub {
		font-size: 5vw;
		padding: 2px 0;
	}

	&.faint {
		opacity: 0.6;
	}
}

a {
	color: #fff;
	font-size: 1em;

	&:hover,
	&:active {
		color: #4c0;
	}
}

.toggle_mobile_nav {
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	bottom: 10px;
	left: 10px;
	height: min(14vw, 60px);
	width: min(14vw, 60px);
	z-index: 1000;
	border-radius: 1000px;
	line-height: 80%;
	position: fixed;
	cursor: pointer;
	opacity: 0;
	transition: opacity 0.6s ease;
	pointer-events: none;
	color: #fff;
	font-weight: 700;

	&.visible {
		opacity: 1;
		pointer-events: all;
	}
}

.open_mobile_nav {
	background-color: rgba(221, 0, 68, 0.8);
	font-size: min(10vw, 100px);

	.line {
		width: 40%;
		height: 2px;
		background-color: #fff;
		border: none;
		margin: 5% auto;
	}
}

.close_mobile_nav {
	background-color: rgba(#000, 0.8);
	font-size: min(8vw, 80px);
	padding-top: 0.05em;
}

.outside_mobile_nav {
	position: absolute;
	background: rgba(#000, 0.01);
	width: 50vw;
	height: 100%;
	left: -100%;
	opacity: 1;
	top: 0;
	transition: left 0.6s ease, opacity 0s linear 0.6s;
}
</style>
